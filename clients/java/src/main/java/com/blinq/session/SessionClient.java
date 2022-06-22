package com.blinq.session;

import org.json.JSONArray;
import org.json.JSONObject;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.devtools.Command;
import org.openqa.selenium.devtools.DevTools;
import org.openqa.selenium.devtools.HasDevTools;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class SessionClient {

    private static final String DEFAULT_SERVER_URL = "http://localhost:3000";
    private static String sessionServerUrl = null;

    /**
     * Set given cookies in given web driver session
     * @param driver RemoteWebDriver of the chrome browser
     * @param cookies array of cookies to be set
     * @throws Exception
     */
    public static void setSessionCookies(WebDriver driver, ArrayList<Object> cookies) throws Exception {

        Map<String, Object> cookiesMap = new HashMap<>();
        cookiesMap.put("cookies", cookies);

        DevTools devTools = ((HasDevTools)driver).getDevTools();
        devTools.createSession();

        // Set the cookies
        devTools.send(new Command("Network.setCookies", cookiesMap));
    }

    /**
     * Get cookies from session server according to given tags
     * @param sessionServer - URL of session server
     * @param tags - one ore more tags by which to get cookies
     * @return List of cookies
     * @throws Exception
     */
    public static ArrayList<Object> getSessionCookies(String sessionServer, String...tags) throws Exception {
        String tagsTxt = "";
        if(tags != null && tags.length > 0){
            tagsTxt = "?tags=" + String.join(",", tags);
        }
        URL sessionServerUrl = new URL(sessionServer + "/api/session" + tagsTxt);
        HttpURLConnection con = (HttpURLConnection) sessionServerUrl.openConnection();
        con.setRequestMethod("GET");
        int responseCode = con.getResponseCode();
        StringBuffer response = new StringBuffer();

        try (BufferedReader in = new BufferedReader(new InputStreamReader(
                con.getInputStream()))) {
            String inputLine;

            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
        }
        String cookiesJson = response.toString();
        ArrayList<Object> cookieParams = new ArrayList<>();

        JSONArray jsonArray = new JSONArray(cookiesJson);

        for(int i = 0; i < jsonArray.length(); i++) {
            JSONObject cookieJson = jsonArray.getJSONObject(i);
            cookieParams.add(cookieJson);
        }
        return cookieParams;
    }

    /**
     * Set the Session Server URL
     * @param url - session server URL
     */
    public static void setSessionServer(String url) {
        sessionServerUrl = url;
    }

    /**
     * Get the Session Server URL
     * @return Session Server URL
     */
    public static String getSessionServer() {
        String serverUrl = sessionServerUrl;
        if (serverUrl == null)
            serverUrl = System.getenv("SESSION_SERVER");
        if (serverUrl == null)
            serverUrl = DEFAULT_SERVER_URL;
        return serverUrl;
    }

    /**
     * Init WebDriver session with cookies stored in session server
     * @param driver - WebDriver to set cookies
     * @param tags - tags by which to get cookies from session server
     * @throws Exception
     */
    public static void initSession(WebDriver driver, String ...tags) throws Exception {
        setSessionCookies(driver, getSessionCookies(getSessionServer(), tags));
    }
}
