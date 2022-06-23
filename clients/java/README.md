# Java client

To add the dependencies into your project:
### Gradle
```gradle
implementation group: 'com.blinq.session', name: 'selenium-session-client', version: '1.0.0'
```
### Maven
```maven
<dependency>
    <groupId>com.blinq.session</groupId>
    <artifactId>selenium-session-client</artifactId>
    <version>1.0.0</version>
</dependency>
```

Following is a code example to integrate it into your Java Selenium tests:
```java
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

```
