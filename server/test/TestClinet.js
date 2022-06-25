import fetch from "node-fetch";

class TestClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  getSessionsCount = async () => {
    const res = await fetch(this.baseUrl + "/api/sessions", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("fetch end");
    const data = await res.json();
    return data.length;
  };
  postSession = async (body) => {
    await fetch(this.baseUrl + "/api/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: typeof body === "string" ? body : JSON.stringify(body),
    });
  };
}
export { TestClient };
