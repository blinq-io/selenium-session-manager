# Java client
The Java Selenium Session Client (SSC) integrates into your tests, retrieves the session information from the Selenium Session Server and applies the session cookies into the running selenium browser.

Note that support to the Selenium Session Manager and its components is available at the BlinqIO forum: https://community.blinq.io/ .

Following is a code example to integrate it into your Java Selenium tests:
```java
import io.blinq.session.SeleniumSessionClient;
import org.openqa.selenium.chrome.ChromeDriver;

public class SeleniumTest {
    public static void main(String...args) throws Exception{
        System.setProperty("webdriver.chrome.driver","chromedriver.exe");
        ChromeDriver driver = new ChromeDriver();
        SeleniumSessionClient.initSession(driver, "github");
        driver.get("https://github.com/");
        Thread.sleep(5000);
        driver.quit();
    }
}

```

To add the dependencies into your project:
### Gradle
```gradle
implementation group: 'io.blinq.SeleniumSessionClient', name: 'SeleniumSessionClient', version: '1.0.0'
```
### Maven
```maven
<dependency>
    <groupId>io.blinq.SeleniumSessionClient</groupId>
    <artifactId>SeleniumSessionClient</artifactId>
    <version>1.0.0</version>
</dependency>
```
