using AS3.Modules.Accounts.Models;
using AS3.Modules.Posts.Models;
using AS3.System.GraphQL.Models;
using AS3.System.MongoDB;
using HotChocolate.Data;
using MongoDB.Driver;

namespace AS3.Modules.Comments.Models;

public class Comment : BaseEntity {
  public const string COLLECTION_NAME = "comments";

  public string MarkdownContent { get; set; } = string.Empty;

  public int Score { get; set; }

  /**************************************
   *** REFERENCES ***********************
   **************************************/
  [GraphQLIgnore]
  public string PostId { get; set; } = string.Empty;

  [GraphQLIgnore]
  public string CreatorAccountId { get; set; } = string.Empty;

  [GraphQLIgnore]
  public string? ReplyToCommentId { get; set; }

  [GraphQLIgnore]
  public Rating Rating { get; set; } = new Rating();

  /**************************************
   *** OUTPUT ***************************
   **************************************/
  [UseFirstOrDefault]
  public IExecutable<Post> GetPost(
    [Parent] Comment parent,
    [Service] IMongoCollection<Post> collection
  ) => collection.Find(s => s.Id == parent.PostId).AsExecutable();

  [UseFirstOrDefault]
  public IExecutable<Account> GetCreatorAccount(
    [Parent] Comment parent,
    [Service] IMongoCollection<Account> collection
  ) => collection.Find(s => s.Id == parent.CreatorAccountId).AsExecutable();

  public int GetRepliesCount(
    [Parent] Comment parent,
    [Service] IMongoCollection<Comment> collection
  ) => (int)collection.Find(s => s.ReplyToCommentId == parent.Id).CountDocuments();
}
