using HotChocolate;
using HotChocolate.Types;

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace AS3.System.MongoDB;

public abstract class BaseEntity {
  [BsonId]
  [BsonRepresentation(BsonType.ObjectId)]
  [GraphQLType(typeof(IdType))]
  [GraphQLNonNullType]
  public string Id { get; set; } = string.Empty;

  public DateTime CreatedAt { get; set; } = DateTime.Now;

  public DateTime UpdatedAt { get; set; } = DateTime.Now;
}
