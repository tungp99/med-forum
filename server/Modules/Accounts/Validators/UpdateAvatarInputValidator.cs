using AS3.Modules.Accounts.Models;
using AS3.System.GraphQL.Validators;

using FairyBread;

using FluentValidation;

namespace AS3.Modules.Accounts.Validators;

public class UpdateAvatarInputValidator
  : AbstractValidator<UpdateAvatarInput>
  , IExplicitUsageOnlyValidator {
  public UpdateAvatarInputValidator(
    Rules rules,
    KeyExistenceValidator<Account> keyValidator
  ) {
    CascadeMode = CascadeMode.Stop;

    RuleFor(input => input.AccountId!).SetValidator(keyValidator);
  }
}
