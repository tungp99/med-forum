using System.Globalization;

using AS3.Modules.Accounts.Models;
using AS3.System.GraphQL.Validators;

using FairyBread;

using FluentValidation;

namespace AS3.Modules.Accounts.Validators;

public class ProfileInputValidator
  : AbstractValidator<ProfileInput>
  , IExplicitUsageOnlyValidator {
  public ProfileInputValidator() {
    CascadeMode = CascadeMode.Stop;

    RuleFor(input => input.FirstName)
      .NotEmpty()
      .MaximumLength(16)
      .Matches(AS3Rules.HUMAN_NAME_REGEX);

    RuleFor(input => input.LastName)
      .NotEmpty()
      .MaximumLength(16)
      .Matches(AS3Rules.HUMAN_NAME_REGEX);

    RuleFor(input => input.CountryCode)
      .Custom((value, context) => {
        try {
          new RegionInfo(value ?? "VN");
        } catch (ArgumentException ex) {
          context.AddFailure(ex.Message);
        }
      });
  }
}
