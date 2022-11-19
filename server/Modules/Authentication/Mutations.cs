using System.Security.Authentication;
using System.Security.Claims;

using AS3.Modules.Accounts.Models;
using AS3.Modules.Authentication.Models;
using AS3.Modules.Authentication.Validators;
using AS3.System.GraphQL.Authentication;
using AS3.System.GraphQL.Models;

using FairyBread;

using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Subscriptions;
using HotChocolate.Types;

using MongoDB.Driver;

namespace AS3.Modules.Authentication;

[ExtendObjectType(OperationTypeNames.Mutation)]
public class Mutations {
  public LoginPayload Register(
    [Validate(typeof(RegisterInputValidator))] RegisterInput input,
    [Service] IMongoCollection<Account> collection,
    [Service] AuthService service,
    [Service] ITopicEventSender sender
  ) {
    var pwdHash = service.EncryptPassword(input.Password);
    var entity = new Account {
      Email = input.Email,
      Username = input.Email,
      PasswordHash = pwdHash,
      Profile = {
        IsPublic = true,
        FirstName = input.Profile.FirstName,
        LastName = input.Profile.LastName,
        BirthDate = input.Profile.BirthDate,
        PhoneNumber = input.Profile.PhoneNumber,
        CountryCode = input.Profile.CountryCode ?? "VN"
      },
    };

    collection.InsertOne(entity);

    var accessToken = service.GenerateAccessToken(entity);
    var refreshToken = service.GenerateRefreshToken();

    var criteria = Builders<Account>.Filter.Eq(s => s.Id, entity.Id);
    var update = Builders<Account>.Update
      .Set(s => s.RefreshToken, refreshToken)
      .Set(s => s.RefreshTokenExpiration, DateTime.Now.AddDays(3));
    collection.UpdateOne(criteria, update);

    sender.SendAsync(nameof(Subscriptions.AccountCreated), 1);
    sender.SendAsync(nameof(Subscriptions.AuthenticationStatistics), 1);

    return new LoginPayload {
      AccessToken = accessToken,
      RefreshToken = refreshToken,
    };
  }

  [Error(typeof(AuthenticationException))]
  public LoginPayload Login(
    [Validate(typeof(LoginInputValidator))] LoginInput input,
    [Service] IMongoCollection<Account> collection,
    [Service] AuthService service,
    [Service] ITopicEventSender sender
  ) {
    var encPwd = service.EncryptPassword(input.Password);

    var filter = Builders<Account>.Filter;

    var criteria = filter.Eq(s => s.PasswordHash, encPwd)
    // if <username> is there, find by username
      & (!string.IsNullOrWhiteSpace(input.Username)
        ? filter.Eq(s => s.Username, input.Username)
    // if <email> is there, find by email
        : !string.IsNullOrWhiteSpace(input.Email)
        ? filter.Eq(s => s.Email, input.Email)
    // else ;)
        : filter.Exists(s => s.Id));

    var account = collection.Find(criteria).FirstOrDefault();

    if (account != null) {
      var accessToken = service.GenerateAccessToken(account);
      var refreshToken = service.GenerateRefreshToken();

      var update = Builders<Account>.Update
        .Set(s => s.RefreshToken, refreshToken)
        .Set(s => s.RefreshTokenExpiration, DateTime.Now.AddDays(3));
      collection.UpdateOne(criteria, update);

      sender.SendAsync(nameof(Subscriptions.AuthenticationStatistics), 1);

      return new LoginPayload {
        AccessToken = accessToken,
        RefreshToken = refreshToken,
      };
    }

    throw new AuthenticationException("failed to authenticate user");
  }

  [Authorize(Policy = Constants.FULL_ACCESS)]
  [Error(typeof(AuthenticationException))]
  public LoginPayload AdminLogin(
    [Validate(typeof(LoginInputValidator))] LoginInput input,
    [Service] IMongoCollection<Account> collection,
    [Service] AuthService service,
    [Service] ITopicEventSender sender
  ) {
    return Login(input, collection, service, sender);
  }

  public RefreshTokenPayload RefreshAccessToken(
    RefreshTokenInput input,
    [Service] IMongoCollection<Account> collection,
    [Service] AuthService service,
    [Service] ITopicEventSender sender
  ) {
    var payload = new RefreshTokenPayload();

    var principal = service.GetClaimsFromExpiredToken(input.AccessToken);

    if (principal == null) {
      return payload;
    }

    var identifierClaim = principal.Claims
    // this is Account.Id
      .FirstOrDefault(s => s.Type == ClaimTypes.NameIdentifier);
    if (identifierClaim == null) {
      return payload;
    }

    var filter = Builders<Account>.Filter;
    var criteria = filter.Eq(s => s.Id, identifierClaim.Value)
      & filter.Eq(s => s.RefreshToken, input.RefreshToken)
      & filter.Gt(s => s.RefreshTokenExpiration, DateTime.Now);
    var account = collection.Find(criteria).FirstOrDefault();

    if (account == null) {
      return payload;
    }

    payload.AccessToken = service.GenerateAccessToken(account);
    payload.RefreshToken = service.GenerateRefreshToken();

    criteria = filter.Eq(s => s.Id, identifierClaim.Value);
    var update = Builders<Account>.Update
      .Set(s => s.RefreshToken, payload.RefreshToken)
      .Set(s => s.RefreshTokenExpiration, DateTime.Now.AddDays(3))
    ;

    var result = collection.UpdateOne(criteria, update);
    payload.IsSuccess = result.IsAcknowledged;

    if (result.IsAcknowledged) {
      sender.SendAsync(nameof(Subscriptions.AccountCreated), 1);
      sender.SendAsync(nameof(Subscriptions.AuthenticationStatistics), 1);
    }

    return payload;
  }

  public UpdateEntityPayload ChangePassword(
    [Validate(typeof(ChangePasswordInputValidator))] ChangePasswordInput input,
    [IdentityGlobalState] Identity identity,
    [Service] IMongoCollection<Account> collection,
    [Service] AuthService service
  ) {
    var encryptedPassword = service.EncryptPassword(input.CurrentPassword);
    var filter = Builders<Account>.Filter;
    var criteria = filter.Eq(s => s.Id, identity.Id);

    var account = collection.Find(criteria & filter.Eq(s => s.PasswordHash, encryptedPassword))
      .FirstOrDefault();
    if (account == null)
      return new UpdateEntityPayload {
        IsSuccess = false,
        AffectedRecords = 0
      };

    var newEncryptedPassword = service.EncryptPassword(input.NewPassword);

    var update = Builders<Account>.Update
      .Set(s => s.PasswordHash, newEncryptedPassword)
      .Set(s => s.UpdatedAt, DateTime.Now);
    var result = collection.UpdateOne(criteria, update);

    return new UpdateEntityPayload {
      IsSuccess = result.IsAcknowledged,
      AffectedRecords = (int)result.ModifiedCount
    };
  }

  public bool TriggerLogout([Service] ITopicEventSender sender) {
    sender.SendAsync(nameof(Subscriptions.AuthenticationStatistics), -1);
    return true;
  }
}
