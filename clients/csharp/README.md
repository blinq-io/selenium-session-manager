# C# client
The C# Selenium Session Client (SSC) integrates into your tests, retrieves the session information from the Selenium Session Server and applies the session cookies into the running selenium browser.
Note that support to the Selenium Session Manager and its components is available at the BlinqIO forum: https://community.blinq.io/ .
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
PM> Install-Package SeleniumSessionClient
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
