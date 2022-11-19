using AS3.Modules.Posts.Models;
using AS3.System.GraphQL.Validators;
using FairyBread;
using FluentValidation;

namespace AS3.Modules.Posts.Validators;

public class UpdatePostInputValidator
  : AbstractValidator<UpdatePostInput>
  , IExplicitUsageOnlyValidator {
  public UpdatePostInputValidator(KeyExistenceValidator<Post> keyExistenceValidator) {
    CascadeMode = CascadeMode.Stop;

    RuleFor(input => input.Id)
      .NotEmpty()
      .SetValidator(keyExistenceValidator);

    RuleFor(input => input.Title)
      .NotEmpty();

    RuleFor(input => input.MarkdownContent)
      .NotEmpty();
  }
}
