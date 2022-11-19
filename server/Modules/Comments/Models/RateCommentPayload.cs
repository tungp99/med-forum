using AS3.System.GraphQL.Models;

namespace AS3.Modules.Comments.Models;

public class RateCommentPayload : UpdateEntityPayload {
  public string CommentId { get; set; } = string.Empty;
  public Rating.Quality Quality { get; set; }
}
