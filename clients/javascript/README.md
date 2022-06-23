# Javascript client

To install run:
```bash
npm install selenium-session-client
```

Following is a code example to integrate it into your Javascript Selenium tests:
```javascript
import { Builder } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import * as seleniumSessionClient from 'selenium-session-client';

let service = new chrome.ServiceBuilder('../java/chromedriver').build();
chrome.setDefaultService(service);
let driver = new Builder().forBrowser('chrome').build();

await seleniumSessionClient.initSession(driver, ['github']);
await driver.get('https://github.com');

```
