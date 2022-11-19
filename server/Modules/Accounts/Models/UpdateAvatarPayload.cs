using AS3.System.GraphQL.Models;

namespace AS3.Modules.Accounts.Models;

public class UpdateAvatarPayload : UpdateEntityPayload {
  public string? AvatarUrl { get; set; }
}
