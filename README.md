<p align="center">
    <img src="https://blinq.io/wp-content/uploads/2022/06/Blinqio128_128.png" alt="Selenium Session Manager logo">
</p>

# Selenium-Session-Manager
The Selenium Session Manager (SSM) enables easy configuration of your test environment by bypassing your app login screen. This is accomplished by managing your browser session (cookies). This project enables your selenium automation tests to bypass your application login screen.
## Why should I bypass my app login screen?
There are several advantages to bypass the application login screen:
1. tests run faster.
2. no need for complex authentication scenarios such as multi-factor, captch and more.
3. tests can run on a production environment without the need to create a backdoor.

## The solution main components
The solution include 3 main components:
1. Chrome extention - the extention will enable you to copy your session information and store it in the Session Server.
2. [Session Server](https://github.com/blinq-io/selenium-session-manager/tree/master/server) - a server that store all the session cookies.
3. [Selenium client](https://github.com/blinq-io/selenium-session-manager/tree/master/clients) - integrate into your tests, retrieve the session information from the Session Server, apply the session cookies into the running selenium browser.



