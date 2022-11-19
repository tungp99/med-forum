using FairyBread;

using FluentValidation;

namespace AS3.System.GraphQL.Validators;

public class PasswordValidator
  : AbstractValidator<string>
  , IExplicitUsageOnlyValidator {
  public PasswordValidator() {
    RuleFor(pwd => pwd)
      .NotEmpty()
      .MinimumLength(1)
      .Matches("^[a-zA-Z0-9]+$");
  }
}
