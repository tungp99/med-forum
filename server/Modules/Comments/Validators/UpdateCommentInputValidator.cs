
using AS3.Modules.Comments.Models;
using AS3.System.GraphQL.Validators;
using FairyBread;
using FluentValidation;

namespace AS3.Modules.Comments.Validators;

public class UpdateCommentInputValidator
  : AbstractValidator<UpdateCommentInput>
  , IExplicitUsageOnlyValidator {
  public UpdateCommentInputValidator(
    Rules rules,
    KeyExistenceValidator<Comment> keyExistenceValidator
  ) {
    RuleFor(input => input.Id)
      .NotEmpty()
      .SetValidator(keyExistenceValidator);

    RuleFor(input => input.MarkdownContent)
      .NotEmpty();
  }
}
