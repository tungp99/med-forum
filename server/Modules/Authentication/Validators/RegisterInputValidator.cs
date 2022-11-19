using AS3.Modules.Accounts.Models;
using AS3.Modules.Accounts.Validators;
using AS3.System.GraphQL.Validators;
using FairyBread;
using FluentValidation;

namespace AS3.Modules.Authentication.Validators;

public class RegisterInputValidator
  : AbstractValidator<RegisterInput>
  , IExplicitUsageOnlyValidator {
  public RegisterInputValidator(Rules rules, PasswordValidator passwordValidator) {
    CascadeMode = CascadeMode.Stop;

    RuleFor(input => input.Email)
      .NotEmpty()
      .EmailAddress()
      .Must(value => rules.HaveUniqueEmail(value))
        .WithMessage(_ => rules.HaveUniqueEmailErrorMsg);

    RuleFor(input => input.Username)
      .Matches("^[a-zA-Z0-9._]+$")
        .When(input => !string.IsNullOrEmpty(input.Username))
      .Must((_, value) => rules.HaveUniqueUsername(value))
        .When(input => !string.IsNullOrEmpty(input.Username))
        .WithMessage(_ => rules.HaveUniqueUsernameErrorMsg);

    RuleFor(input => input.Password).SetValidator(passwordValidator);

    RuleFor(input => input.ConfirmationPassword)
      .Equal(input => input.Password).WithMessage("Password mismatch");
  }
}
