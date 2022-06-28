# How to build and upload to nuget.org

## Prerequisites
.Net 6.0 SDK installed

## To Build
```bash
dotnet build
```

## To upload to nuget.org
```bash
dotnet nuget push src\SeleniumSessionClient\bin\Debug\SeleniumSessionClient.\<version\>.nupkg --api-key API_KEY --source https://api.nuget.org/v3/index.json
```