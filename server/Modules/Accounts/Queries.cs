using AS3.Modules.Accounts.Models;
using AS3.Modules.Authentication;
using AS3.System.GraphQL.Authentication;
using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Data;
using HotChocolate.Types;

using MongoDB.Driver;

namespace AS3.Modules.Accounts;

[ExtendObjectType(OperationTypeNames.Query)]
public class Queries {
  [UseFirstOrDefault]
  public IExecutable<Account> GetAccount(
    string id,
    [IdentityGlobalState] Identity identity,
    [Service] IMongoCollection<Account> collection
  ) {
    if (identity != null && (id == identity.Id || identity.HasFullAccess))
      return collection.Find(s => s.Id == id).AsExecutable();

    return collection.Find(s => s.Id == id && s.Profile.IsPublic).AsExecutable();
  }

  [Authorize(Policy = Constants.FULL_ACCESS)]
  [UseOffsetPaging, UseFiltering, UseSorting]
  public IExecutable<Account> GetAccounts(
    [Service] IMongoCollection<Account> collection
  ) => collection.AsExecutable();
}
