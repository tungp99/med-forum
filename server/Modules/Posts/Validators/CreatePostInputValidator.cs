using AS3.Modules.Posts.Models;
using FairyBread;
using FluentValidation;

namespace AS3.Modules.Posts.Validators;

public class CreatePostInputValidator
  : AbstractValidator<CreatePostInput>
  , IExplicitUsageOnlyValidator {
  public CreatePostInputValidator() {
    CascadeMode = CascadeMode.Stop;

    RuleFor(input => input.Title)
      .NotEmpty();

    RuleFor(input => input.MarkdownContent)
      .NotEmpty();
  }
}
