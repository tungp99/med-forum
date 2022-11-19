using System.Security.Claims;

using AS3.Modules.Authentication;

using HotChocolate.AspNetCore;
using HotChocolate.Execution;

namespace AS3.System.GraphQL.Authentication;

public class IdentityRequestInterceptor : DefaultHttpRequestInterceptor {
  public override ValueTask OnCreateAsync(
    HttpContext context,
    IRequestExecutor executor,
    IQueryRequestBuilder builder,
    CancellationToken ct
  ) {
    if (context.User.Identity != null && context.User.Identity.IsAuthenticated) {
      var permission = context.User.FindFirstValue(Constants.PERMISSIONS_CLAIM);
      var identity = new Identity {
        Id = context.User.FindFirstValue(ClaimTypes.NameIdentifier),
        HasFullAccess = !string.IsNullOrEmpty(permission) && permission.Contains(Constants.FULL_ACCESS),
      };

      builder.SetProperty(IdentityGlobalStateAttribute.KEY, identity);
    } else
      builder.SetProperty(IdentityGlobalStateAttribute.KEY, null);

    return base.OnCreateAsync(context, executor, builder, ct);
  }
}
