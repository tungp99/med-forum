using AS3.System.GraphQL.Models;

namespace AS3.Modules.Comments.Validators;

public class RateCommentInput {
  public string CommentId { get; set; } = string.Empty;
  public Rating.Quality Quality { get; set; }
}
