using AS3.System.GraphQL.Models;

namespace AS3.Modules.Posts.Validators;

public class RatePostInput {
  public string PostId { get; set; } = string.Empty;
  public Rating.Quality Quality { get; set; }
}
