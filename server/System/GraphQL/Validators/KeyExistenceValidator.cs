using AS3.System.MongoDB;

using FairyBread;

using FluentValidation;

using MongoDB.Driver;

namespace AS3.System.GraphQL.Validators;

public class KeyExistenceValidator<T>
  : AbstractValidator<string>
  , IExplicitUsageOnlyValidator
  where T : BaseEntity {
  public KeyExistenceValidator(IMongoCollection<T> collection) {
    RuleFor(id => id)
      .NotEmpty()
      .Must((id, _) => {
        var count = collection.Find(s => s.Id == id).CountDocuments();
        return count == 1;
      }).WithMessage((id, _) => $"Cannot find {nameof(T)} {id}");
  }
}
