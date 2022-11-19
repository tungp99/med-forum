using AS3.Modules.Accounts.Models;
using AS3.System.GraphQL.Authentication;

using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Data;
using HotChocolate.Types;

using MongoDB.Driver;

namespace AS3.Modules.Authentication;

[ExtendObjectType(OperationTypeNames.Query)]
public class Queries {
  [Authorize]
  [UseFirstOrDefault]
  public IExecutable<Account> GetMe(
    [IdentityGlobalState] Identity identity,
    [Service] IMongoCollection<Account> collection
  ) => collection.Find(s => s.Id == identity.Id).AsExecutable();
}
