using AS3.Modules.Comments.Models;
using AS3.Modules.Comments.Validators;
using AS3.Modules.Posts.Models;
using AS3.System.GraphQL.Authentication;
using AS3.System.GraphQL.Models;

using FairyBread;

using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Types;

using MongoDB.Driver;

namespace AS3.Modules.Comments;

[ExtendObjectType(OperationTypeNames.Mutation)]
public class Mutations {
  [Authorize]
  public Comment CreateComment(
    [Validate(typeof(CreateCommentInputValidator))] CreateCommentInput input,
    [IdentityGlobalState] Identity identity,
    [Service] IMongoCollection<Comment> commentsCollection,
    [Service] IMongoCollection<Post> postsCollection
  ) {
    var entity = new Comment {
      MarkdownContent = input.MarkdownContent,
      PostId = input.PostId,
      ReplyToCommentId = input.ReplyToCommentId,
      CreatorAccountId = identity.Id
    };

    commentsCollection.InsertOne(entity);

    return entity;
  }

  [Authorize]
  public UpdateEntityPayload UpdateComment(
    [Validate(typeof(UpdateCommentInputValidator))] UpdateCommentInput input,
    [IdentityGlobalState] Identity identity,
    [Service] IMongoCollection<Comment> collection
  ) {
    var criteria = Builders<Comment>.Filter.Eq(s => s.Id, input.Id);
    var entity = collection.Find(criteria).First();

    // trying to modify other's, without admin role ;)
    if (entity.CreatorAccountId != identity.Id && !identity.HasFullAccess)
      return new UpdateEntityPayload {
        AffectedRecords = 0,
        IsSuccess = false
      };

    var update = Builders<Comment>.Update
      .Set(s => s.MarkdownContent, input.MarkdownContent)
      .Set(s => s.UpdatedAt, DateTime.Now);

    var result = collection.UpdateOne(criteria, update);
    return new UpdateEntityPayload {
      AffectedRecords = (int)result.ModifiedCount,
      IsSuccess = result.IsAcknowledged
    };
  }

  [Authorize]
  public DeleteEntityPayload DeleteComment(
    string id,
    [IdentityGlobalState] Identity identity,
    [Service] IMongoCollection<Comment> collection
  ) {
    var criteria = Builders<Comment>.Filter.Eq(s => s.Id, id);
    var entity = collection.Find(criteria).First();

    // trying to modify other's, without admin role ;)
    if (entity.CreatorAccountId != identity.Id && !identity.HasFullAccess)
      return new DeleteEntityPayload {
        AffectedRecords = 0,
        IsSuccess = false
      };

    var result = collection.DeleteOne(criteria);

    return new DeleteEntityPayload {
      AffectedRecords = (int)result.DeletedCount,
      IsSuccess = result.IsAcknowledged
    };
  }

  [Authorize]
  public RateCommentPayload RateComment(
    [Validate(typeof(RateCommentInputValidator))] RateCommentInput input,
    [IdentityGlobalState] Identity identity,
    [Service] IMongoCollection<Comment> collection
  ) {
    var criteria = Builders<Comment>.Filter.Eq(s => s.Id, input.CommentId);
    var comment = collection.Find(criteria).First();

    if (comment.Rating.UpvoterAccountIndexes.Any(s => s == identity.Id)
      || comment.Rating.DownvoterAccountIndexes.Any(s => s == identity.Id)) {
      return new RateCommentPayload {
        AffectedRecords = 0,
        IsSuccess = false
      };
    }

    var update = Builders<Comment>.Update.Set(s => s.UpdatedAt, DateTime.Now);
    if (input.Quality == Rating.Quality.GOOD)
      update = update.AddToSet(s => s.Rating.UpvoterAccountIndexes, identity.Id)
        .Set(s => s.Score, comment.Score + 1);
    else if (input.Quality == Rating.Quality.BAD)
      update = update.AddToSet(s => s.Rating.DownvoterAccountIndexes, identity.Id)
        .Set(s => s.Score, comment.Score - 1);

    var result = collection.UpdateOne(criteria, update);

    return new RateCommentPayload {
      AffectedRecords = (int)result.ModifiedCount,
      IsSuccess = result.IsAcknowledged,
      CommentId = input.CommentId,
      Quality = input.Quality
    };
  }
}
