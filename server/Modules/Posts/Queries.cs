using AS3.Modules.Posts.Models;

using HotChocolate;
using HotChocolate.Data;
using HotChocolate.Types;

using MongoDB.Driver;

namespace AS3.Modules.Posts;

[ExtendObjectType(OperationTypeNames.Query)]
public class Queries {
  [UseOffsetPaging, UseFiltering, UseSorting]
  public IExecutable<Post> GetPosts(
    string? accountId,
    [Service] IMongoCollection<Post> collection
  ) => string.IsNullOrWhiteSpace(accountId)
    ? collection.AsExecutable()
    : collection.Find(s => s.CreatorAccountId == accountId).AsExecutable();

  [UseFirstOrDefault]
  public IExecutable<Post> GetPost(
    string id,
    [Service] IMongoCollection<Post> collection
  ) => collection.Find(s => s.Id == id).AsExecutable();
}
