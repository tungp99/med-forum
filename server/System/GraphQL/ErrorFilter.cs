using HotChocolate;

using System.Security.Authentication;

namespace AS3.System.GraphQL;

public class ErrorFilter : IErrorFilter {
  public IError OnError(IError error) {
    if (error.Exception is AuthenticationException) {
      return error
        .WithMessage("invalid credential ;)")
        .WithCode("AS3_AUTHENTICATION");
    }

    return error;
  }
}
