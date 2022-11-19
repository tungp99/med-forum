using System.Text;

using AS3.Modules.Accounts.Models;
using AS3.Modules.Accounts.Validators;
using AS3.Modules.Authentication;
using AS3.Modules.Authentication.Models;
using AS3.Modules.Authentication.Validators;
using AS3.Modules.Comments.Models;
using AS3.Modules.Comments.Validators;
using AS3.Modules.Posts.Models;
using AS3.Modules.Posts.Validators;
using AS3.System.GraphQL;
using AS3.System.GraphQL.Authentication;
using AS3.System.GraphQL.Validators;
using AS3.System.MongoDB;

using FluentValidation;

using HotChocolate.Execution.Configuration;
using HotChocolate.Types;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

using MongoDB.Driver;

namespace AS3.System;

public static class ServicesExtension {
  public static IServiceCollection AddAS3Authentication(
    this IServiceCollection services,
    AuthConfiguration config
  ) {
    var bytes = Encoding.UTF8.GetBytes(config.Key);
    var securityKey = new SymmetricSecurityKey(bytes);

    services.AddAuthentication(options => {
      options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
      options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    }).AddJwtBearer(options => {
      options.TokenValidationParameters = new TokenValidationParameters {
        ValidIssuer = config.Issuer,
        ValidateIssuer = true,
        ValidAudience = config.Audience,
        ValidateAudience = true,
        IssuerSigningKey = securityKey,
        ValidateIssuerSigningKey = true
      };
    });

    services.AddAuthorization(options => {
      options.AddPolicy(Constants.FULL_ACCESS, policy =>
        policy.RequireAuthenticatedUser()
          .RequireClaim(
            Constants.PERMISSIONS_CLAIM,
            Constants.FULL_ACCESS));
    });

    services.AddSingleton(new AuthService(config));
    return services;
  }

  public static IServiceCollection AddAS3MongoDB(
    this IServiceCollection services,
    DatabaseConfiguration config
  ) {
    var db = new MongoClient(config.ConnectionString).GetDatabase(config.Name);

    return services
      .AddSingleton(db.GetCollection<Account>(Account.COLLECTION_NAME))
      .AddSingleton(db.GetCollection<Post>(Post.COLLECTION_NAME))
      .AddSingleton(db.GetCollection<Comment>(Comment.COLLECTION_NAME))
      ;
  }

  public static IServiceCollection AddFluentValidation(this IServiceCollection services) {
    return services
      .AddSingleton<PasswordValidator>()
      .AddSingleton<ProfileInputValidator>()

      .AddSingleton<Modules.Accounts.Validators.Rules>()
      .AddSingleton<KeyExistenceValidator<Account>>()
      .AddValidatorsFromAssemblyContaining<UpdateAccountInputValidator>()
      .AddValidatorsFromAssemblyContaining<ProfessionInputValidator>()
      .AddValidatorsFromAssemblyContaining<QualificationInputValidator>()

      .AddValidatorsFromAssemblyContaining<LoginInputValidator>()
      .AddValidatorsFromAssemblyContaining<RegisterInputValidator>()

      .AddSingleton<KeyExistenceValidator<Post>>()
      .AddValidatorsFromAssemblyContaining<CreatePostInputValidator>()
      .AddValidatorsFromAssemblyContaining<UpdatePostInputValidator>()

      .AddSingleton<Modules.Comments.Validators.Rules>()
      .AddSingleton<KeyExistenceValidator<Comment>>()
      .AddValidatorsFromAssemblyContaining<CreateCommentInputValidator>()
    ;
  }

  private static IRequestExecutorBuilder AddGraphQLModule<T>(this IRequestExecutorBuilder builder) where T : IAS3Module {
    Activator.CreateInstance<T>().Configure(builder);
    return builder;
  }

  public static IServiceCollection AddAS3GraphQL(this IServiceCollection services) {
    services
      .AddErrorFilter<ErrorFilter>()
      .AddHttpResultSerializer<HttpSerializer>()
    ;

    services
      .AddGraphQLServer()
      .AddAuthorization()
      .AddHttpRequestInterceptor<IdentityRequestInterceptor>()
      .AddFairyBread()
      .AddDefaultTransactionScopeHandler()
      .ModifyRequestOptions(options => options.IncludeExceptionDetails = true)
      .AddMutationConventions(false)
      .AddQueryType(d => d.Name(OperationTypeNames.Query))
      .AddMongoDbFiltering()
      .AddMongoDbSorting()
      .AddMongoDbPagingProviders()
      .AddMutationType(d => d.Name(OperationTypeNames.Mutation))
      .AddSubscriptionType(d => d.Name(OperationTypeNames.Subscription))
      .AddType<UploadType>()
      .AddGraphQLModule<Modules.Authentication.Schema>()
      .AddGraphQLModule<Modules.Accounts.Schema>()
      .AddGraphQLModule<Modules.Posts.Schema>()
      .AddGraphQLModule<Modules.Comments.Schema>()
      ;

    return services;
  }
}
