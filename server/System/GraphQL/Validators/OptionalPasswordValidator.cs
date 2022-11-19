using FairyBread;

using FluentValidation;

namespace AS3.System.GraphQL.Validators;

public class OptionalPasswordValidator
  : AbstractValidator<string?>
  , IExplicitUsageOnlyValidator {
  public OptionalPasswordValidator() {
    RuleFor(pwd => pwd)
      .MinimumLength(1)
        .When(pwd => !string.IsNullOrEmpty(pwd))
      .Matches("^[a-zA-Z0-9_]+$")
        .When(pwd => !string.IsNullOrEmpty(pwd));
  }
}
