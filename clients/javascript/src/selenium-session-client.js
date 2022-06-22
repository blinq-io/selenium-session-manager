import fetch from 'node-fetch';

const DEFAULT_SESSION_SERVER = 'http://localhost:3000';
let sessionServer = null;

/**
 * get cookies from session server according to given tags
 * @param {*} sessionServer - session server url
 * @param {*} tags - tags by which to get cookies
 * @returns 
 */
const getSessionCookies = async (sessionServer, tags) => {
  let tagsTxt = tags ? `?tags=${tags.join(',')}` : '';
  let cookies = await fetch(`${sessionServer}/api/session${tagsTxt}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await cookies.json();
};

/**
 * set cookies to session server according to given cookies
 * @param {*} driver - selenium webdriver
 * @param {*} cookies - cookies to set
 */
const setSessionCookies = async (driver, cookies) => {
  await driver.sendAndGetDevToolsCommand('Network.clearBrowserCookies');
  await driver
    .sendAndGetDevToolsCommand('Network.setCookies', { cookies: cookies })
    .then(() => {
      console.log('cookies has been set');
    });
}

/**
 * Set session server URL
 * @param {*} server 
 */
const setSessionServer = (server) => {
  sessionServer = server;
}

/**
 * Get session server URL
 * @returns session server url
 */
const getSessionServer = () => {
  return sessionServer || process.env.SESSION_SERVER || DEFAULT_SESSION_SERVER;
}

/**
 * Init webdriver session with cookies from session server according to given tags
 * @param {*} driver - selenium webdriver to set cookies to
 * @param {*} tags - tags by which to get cookies
 */
const initSession = async (driver, tags) => {
  let cookies = await getSessionCookies(getSessionServer(), tags);
  await setSessionCookies(driver, cookies);
}

export { getSessionCookies, setSessionCookies, setSessionServer, getSessionServer, initSession };
