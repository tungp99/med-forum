using AS3.Modules.Accounts.Models;
using FairyBread;
using FluentValidation;

namespace AS3.Modules.Accounts.Validators;

public class QualificationInputValidator
  : AbstractValidator<QualificationInput>
  , IExplicitUsageOnlyValidator {
  public QualificationInputValidator() {
    CascadeMode = CascadeMode.Stop;

    RuleFor(input => input.Title).NotEmpty();
    RuleFor(input => input.IssuedBy).NotEmpty();
    RuleFor(input => input.IssuedAt).NotEmpty();
    RuleFor(input => input.ExpireAt).NotEmpty();
  }
}
