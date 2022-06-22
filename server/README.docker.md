<p align="center">
    <img src="https://blinq.io/wp-content/uploads/2022/06/Blinqio128_128.png" alt="Selenium Session Manager logo">
</p>

# Selenium Session Server
A simple server that store your sessions (saved by the chrome extention).
Then can be accessed by your selenium tests to retrieve the session cookies.
[A full project documentation can be found here](https://github.com/blinq-io/selenium-session-manager)

Use:
```bash
docker run -v ${PWD}/sessions:/usr/app/sessions -it -p 3000:3000 devblinq/selenium-session
```

