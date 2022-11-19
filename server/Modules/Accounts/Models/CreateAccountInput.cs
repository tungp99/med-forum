namespace AS3.Modules.Accounts.Models;

public class CreateAccountInput {
  public string Email { get; set; } = string.Empty;

  public string? Username { get; set; }

  public string Password { get; set; } = string.Empty;

  public ProfileInput Profile { get; set; } = new ProfileInput();
}
