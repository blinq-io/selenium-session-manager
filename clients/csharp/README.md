# C# client
Following is a code example to integrate it into your C# Selenium tests:
```cs
    ChromeDriver driver = new ChromeDriver("../../");
    await SessionClient.initSession(driver, new string [] { "github"});
    driver.Url = "https://github.com";
    Thread.Sleep(5000);
    driver.Close();

```

To add the dependencies into your project:
### Nuget
```bash
PM> Install-Package SeleniumSession.Client -Version 1.0.0
```
