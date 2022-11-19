namespace AS3.Modules.Posts.Models;

public class UpdatePostInput {
  public string Id { get; set; } = string.Empty;

  public string Title { get; set; } = string.Empty;

  public string MarkdownContent { get; set; } = string.Empty;

  public bool IsPublished { get; set; }
}
