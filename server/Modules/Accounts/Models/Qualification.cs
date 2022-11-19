namespace AS3.Modules.Accounts.Models;

public class Qualification {
  public string Title { get; set; } = string.Empty;

  public string IssuedBy { get; set; } = string.Empty;

  public DateTime IssuedAt { get; set; }

  public DateTime ExpireAt { get; set; }
}
