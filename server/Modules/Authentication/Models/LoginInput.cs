namespace AS3.Modules.Authentication.Models;

public class LoginInput {
  public string? Email { get; set; }
  public string? Username { get; set; }
  public string Password { get; set; } = string.Empty;
}
