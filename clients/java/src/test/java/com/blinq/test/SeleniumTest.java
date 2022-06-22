package com.blinq.test;

import com.blinq.session.SessionClient;
import org.openqa.selenium.chrome.ChromeDriver;

public class SeleniumTest {
    public static void main(String...args) throws Exception{
        System.setProperty("webdriver.chrome.driver","chromedriver.exe");
        ChromeDriver driver = new ChromeDriver();
        SessionClient.initSession(driver, "github");
        driver.get("https://github.com/");
        Thread.sleep(5000);
        driver.quit();
    }
}
