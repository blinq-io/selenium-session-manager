<p align="center">
    <img src="https://blinq.io/wp-content/uploads/2022/06/Blinqio128_128.png" alt="Selenium Session Manager logo">
</p>

# selenium-session-manager
Bypass your app login screen by managing your browser session (cookies).
This project enable your selenium automation tests to bypass your applicaiton login screen.
## Why should I bypass my app login screen?
1. It enable your tests to run faster.
2. It can eliminate the need for complex autentication scenarios like: multi-factor, captch...
3. It can enable you to run your tests on production environment without the need to create backdoor.

## The solution main components
The solution include 3 main components:
1. Chrome extention - the extention will enable you to copy your session information and store it in the Session Server.
2. [Session Server](https://github.com/blinq-io/selenium-session-manager/tree/master/server) - a server that store all the session cookies.
3. [Selenium client](https://github.com/blinq-io/selenium-session-manager/tree/master/clients) - integrate into your tests, retrive the session information from the Session Server, apply the session cookies into the running selenium browser.



