<p align="center">
    <img src="https://blinq.io/wp-content/uploads/2022/06/Blinqio128_128.png" alt="Selenium Session Manager logo">
</p>

# Selenium Session Server
A simple server that stores the sessions (saved by the Selenium Session Connector i.e. the chrome extension), that can then be accessed by your selenium tests to retrieve the session cookies.
Note that support to the Selenium Session Manager and its components is available at the BlinqIO forum: https://community.blinq.io/ .
[A full project documentation can be found here](https://github.com/blinq-io/selenium-session-manager)

Use:
```bash
docker run -v ${PWD}/sessions:/usr/app/sessions -it -p 3000:3000 devblinq/selenium-session
```

