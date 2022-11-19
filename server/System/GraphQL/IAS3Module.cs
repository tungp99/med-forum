using HotChocolate.Execution.Configuration;

namespace AS3.System.GraphQL;

public interface IAS3Module {
  IRequestExecutorBuilder Configure(IRequestExecutorBuilder builder);
}
