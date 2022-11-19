namespace AS3.Modules.Authentication.Models;

public class RefreshTokenPayload {
  public bool IsSuccess { get; set; } = false;

  public string AccessToken { get; set; } = string.Empty;

  public string RefreshToken { get; set; } = string.Empty;
}
