using OpenQA.Selenium.Chrome;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace SeleniumSessionClientTests;
public class SeleniumSessionClientTests
{
    [Fact]
    public static async Task test()
    {
	    ChromeDriver driver = new ChromeDriver(); // Make sure chromedriver is in your path
        await SeleniumSessionClient.SeleniumSessionClient.initSession(driver, new string [] { "github"});
        driver.Url = "https://github.com";
        Thread.Sleep(5000);
        driver.Close();
    }
}
