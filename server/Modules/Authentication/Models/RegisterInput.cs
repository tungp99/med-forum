namespace AS3.Modules.Accounts.Models;

public class RegisterInput {
  public string Email { get; set; } = string.Empty;

  public string? Username { get; set; } = string.Empty;

  public string Password { get; set; } = string.Empty;

  public string ConfirmationPassword { get; set; } = string.Empty;

  public ProfileInput Profile { get; set; } = new ProfileInput();
}
