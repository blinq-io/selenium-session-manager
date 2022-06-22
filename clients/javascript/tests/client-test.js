import { Builder, By, Key } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import * as seleniumSessionClient from '../src/selenium-session-client.js';

let service = new chrome.ServiceBuilder('../java/chromedriver').build();
chrome.setDefaultService(service);
let driver = new Builder().forBrowser('chrome').build();

await seleniumSessionClient.initSession(driver, ['github']);
await driver.get('https://github.com');
setTimeout(async () => {
    await driver.quit();
}, 5000);