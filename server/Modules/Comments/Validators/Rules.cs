using AS3.Modules.Comments.Models;
using MongoDB.Driver;

namespace AS3.Modules.Comments.Validators;

public class Rules {
  private IMongoCollection<Comment> Collection { get; set; }
  public Rules(IMongoCollection<Comment> collection) {
    Collection = collection;
  }

  private string _parentId = "";
  public string HaveParentCommentErrorMsg => $"Comment {_parentId} no longer exists";
  public bool HaveParentComment(string parentId) {
    var count = Collection.Find(s => s.Id == parentId).CountDocuments();
    _parentId = parentId;
    return count == 1;
  }
}
