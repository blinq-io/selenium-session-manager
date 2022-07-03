# Javascript client

The Javascript Selenium Session Client (SSC) integrates into your tests, retrieves the session information from the Selenium Session Server and applies the session cookies into the running selenium browser.

Note that support to the Selenium Session Manager and its components is available at the BlinqIO forum: https://community.blinq.io/ .

To install the Javascript client, run:
```bash
npm install selenium-session-client
```

Following is a code example to integrate it into your Javascript Selenium tests:
```javascript
import { Builder } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

// import the selenium-session-client package
import * as seleniumSessionClient from 'selenium-session-client';

let service = new chrome.ServiceBuilder('./chromedriver').build();
chrome.setDefaultService(service);
let driver = new Builder().forBrowser('chrome').build();

// init the selenium session using a preset saved session with 'github' tag
await seleniumSessionClient.initSession(driver, ['github']);

await driver.get('https://github.com');

```
