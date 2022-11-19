using AS3.Modules.Accounts.Models;

using MongoDB.Driver;

namespace AS3.Modules.Accounts.Validators;

public class Rules {
  private IMongoCollection<Account> Collection { get; set; }

  public Rules(IMongoCollection<Account> collection) {
    Collection = collection;
  }

  private string _email = "";
  public string HaveUniqueEmailErrorMsg => $"Email {_email} has already been taken";
  public bool HaveUniqueEmail(string value) {
    var count = Collection.Find(s => s.Email == value).CountDocuments();
    _email = value;
    return count == 0;
  }

  private string _username = "";
  public string HaveUniqueUsernameErrorMsg => $"Username {_username} has already been taken";
  public bool HaveUniqueUsername(UpdateAccountInput input) {
    var filter = Builders<Account>.Filter;
    var criteria = filter.Eq(s => s.Username, input.Username)
      & filter.Not(filter.Eq(s => s.Id, input.Id));

    var count = Collection.Find(criteria).CountDocuments();
    _username = input.Username ?? "";
    return count == 0;
  }

  public bool HaveUniqueUsername(CreateAccountInput input) {
    var filter = Builders<Account>.Filter;
    var criteria = filter.Eq(s => s.Username, input.Username);

    var count = Collection.Find(criteria).CountDocuments();
    _username = input.Username ?? string.Empty;
    return count == 0;
  }

  public bool HaveUniqueUsername(string value) {
    var count = Collection.Find(s => s.Username == value).CountDocuments();
    _username = value;
    return count == 0;
  }
}
