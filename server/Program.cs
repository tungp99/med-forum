using AS3.Modules.Authentication.Models;
using AS3.System;
using AS3.System.Amazon;
using AS3.System.MongoDB;

using HotChocolate.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpContextAccessor();
builder.Services.AddLogging(options => options.AddConsole());
builder.Services.AddCors(options =>
  options.AddDefaultPolicy(p =>
  {
    p.WithOrigins("*").AllowAnyHeader();
  }));
builder.Services.AddInMemorySubscriptions();

var amzS3Config = builder.Configuration.GetSection("AmzS3").Get<AmzS3Config>();
builder.Services.AddSingleton(new AmzS3Service(amzS3Config));

var dbConfig = builder.Configuration.GetSection("Mongo").Get<DatabaseConfiguration>();
builder.Services.AddAS3MongoDB(dbConfig);

var authConfig = builder.Configuration.GetSection("Auth").Get<AuthConfiguration>();
builder.Services.AddAS3Authentication(authConfig);

builder.Services.AddFluentValidation();

builder.Services.AddAS3GraphQL();

var app = builder.Build();

// if (app.Environment.IsDevelopment()) {
// }

app.UseCors();
app.UseWebSockets();

app.UseAuthentication();
app.UseAuthorization();

app.MapGraphQL("/")
  .WithOptions(new GraphQLServerOptions
  {
    EnableSchemaRequests = true,
    EnableMultipartRequests = true,
    Tool = {
      Title = "Service",
      Enable = true,
      DisableTelemetry = true,
      UseBrowserUrlAsGraphQLEndpoint = true,
    }
  });

app.Run();
