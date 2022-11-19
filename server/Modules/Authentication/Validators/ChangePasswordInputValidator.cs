using AS3.Modules.Authentication.Models;
using AS3.System.GraphQL.Validators;
using FairyBread;
using FluentValidation;

namespace AS3.Modules.Authentication.Validators;

public class ChangePasswordInputValidator
  : AbstractValidator<ChangePasswordInput>
  , IExplicitUsageOnlyValidator {
  public ChangePasswordInputValidator(PasswordValidator passwordValidator) {
    CascadeMode = CascadeMode.Stop;

    RuleFor(input => input.CurrentPassword)
      .SetValidator(passwordValidator);

    RuleFor(input => input.NewPassword)
      .SetValidator(passwordValidator);

    RuleFor(input => input.ConfirmNewPassword)
      .Equal(input => input.NewPassword).WithMessage("Password mismatch");
  }
}
