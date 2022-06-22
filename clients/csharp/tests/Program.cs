using OpenQA.Selenium.Chrome;

namespace tests {
  class Program {
    public static async Task Main(string[] args)
    {
        await test();
    }

    public static async Task test()
    {
        ChromeDriver driver = new ChromeDriver("../../java/");
        await SessionClient.initSession(driver, new string [] { "github"});
        driver.Url = "https://github.com";
        Thread.Sleep(5000);
        driver.Close();
    }
  }
}