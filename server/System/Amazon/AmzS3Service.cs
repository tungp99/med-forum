using System.Security.Cryptography;
using System.Text;

using Amazon;
using Amazon.S3;
using Amazon.S3.Model;

namespace AS3.System.Amazon;

public class AmzS3Service {
  private AmzS3Config Config { get; }
  private AmazonS3Client Client { get; }

  public AmzS3Service(AmzS3Config config) {
    Config = config;
    Client = new AmazonS3Client(
      config.AccessKeyId,
      config.AccessKeySecret,
      RegionEndpoint.APSoutheast1);
  }

  public async Task<string> UploadFile(string fileName, Stream contentStream) {
    try {
      using MD5 md5 = MD5.Create();
      var inputBytes = Encoding.UTF8.GetBytes(DateTime.Now.ToUniversalTime().ToString());
      var hashBytes = md5.ComputeHash(inputBytes);

      var key = $"{Convert.ToHexString(hashBytes)}_{fileName}";
      var putRequest = new PutObjectRequest {
        BucketName = Config.BucketName,
        Key = key,
        InputStream = contentStream
      };

      await Client.PutObjectAsync(putRequest);

      return $"https://{Config.BucketName}.s3.{RegionEndpoint.APSoutheast1.SystemName}.amazonaws.com/{key}";
    } catch (AmazonS3Exception ex) {
      throw new Exception(ex.Message);
    }
  }
}
