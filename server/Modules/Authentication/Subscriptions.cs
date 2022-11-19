using AS3.Modules.Accounts.Models;

using HotChocolate;
using HotChocolate.Types;

using MongoDB.Driver;

namespace AS3.Modules.Authentication;

[ExtendObjectType(OperationTypeNames.Subscription)]
public class Subscriptions {
  private static int ONLINE_COUNT = 0;

  [Subscribe]
  public int AuthenticationStatistics([EventMessage] int one) {
    ONLINE_COUNT += one;
    return ONLINE_COUNT;
  }

  [Subscribe]
  public int AccountCreated([EventMessage] int unused, [Service] IMongoCollection<Account> collection)
    => (int)collection.Find(s => !string.IsNullOrEmpty(s.Id)).CountDocuments();
}
