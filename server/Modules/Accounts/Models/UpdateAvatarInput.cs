using HotChocolate;
using HotChocolate.Types;

namespace AS3.Modules.Accounts.Models;

public class UpdateAvatarInput {
  public string? AccountId { get; set; }

  [GraphQLType(typeof(NonNullType<UploadType>))]
  public IFile File { get; set; }
}
