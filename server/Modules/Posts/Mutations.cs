using AS3.Modules.Authentication;
using AS3.Modules.Posts.Models;
using AS3.Modules.Posts.Validators;
using AS3.System.GraphQL.Authentication;
using AS3.System.GraphQL.Models;
using AS3.System.GraphQL.Validators;

using FairyBread;

using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Types;

using MongoDB.Driver;

namespace AS3.Modules.Posts;

[ExtendObjectType(OperationTypeNames.Mutation)]
public class Mutations {
  [Authorize]
  public Post CreatePost(
    [Validate(typeof(CreatePostInputValidator))] CreatePostInput input,
    [IdentityGlobalState] Identity identity,
    [Service] IMongoCollection<Post> collection
  ) {
    var entity = new Post {
      Title = input.Title,
      MarkdownContent = input.MarkdownContent,
      IsPublished = input.IsPublished,
      CreatorAccountId = identity.Id
    };

    collection.InsertOne(entity);

    return entity;
  }

  [Authorize]
  public UpdateEntityPayload UpdatePost(
    [Validate(typeof(UpdatePostInputValidator))] UpdatePostInput input,
    [IdentityGlobalState] Identity identity,
    [Service] IMongoCollection<Post> collection
  ) {
    var criteria = Builders<Post>.Filter.Eq(s => s.Id, input.Id);
    var entity = collection.Find(criteria).First();

    // trying to modify other's ;)
    if (entity.CreatorAccountId != identity.Id && !identity.HasFullAccess)
      return new UpdateEntityPayload {
        AffectedRecords = 0,
        IsSuccess = false
      };

    var update = Builders<Post>.Update
      .Set(s => s.Title, input.Title)
      .Set(s => s.MarkdownContent, input.MarkdownContent)
      .Set(s => s.IsPublished, input.IsPublished)
      .Set(s => s.UpdatedAt, DateTime.Now);

    var result = collection.UpdateOne(criteria, update);

    return new UpdateEntityPayload {
      AffectedRecords = (int)result.ModifiedCount,
      IsSuccess = result.IsAcknowledged
    };
  }

  [Authorize(Policy = Constants.FULL_ACCESS)]
  public DeleteEntityPayload DeletePost(
    [Validate(typeof(KeyExistenceValidator<Post>))] string id,
    [IdentityGlobalState] Identity identity,
    [Service] IMongoCollection<Post> collection
  ) {
    var result = collection.DeleteOne(s => s.Id == id);

    return new DeleteEntityPayload {
      AffectedRecords = (int)result.DeletedCount,
      IsSuccess = result.IsAcknowledged
    };
  }

  [Authorize]
  public RatePostPayload RatePost(
    [Validate(typeof(RatePostInputValidator))] RatePostInput input,
    [IdentityGlobalState] Identity identity,
    [Service] IMongoCollection<Post> collection
  ) {
    var criteria = Builders<Post>.Filter.Eq(s => s.Id, input.PostId);
    var post = collection.Find(criteria).First();

    if (post.Rating.UpvoterAccountIndexes.Any(s => s == identity.Id)
      || post.Rating.DownvoterAccountIndexes.Any(s => s == identity.Id)) {
      return new RatePostPayload {
        AffectedRecords = 0,
        IsSuccess = false
      };
    }

    var update = Builders<Post>.Update.Set(s => s.UpdatedAt, DateTime.Now);
    if (input.Quality == Rating.Quality.GOOD)
      update = update.AddToSet(s => s.Rating.UpvoterAccountIndexes, identity.Id)
        .Set(s => s.Score, post.Score + 1);
    else if (input.Quality == Rating.Quality.BAD)
      update = update.AddToSet(s => s.Rating.DownvoterAccountIndexes, identity.Id)
        .Set(s => s.Score, post.Score - 1);

    var result = collection.UpdateOne(criteria, update);

    return new RatePostPayload {
      AffectedRecords = (int)result.ModifiedCount,
      IsSuccess = result.IsAcknowledged,
      PostId = input.PostId,
      Quality = input.Quality
    };
  }
}
