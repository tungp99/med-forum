using HotChocolate;

using System.Globalization;

namespace AS3.Modules.Accounts.Models;

public class Profile {
  public bool IsPublic { get; set; } = true;

  public string? AvatarUrl { get; set; }

  public string FirstName { get; set; } = string.Empty;

  public string LastName { get; set; } = string.Empty;

  public string CountryCode { get; set; } = RegionInfo.CurrentRegion.TwoLetterISORegionName;

  public string GetCountry([Parent] Profile parent)
    => !string.IsNullOrEmpty(parent.CountryCode) ? new RegionInfo(parent.CountryCode).DisplayName : "unknown";

  public string PhoneNumber { get; set; } = string.Empty;

  public DateTime? BirthDate { get; set; }

  public ICollection<Profession> Experience { get; set; } = new List<Profession>();

  public ICollection<Profession> Education { get; set; } = new List<Profession>();

  public ICollection<Qualification> Qualifications { get; set; } = new List<Qualification>();
}
