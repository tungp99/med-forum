using AS3.Modules.Accounts.Models;
using AS3.System.GraphQL.Authentication;

namespace AS3.Modules.Authentication.Models;

public class LoginPayload {
  public string AccessToken { get; set; } = string.Empty;
  public string RefreshToken { get; set; } = string.Empty;
}
