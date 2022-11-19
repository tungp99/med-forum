using AS3.Modules.Accounts.Models;
using AS3.Modules.Accounts.Validators;
using AS3.Modules.Authentication;
using AS3.System.Amazon;
using AS3.System.GraphQL.Authentication;
using AS3.System.GraphQL.Models;

using FairyBread;

using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Subscriptions;
using HotChocolate.Types;

using MongoDB.Driver;

namespace AS3.Modules.Accounts;

[ExtendObjectType(OperationTypeNames.Mutation)]
public class Mutations {
  [Authorize(Policy = Constants.FULL_ACCESS)]
  public Account CreateAccount(
    [Validate(typeof(CreateAccountInputValidator))] CreateAccountInput input,
    [Service] IMongoCollection<Account> collection,
    [Service] AuthService service,
    [Service] ITopicEventSender sender
  ) {
    var account = new Account {
      Email = input.Email,
      Username = input.Username,
      PasswordHash = service.EncryptPassword(input.Password),
      Profile = new Profile {
        IsPublic = input.Profile.IsPublic,
        FirstName = input.Profile.FirstName,
        LastName = input.Profile.LastName,
        BirthDate = input.Profile.BirthDate,
        PhoneNumber = input.Profile.PhoneNumber,
        CountryCode = input.Profile.CountryCode ?? "VN"
      }
    };

    collection.InsertOne(account);

    sender.SendAsync(nameof(Subscriptions.AccountCreated), 1);

    return account;
  }

  [Authorize]
  public UpdateEntityPayload UpdateAccount(
    [Validate(typeof(UpdateAccountInputValidator))] UpdateAccountInput input,
    [IdentityGlobalState] Identity identity,
    [Service] IMongoCollection<Account> collection,
    [Service] AuthService service
  ) {
    // trying to modify other's, without admin role ;)
    if (input.Id != identity.Id && !identity.HasFullAccess)
      return new UpdateEntityPayload {
        AffectedRecords = 0,
        IsSuccess = false
      };

    if (string.IsNullOrEmpty(input.Id))
      input.Id = identity.Id;
    var criteria = Builders<Account>.Filter.Eq(s => s.Id, input.Id);

    var update = Builders<Account>.Update
      .Set(s => s.Username, input.Username)
      .Set(s => s.Profile.IsPublic, input.Profile.IsPublic)
      .Set(s => s.Profile.FirstName, input.Profile.FirstName)
      .Set(s => s.Profile.LastName, input.Profile.LastName)
      .Set(s => s.Profile.BirthDate, input.Profile.BirthDate)
      .Set(s => s.Profile.PhoneNumber, input.Profile.PhoneNumber)
      .Set(s => s.Profile.CountryCode, input.Profile.CountryCode)
      .Set(s => s.UpdatedAt, DateTime.Now);

    var result = collection.UpdateOne(criteria, update);

    return new UpdateEntityPayload {
      AffectedRecords = (int)result.ModifiedCount,
      IsSuccess = result.IsAcknowledged
    };
  }

  [Authorize]
  public DeleteEntityPayload DeleteAccount(
    string id,
    [IdentityGlobalState] Identity identity,
    [Service] IMongoCollection<Account> collection,
    [Service] ITopicEventSender sender
  ) {
    // trying to modify other's, without admin role ;)
    if (id != identity.Id && !identity.HasFullAccess)
      return new DeleteEntityPayload {
        AffectedRecords = 0,
        IsSuccess = false
      };

    var result = collection.DeleteOne(s => s.Id == id);


    if (result.IsAcknowledged) {
      sender.SendAsync(nameof(Subscriptions.AccountCreated), 1);
    }

    return new DeleteEntityPayload {
      AffectedRecords = (int)result.DeletedCount,
      IsSuccess = result.IsAcknowledged
    };
  }

  [Authorize]
  public UpdateEntityPayload AddExperience(
    [Validate(typeof(ProfessionInputValidator))] ProfessionInput input,
    [IdentityGlobalState] Identity identity,
    [Service] IMongoCollection<Account> collection
  ) {
    // trying to modify other's, without admin role ;)
    if (input.AccountId != identity.Id && !identity.HasFullAccess)
      return new UpdateEntityPayload {
        AffectedRecords = 0,
        IsSuccess = false
      };

    if (string.IsNullOrEmpty(input.AccountId))
      input.AccountId = identity.Id;
    var criteria = Builders<Account>.Filter.Eq(s => s.Id, input.AccountId);

    var update = Builders<Account>.Update
      .AddToSet(s => s.Profile.Experience, new Profession {
        Organization = input.Organization,
        Start = input.Start,
        End = input.End,
        Position = input.Position,
        IsWorking = input.IsWorking,
      })
      .Set(s => s.UpdatedAt, DateTime.Now);

    var result = collection.UpdateOne(criteria, update);

    return new UpdateEntityPayload {
      AffectedRecords = (int)result.ModifiedCount,
      IsSuccess = result.IsAcknowledged
    };
  }

  [Authorize]
  public UpdateEntityPayload RemoveExperience(
    [Validate(typeof(ProfessionInputValidator))] ProfessionInput input,
    [IdentityGlobalState] Identity identity,
    [Service] IMongoCollection<Account> collection
  ) {
    // trying to modify other's, without admin role ;)
    if (input.AccountId != identity.Id && !identity.HasFullAccess)
      return new UpdateEntityPayload {
        AffectedRecords = 0,
        IsSuccess = false
      };

    if (string.IsNullOrEmpty(input.AccountId))
      input.AccountId = identity.Id;
    var criteria = Builders<Account>.Filter.Eq(s => s.Id, input.AccountId);

    var update = Builders<Account>.Update
      .Pull(s => s.Profile.Experience, new Profession {
        Organization = input.Organization,
        Start = input.Start,
        End = input.End,
        Position = input.Position,
        IsWorking = input.IsWorking,
      })
      .Set(s => s.UpdatedAt, DateTime.Now);

    var result = collection.UpdateOne(criteria, update);

    return new UpdateEntityPayload {
      AffectedRecords = (int)result.ModifiedCount,
      IsSuccess = result.IsAcknowledged
    };
  }

  [Authorize]
  public UpdateEntityPayload AddEducation(
    [Validate(typeof(ProfessionInputValidator))] ProfessionInput input,
    [IdentityGlobalState] Identity identity,
    [Service] IMongoCollection<Account> collection
  ) {
    // trying to modify other's, without admin role ;)
    if (input.AccountId != identity.Id && !identity.HasFullAccess)
      return new UpdateEntityPayload {
        AffectedRecords = 0,
        IsSuccess = false
      };

    if (string.IsNullOrEmpty(input.AccountId))
      input.AccountId = identity.Id;
    var criteria = Builders<Account>.Filter.Eq(s => s.Id, input.AccountId);

    var update = Builders<Account>.Update
      .AddToSet(s => s.Profile.Education, new Profession {
        Organization = input.Organization,
        Start = input.Start,
        End = input.End,
        Position = input.Position,
        IsWorking = input.IsWorking,
      })
      .Set(s => s.UpdatedAt, DateTime.Now);

    var result = collection.UpdateOne(criteria, update);

    return new UpdateEntityPayload {
      AffectedRecords = (int)result.ModifiedCount,
      IsSuccess = result.IsAcknowledged
    };
  }

  [Authorize]
  public UpdateEntityPayload RemoveEducation(
    [Validate(typeof(ProfessionInputValidator))] ProfessionInput input,
    [IdentityGlobalState] Identity identity,
    [Service] IMongoCollection<Account> collection
  ) {
    // trying to modify other's, without admin role ;)
    if (input.AccountId != identity.Id && !identity.HasFullAccess)
      return new UpdateEntityPayload {
        AffectedRecords = 0,
        IsSuccess = false
      };

    if (string.IsNullOrEmpty(input.AccountId))
      input.AccountId = identity.Id;
    var criteria = Builders<Account>.Filter.Eq(s => s.Id, input.AccountId);

    var update = Builders<Account>.Update
      .Pull(s => s.Profile.Education, new Profession {
        Organization = input.Organization,
        Start = input.Start,
        End = input.End,
        Position = input.Position,
        IsWorking = input.IsWorking,
      })
      .Set(s => s.UpdatedAt, DateTime.Now);

    var result = collection.UpdateOne(criteria, update);

    return new UpdateEntityPayload {
      AffectedRecords = (int)result.ModifiedCount,
      IsSuccess = result.IsAcknowledged
    };
  }

  [Authorize]
  public UpdateEntityPayload AddQualification(
    [Validate(typeof(QualificationInputValidator))] QualificationInput input,
    [IdentityGlobalState] Identity identity,
    [Service] IMongoCollection<Account> collection
  ) {
    // trying to modify other's, without admin role ;)
    if (input.AccountId != identity.Id && !identity.HasFullAccess)
      return new UpdateEntityPayload {
        AffectedRecords = 0,
        IsSuccess = false
      };

    if (string.IsNullOrEmpty(input.AccountId))
      input.AccountId = identity.Id;
    var criteria = Builders<Account>.Filter.Eq(s => s.Id, input.AccountId);

    var update = Builders<Account>.Update
      .AddToSet(s => s.Profile.Qualifications, new Qualification {
        Title = input.Title,
        IssuedBy = input.IssuedBy,
        IssuedAt = input.IssuedAt!.Value,
        ExpireAt = input.ExpireAt!.Value
      })
      .Set(s => s.UpdatedAt, DateTime.Now);

    var result = collection.UpdateOne(criteria, update);

    return new UpdateEntityPayload {
      AffectedRecords = (int)result.ModifiedCount,
      IsSuccess = result.IsAcknowledged
    };
  }

  [Authorize]
  public UpdateEntityPayload RemoveQualification(
    [Validate(typeof(QualificationInputValidator))] QualificationInput input,
    [IdentityGlobalState] Identity identity,
    [Service] IMongoCollection<Account> collection
  ) {
    // trying to modify other's, without admin role ;)
    if (input.AccountId != identity.Id && !identity.HasFullAccess)
      return new UpdateEntityPayload {
        AffectedRecords = 0,
        IsSuccess = false
      };

    if (string.IsNullOrEmpty(input.AccountId))
      input.AccountId = identity.Id;
    var criteria = Builders<Account>.Filter.Eq(s => s.Id, input.AccountId);

    var update = Builders<Account>.Update
      .Pull(s => s.Profile.Qualifications, new Qualification {
        Title = input.Title,
        IssuedBy = input.IssuedBy,
        IssuedAt = input.IssuedAt!.Value,
        ExpireAt = input.ExpireAt!.Value
      })
      .Set(s => s.UpdatedAt, DateTime.Now);

    var result = collection.UpdateOne(criteria, update);

    return new UpdateEntityPayload {
      AffectedRecords = (int)result.ModifiedCount,
      IsSuccess = result.IsAcknowledged
    };
  }

  [Authorize]
  public async Task<UpdateAvatarPayload> UpdateAvatar(
    [Validate(typeof(UpdateAvatarInputValidator))] UpdateAvatarInput input,
    [IdentityGlobalState] Identity identity,
    [Service] IMongoCollection<Account> collection,
    [Service] AmzS3Service amzS3
  ) {
    var id = string.IsNullOrEmpty(input.AccountId) ? identity.Id : input.AccountId;

    // trying to modify other's, without admin role ;)
    if (id != identity.Id && !identity.HasFullAccess)
      return new() {
        AffectedRecords = 0,
        IsSuccess = false
      };

    await using var stream = input.File.OpenReadStream();

    var avatarUrl = await amzS3.UploadFile(input.File.Name, stream);

    var update = Builders<Account>.Update
      .Set(s => s.UpdatedAt, DateTime.Now)
      .Set(s => s.Profile.AvatarUrl, avatarUrl);
    var result = collection.UpdateOne(s => s.Id == id, update);

    return new() {
      AffectedRecords = (int)result.ModifiedCount,
      IsSuccess = result.IsAcknowledged,
      AvatarUrl = avatarUrl,
    };
  }
}
