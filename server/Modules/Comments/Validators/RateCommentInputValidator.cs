using AS3.Modules.Comments.Models;
using AS3.System.GraphQL.Validators;
using FairyBread;
using FluentValidation;

namespace AS3.Modules.Comments.Validators;

public class RateCommentInputValidator
  : AbstractValidator<RateCommentInput>
  , IExplicitUsageOnlyValidator {
  public RateCommentInputValidator(KeyExistenceValidator<Comment> keyValidator) {
    CascadeMode = CascadeMode.Stop;

    RuleFor(input => input.CommentId).SetValidator(keyValidator);

    RuleFor(input => input.Quality).NotNull().IsInEnum();
  }
}
