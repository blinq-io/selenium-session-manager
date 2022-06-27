package io.blinq.test;

import io.blinq.session.SeleniumSessionClient;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.chrome.ChromeDriver;

public class SeleniumSessionClientTest {

    @Test
    public void testSeleniumSession() throws Exception{
        System.setProperty("webdriver.chrome.driver","chromedriver.exe");
        ChromeDriver driver = new ChromeDriver();
        SeleniumSessionClient.initSession(driver, "github");
        driver.get("https://github.com/");
        Thread.sleep(5000);
        driver.quit();
    }
}
