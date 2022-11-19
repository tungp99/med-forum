# stage 1 - build
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /source

# download libs
COPY *.csproj .
RUN dotnet restore

# publish app
COPY . .
RUN dotnet publish -c release -o /app --no-restore

# stage 2 - run
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "./aptech-semester-3-service.dll"]
