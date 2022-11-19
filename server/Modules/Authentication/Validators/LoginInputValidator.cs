using AS3.Modules.Accounts.Validators;
using AS3.Modules.Authentication.Models;
using AS3.System.GraphQL.Validators;
using FairyBread;
using FluentValidation;

namespace AS3.Modules.Authentication.Validators;

public class LoginInputValidator
  : AbstractValidator<LoginInput>
  , IExplicitUsageOnlyValidator {
  public LoginInputValidator(Rules rules, PasswordValidator passwordValidator) {
    CascadeMode = CascadeMode.Stop;

    RuleFor(input => input.Email)
      .NotEmpty()
        .When(input => string.IsNullOrWhiteSpace(input.Username))
      .EmailAddress()
        .When(input => string.IsNullOrWhiteSpace(input.Username));

    RuleFor(input => input.Username)
      .NotEmpty()
        .When(input => string.IsNullOrWhiteSpace(input.Email))
      .Matches("^[a-zA-Z0-9._]+$")
        .When(input => string.IsNullOrWhiteSpace(input.Email));

    RuleFor(input => input.Password)
      .SetValidator(passwordValidator);
  }
}
