using AS3.Modules.Comments.Models;

using HotChocolate;
using HotChocolate.Data;
using HotChocolate.Types;

using MongoDB.Driver;

namespace AS3.Modules.Comments;

[ExtendObjectType(OperationTypeNames.Query)]
public class Queries {
  /// <summary>
  /// Retrieve comments of a Post, depth = 0
  /// </summary>
  /// <param name="postId"></param>
  /// <param name="collection"></param>
  /// <returns></returns>
  [UseOffsetPaging, UseFiltering, UseSorting]
  public IExecutable<Comment> GetComments(
    string postId,
    [Service] IMongoCollection<Comment> collection
  ) => collection
    .Find(s => s.PostId == postId && string.IsNullOrEmpty(s.ReplyToCommentId))
    .AsExecutable();

  [UseOffsetPaging, UseFiltering, UseSorting]
  public IExecutable<Comment> GetReplies(
    string commentId,
    [Service] IMongoCollection<Comment> collection
  ) => collection.Find(s => s.ReplyToCommentId == commentId).AsExecutable();
}
