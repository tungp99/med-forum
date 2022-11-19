using AS3.Modules.Posts.Models;
using AS3.System.GraphQL.Validators;

using FairyBread;

using FluentValidation;

namespace AS3.Modules.Posts.Validators;

public class RatePostInputValidator
  : AbstractValidator<RatePostInput>
  , IExplicitUsageOnlyValidator {
  public RatePostInputValidator(KeyExistenceValidator<Post> keyValidator) {
    CascadeMode = CascadeMode.Stop;

    RuleFor(input => input.PostId).SetValidator(keyValidator);

    RuleFor(input => input.Quality).NotNull().IsInEnum();
  }
}
