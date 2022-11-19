namespace AS3.Modules.Accounts.Models;

public class UpdateAccountInput {
  public string Id { get; set; } = string.Empty;

  public string? Username { get; set; } = string.Empty;

  public ProfileInput Profile { get; set; } = new ProfileInput();
}
