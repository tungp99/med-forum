using HotChocolate;

namespace AS3.System.GraphQL.Authentication;

public class IdentityGlobalStateAttribute : GlobalStateAttribute {
  public const string KEY = "current user";
  public IdentityGlobalStateAttribute() : base(KEY) { }
}
