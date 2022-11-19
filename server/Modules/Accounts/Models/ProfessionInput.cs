namespace AS3.Modules.Accounts.Models;

public class ProfessionInput {
  public string? AccountId { get; set; }

  public string Organization { get; set; } = string.Empty;

  public DateTime? Start { get; set; }

  public DateTime? End { get; set; }

  public string Position { get; set; } = string.Empty;

  public bool IsWorking { get; set; }
}
