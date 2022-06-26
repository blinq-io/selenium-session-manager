# Selenium Session Server (SSS)
A server that stores your sessions (saved by the Selenium Session Extension, i.e. the chrome extension), that then can be accessed by your selenium tests to retrieve the session cookies. .
Note that support to the Selenium Session Manager and its components is available at the BlinqIO forum: https://community.blinq.io/ .

## You can get the server as npm package [(npm)](https://www.npmjs.com/package/selenium-session)

```bash
npm install -g selenium-session
```

Once installed to run the server
```bash
selenium-session
```
## Or you can download and run a dockerized version [(docker hub)](https://hub.docker.com/r/devblinq/selenium-session)
```bash
docker run -v ${PWD}/sessions:/usr/app/sessions -it -p 3000:3000 devblinq/selenium-session
```
