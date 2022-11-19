
using AS3.Modules.Accounts.Models;
using FairyBread;

using FluentValidation;

namespace AS3.Modules.Accounts.Validators;

public class ProfessionInputValidator
  : AbstractValidator<ProfessionInput>
  , IExplicitUsageOnlyValidator {
  public ProfessionInputValidator() {
    CascadeMode = CascadeMode.Stop;

    RuleFor(input => input.Organization).NotEmpty();
  }
}
