```sh
$ pwd
<redacted>/as3-doctor-forum/med-forum-service

$ dotnet --info
.NET SDK (reflecting any global.json):
 Version:   6.0.102
 Commit:    02d5242ed7

Runtime Environment:
 OS Name:     ubuntu
 OS Version:  20.04
 OS Platform: Linux
 RID:         ubuntu.20.04-x64
 Base Path:   <redacted>/dotnet/sdk/6.0.102/

Host (useful for support):
  Version: 6.0.2
  Commit:  839cdfb0ec

.NET SDKs installed:
  6.0.102 [<redacted>/dotnet/sdk]

.NET runtimes installed:
  Microsoft.AspNetCore.App 6.0.2 [<redacted>/dotnet/shared/Microsoft.AspNetCore.App]
  Microsoft.NETCore.App 6.0.2 [<redacted>/dotnet/shared/Microsoft.NETCore.App]

To install additional .NET runtimes or SDKs:
  https://aka.ms/dotnet-download

$ dotnet restore
  Determining projects to restore...
  Restored <redacted>/as3-doctor-forum/med-forum-service/aptech-semester-3-service.csproj (in 1.98 sec).

$ dotnet run
Building...
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://localhost:8008
info: Microsoft.Hosting.Lifetime[0]
      Application started. Press Ctrl+C to shut down.
info: Microsoft.Hosting.Lifetime[0]
      Hosting environment: Development
info: Microsoft.Hosting.Lifetime[0]
      Content root path: <redacted>/as3-doctor-forum/med-forum-service/
```
