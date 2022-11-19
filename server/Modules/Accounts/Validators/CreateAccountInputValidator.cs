using AS3.Modules.Accounts.Models;
using AS3.System.GraphQL.Validators;
using FairyBread;

using FluentValidation;

namespace AS3.Modules.Accounts.Validators;

public class CreateAccountInputValidator
  : AbstractValidator<CreateAccountInput>
  , IExplicitUsageOnlyValidator {
  public CreateAccountInputValidator(
    Rules rules,
    ProfileInputValidator profileInputValidator,
    PasswordValidator passwordValidator
  ) {
    CascadeMode = CascadeMode.Stop;

    RuleFor(input => input.Email)
      .NotEmpty()
      .EmailAddress()
      .Must(value => rules.HaveUniqueEmail(value))
        .WithMessage(_ => rules.HaveUniqueEmailErrorMsg);

    RuleFor(input => input.Username)
      .Matches("^[a-zA-Z0-9._]+$")
        .When(input => !string.IsNullOrEmpty(input.Username))
      .Must((input, _) => rules.HaveUniqueUsername(input))
        .When(input => !string.IsNullOrEmpty(input.Username))
        .WithMessage(_ => rules.HaveUniqueUsernameErrorMsg);

    RuleFor(input => input.Password).SetValidator(passwordValidator);

    RuleFor(input => input.Profile).SetValidator(profileInputValidator);
  }
}
