namespace AS3.Modules.Comments.Models;

public class CreateCommentInput {
  public string MarkdownContent { get; set; } = string.Empty;

  public string PostId { get; set; } = string.Empty;

  public string? ReplyToCommentId { get; set; }
}
