using AS3.Modules.Accounts.Models;

using FairyBread;

using FluentValidation;

namespace AS3.Modules.Accounts.Validators;

public class UpdateAccountInputValidator
  : AbstractValidator<UpdateAccountInput>
  , IExplicitUsageOnlyValidator {
  public UpdateAccountInputValidator(
    Rules rules,
    ProfileInputValidator profileInputValidator
  ) {
    CascadeMode = CascadeMode.Stop;

    RuleFor(input => input.Id).NotEmpty();

    RuleFor(input => input.Username)
      .Matches("^[a-zA-Z0-9._]+$")
        .When(input => !string.IsNullOrEmpty(input.Username))
      .Must((input, _) => rules.HaveUniqueUsername(input))
        .When(input => !string.IsNullOrEmpty(input.Username))
        .WithMessage(_ => rules.HaveUniqueUsernameErrorMsg);

    RuleFor(input => input.Profile).SetValidator(profileInputValidator);
  }
}
