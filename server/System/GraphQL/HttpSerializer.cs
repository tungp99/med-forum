using System.Net;

using HotChocolate.AspNetCore.Serialization;
using HotChocolate.Execution;

namespace AS3.System.GraphQL;

public class HttpSerializer : DefaultHttpResultSerializer {
  public override HttpStatusCode GetStatusCode(IExecutionResult result) {
    if (result is IQueryResult queryResult &&
        queryResult.Errors?.Count > 0 &&
        queryResult.Errors.Any(error =>
             error.Code == "FairyBread_ValidationError"
          || error.Code == "AS3_AUTHENTICATION")
        ) {
      return HttpStatusCode.OK;
    }

    return base.GetStatusCode(result);
  }
}
