using AS3.Modules.Authentication;
using AS3.Modules.Comments.Models;
using AS3.Modules.Posts.Models;
using AS3.System.MongoDB;

using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Data;
using HotChocolate.Types;

using MongoDB.Driver;

namespace AS3.Modules.Accounts.Models;

public class Account : BaseEntity {
  public const string COLLECTION_NAME = "accounts";

  public string Email { get; set; } = string.Empty;

  public string? Username { get; set; }

  [GraphQLIgnore]
  [Authorize(Policy = Constants.FULL_ACCESS)]
  public string PasswordHash { get; set; } = string.Empty;

  [Authorize(Policy = Constants.FULL_ACCESS)]
  public string RefreshToken { get; set; } = string.Empty;

  [Authorize(Policy = Constants.FULL_ACCESS)]
  public DateTime RefreshTokenExpiration { get; set; }

  public Profile Profile { get; set; } = new Profile();

  [Authorize(Policy = Constants.FULL_ACCESS)]
  public bool IsGod { get; set; } = false;

  /**************************************
   *** OUTPUT ***************************
   **************************************/
  [UseOffsetPaging, UseFiltering, UseSorting]
  public IExecutable<Post> GetWrittenPosts(
    [Parent] Account parent,
    [Service] IMongoCollection<Post> collection
  ) => collection.Find(s => s.CreatorAccountId == parent.Id).AsExecutable();

  public int GetWrittenPostsCount(
    [Parent] Account parent,
    [Service] IMongoCollection<Post> collection
  ) => (int)collection.Find(s => s.CreatorAccountId == parent.Id).CountDocuments();


  [UseOffsetPaging, UseFiltering, UseSorting]
  public IExecutable<Comment> GetWrittenComments(
    [Parent] Account parent,
    [Service] IMongoCollection<Comment> collection
  ) => collection.Find(s => s.CreatorAccountId == parent.Id).AsExecutable();

  public int GetWrittenCommentsCount(
    [Parent] Account parent,
    [Service] IMongoCollection<Comment> collection
  ) => (int)collection.Find(s => s.CreatorAccountId == parent.Id).CountDocuments();
}
