<p align="center">
    <img src="https://blinq.io/wp-content/uploads/2022/06/Blinqio128_128.png" alt="Selenium Session Manager logo">
</p>

# Selenium-Session-Manager
The Selenium Session Manager (SSM) project enables easy configuration of your test environment by bypassing your app login screen. This is accomplished by managing your browser session (cookies). 
Note that support for the Selenium Session Manager and its components is available in the BlinqIO forum: https://community.blinq.io/
## Why should I bypass my app login screen?
There are several advantages to bypass the application login screen:
1. tests run faster.
2. no need for complex authentication scenarios such as multi-factor, captch and more.
3. tests can run on a production environment without the need to create a backdoor.

## The solution's main components
The Seleniun Session Manager installation process comprises of three parts: installing the Selenium Session Server (SSS), installing the Selenium Session Extension (SSE) and adding the Selenium Session Client (SSC) to your selenium project.
1. Selenium Session Extension (SSE) - a Chrome extention that enables to copy the session information and store it in the Selenium Session Server (https://chrome.google.com/webstore/detail/selenium-session-connecto/fedcmiifkeclkmhgclkicjoklealdlnm).
2. Selenium Session Server (SSS)- a server that store all the session cookies (https://github.com/blinq-io/selenium-session-manager/tree/master/server).
3. Selenium Session Client (SSC) - a client that integrates into your tests, retrieves the session information from the Selenium Session Server and applies the session cookies into the running selenium browser (https://github.com/blinq-io/selenium-session-manager/tree/master/clients).


## Prerequisites
Your selenium project should be using **Selenium 4.x** or greater. This version is required due to the use of the DevTools capabilities available in this version.
The solution will work only for **browsers that support DevTools** capabilities.

