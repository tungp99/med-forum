using AS3.Modules.Comments.Models;
using AS3.Modules.Posts.Models;
using AS3.System.GraphQL.Validators;
using FairyBread;
using FluentValidation;
using MongoDB.Driver;

namespace AS3.Modules.Comments.Validators;

public class CreateCommentInputValidator
  : AbstractValidator<CreateCommentInput>
  , IExplicitUsageOnlyValidator {
  public CreateCommentInputValidator(
    Rules rules,
    KeyExistenceValidator<Post> postKeyValidator,
    IMongoCollection<Post> collection
  ) {
    CascadeMode = CascadeMode.Stop;

    RuleFor(input => input.MarkdownContent)
      .NotEmpty();

    RuleFor(input => input.PostId)
      .NotEmpty()
      .SetValidator(postKeyValidator);

    RuleFor(input => input.ReplyToCommentId)
      .Must(value => rules.HaveParentComment(value!))
        .When(input => !string.IsNullOrEmpty(input.ReplyToCommentId))
        .WithMessage(rules.HaveParentCommentErrorMsg);
  }
}
