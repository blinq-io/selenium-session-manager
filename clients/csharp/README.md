# C# client

## Prerequisites
.Net 6.0 SDK installed

## To Build
dotnet build

## To upload to nuget.org
dotnet nuget push src\SeleniumSessionClient\bin\Debug\SeleniumSessionClient.\<version\>.nupkg --api-key API_KEY --source https://api.nuget.org/v3/index.json

## How to add it to your tests

### Nuget
To add the dependencies into your project:
```bash
PM> Install-Package SeleniumSession.Client -Version 1.0.0
```

### Code example
Following is a code example to integrate it into your C# Selenium tests:
```cs
    ChromeDriver driver = new ChromeDriver(); // Make sure chromedriver is in your path
    await SeleniumSessionClient.SeleniumSessionClient.initSession(driver, new string [] { "github"});
    driver.Url = "https://github.com";
    Thread.Sleep(5000);
    driver.Close();
```
