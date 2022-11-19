using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

using AS3.Modules.Accounts.Models;
using AS3.Modules.Authentication.Models;

using Microsoft.IdentityModel.Tokens;

namespace AS3.Modules.Authentication;

public class AuthService {
  private AuthConfiguration Config { get; }

  public AuthService(AuthConfiguration config) {
    Config = config;
  }

  public string EncryptPassword(string password) {
    using (var algorithm = SHA384.Create()) {
      var bytes = Encoding.UTF8.GetBytes(password);
      var data = algorithm.ComputeHash(bytes);

      var sb = new StringBuilder();
      foreach (var b in data)
        sb.Append(b.ToString("x2"));
      return sb.ToString();
    }
  }

  public string GenerateAccessToken(Account account) {
    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Config.Key));

    var claims = new List<Claim>{
      new Claim(ClaimTypes.NameIdentifier, account.Id),
    };

    if (account.IsGod)
      claims.Add(new Claim(Constants.PERMISSIONS_CLAIM, Constants.FULL_ACCESS));

    var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha384);

    var token = new JwtSecurityToken(
      Config.Issuer,
      Config.Audience,
      claims,
      expires: DateTime.Now.AddDays(1),
      signingCredentials: signingCredentials
    );

    return new JwtSecurityTokenHandler().WriteToken(token);
  }

  public string GenerateRefreshToken() {
    var rnd = new byte[32];
    using (var generator = RandomNumberGenerator.Create()) {
      generator.GetBytes(rnd);
      return Convert.ToBase64String(rnd);
    }
  }

  public ClaimsPrincipal? GetClaimsFromExpiredToken(string accessToken) {
    var validationParams = new TokenValidationParameters {
      ValidIssuer = Config.Issuer,
      ValidateIssuer = true,
      ValidAudience = Config.Audience,
      ValidateAudience = true,
      IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Config.Key)),
      ValidateIssuerSigningKey = true,
      ValidateLifetime = false // ignore expiration
    };

    var principal = new JwtSecurityTokenHandler().ValidateToken(
      accessToken,
      validationParams,
      out SecurityToken jwt
    );

    if (jwt == null) {
      return null;
    }

    return principal;
  }
}
