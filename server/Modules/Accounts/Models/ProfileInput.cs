namespace AS3.Modules.Accounts.Models;

public class ProfileInput {
  public bool IsPublic { get; set; }

  public string FirstName { get; set; } = string.Empty;

  public string LastName { get; set; } = string.Empty;

  public string? CountryCode { get; set; }

  public string PhoneNumber { get; set; } = string.Empty;

  public DateTime? BirthDate { get; set; }
}
