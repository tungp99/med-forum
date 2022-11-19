using AS3.System.GraphQL.Models;

namespace AS3.Modules.Posts.Models;

public class RatePostPayload : UpdateEntityPayload {
  public string PostId { get; set; } = string.Empty;
  public Rating.Quality Quality { get; set; }
}
