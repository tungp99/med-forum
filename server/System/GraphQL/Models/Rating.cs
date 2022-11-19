namespace AS3.System.GraphQL.Models;

public class Rating {
  public enum Quality {
    GOOD, BAD
  }

  public ICollection<string> UpvoterAccountIndexes { get; set; } = new List<string>();
  public ICollection<string> DownvoterAccountIndexes { get; set; } = new List<string>();
}
