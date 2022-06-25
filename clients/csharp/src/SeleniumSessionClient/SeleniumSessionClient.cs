using OpenQA.Selenium.Chrome;
using Newtonsoft.Json;
using System.Threading.Tasks;
using System.Net.Http;
using System.Collections.Generic;

namespace SeleniumSessionClient;
public class SeleniumSessionClient
{
    private static string DEFAULT_SESSION_SERVER = "http://localhost:3000";
    private static string? sessionServer = null;

    /// <summary>
    /// Set the session server address.
    /// </summary>
    /// <param name="server">The session server address.</param>
    public static void setSessionServer(string server)
    {
        sessionServer = server;
    }

    /// <summary>
    /// Get the session server address.
    /// </summary>
    /// <returns>The session server address.</returns>
    public static string getSessionServer()
    {
        if (sessionServer != null)
        {
            return sessionServer;
        }
        sessionServer = System.Environment.GetEnvironmentVariable("SESSION_SERVER");
        if (sessionServer != null)
        {
            return sessionServer;
        }
        return DEFAULT_SESSION_SERVER;
    }

    /// <summary>
    /// Get cookies from session server according to given tags
    /// </summary>
    /// <param name="sessionServer">url of session server</param>
    /// <param name="tags">array of tags according to which to get the cookies</param>
    /// <returns>JSON with cookies</returns>
    public static async Task<object> GetSessionCookies(string sessionServer, string[] tags)
    {
        string tagsParam = tags == null ? "" : $"?tags={string.Join(" ", tags)}";
        string url = $"{sessionServer}/api/session{tagsParam}";
        HttpClient client = new HttpClient();
        HttpResponseMessage response = await client.GetAsync(url);
        response.EnsureSuccessStatusCode();
        string responseBody = await response.Content.ReadAsStringAsync();
        return JsonConvert.DeserializeObject<object>(responseBody);
    }

    /// <summary>
    /// Set driver cookies according to given cookies
    /// </summary>
    /// <param name="driver">driver for which to set cookies</param>
    /// <param name="cookies">cookies to set</param>
    public static void SetSessionCookies(ChromeDriver driver, object cookies)
    {
        Dictionary<string, object> cdpCookies = new Dictionary<string, object>();
        cdpCookies.Add("cookies", cookies);
        driver.ExecuteCdpCommand("Network.setCookies", cdpCookies);
    }

    /// <summary>
    /// Initialize session of given driver with cookies from session server according to given tags
    /// </summary>
    /// <param name="driver">driver for which to set cookies</param>
    /// <param name="tags">tags by which to get cookies to set from session server</param>
    public static async Task initSession(ChromeDriver driver, string[] tags)
    {
        var cookies = await GetSessionCookies(getSessionServer(), tags);
        SetSessionCookies(driver, cookies);
    }
}