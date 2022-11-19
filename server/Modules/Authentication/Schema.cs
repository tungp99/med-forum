using AS3.System.GraphQL;

using HotChocolate.Execution.Configuration;

namespace AS3.Modules.Authentication;

public class Schema : IAS3Module {
  public IRequestExecutorBuilder Configure(IRequestExecutorBuilder builder) {
    return builder
      .AddType<Subscriptions>()
      .AddType<Queries>()
      .AddType<Mutations>()
      ;
  }
}
