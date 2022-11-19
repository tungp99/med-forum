using AS3.Modules.Accounts.Models;
using AS3.Modules.Comments.Models;
using AS3.System.GraphQL.Models;
using AS3.System.MongoDB;

using HotChocolate;
using HotChocolate.Data;
using HotChocolate.Types;

using MongoDB.Driver;

namespace AS3.Modules.Posts.Models;

public class Post : BaseEntity {
  public const string COLLECTION_NAME = "posts";

  /**************************************
   *** MODEL ****************************
   **************************************/
  public string Title { get; set; } = string.Empty;

  public string MarkdownContent { get; set; } = string.Empty;

  public bool IsPublished { get; set; }

  public int Score { get; set; }

  /**************************************
   *** REFERENCES ***********************
   **************************************/
  [GraphQLIgnore]
  public string CreatorAccountId { get; set; } = string.Empty;

  [GraphQLIgnore]
  public Rating Rating { get; set; } = new Rating();

  /**************************************
   *** OUTPUT ***************************
   **************************************/
  [UseFirstOrDefault]
  public IExecutable<Account> GetCreatorAccount(
   [Parent] Post parent,
   [Service] IMongoCollection<Account> collection
  ) => collection.Find(s => s.Id == parent.CreatorAccountId).AsExecutable();

  [UseOffsetPaging, UseFiltering, UseSorting]
  public IExecutable<Comment> GetComments(
    [Parent] Post parent,
    [Service] IMongoCollection<Comment> collection
  ) => collection
      .Find(s => s.PostId == parent.Id && string.IsNullOrEmpty(s.ReplyToCommentId))
      .AsExecutable();

  public int GetCommentsCount(
   [Parent] Post parent,
   [Service] IMongoCollection<Comment> collection
  ) => (int)collection.CountDocuments(s => s.PostId == parent.Id);
}
