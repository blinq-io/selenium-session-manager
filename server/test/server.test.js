import { spawn } from "node:child_process";
import fetch from "node-fetch";
import chainer from "chai";
import fs from "fs";
import { TestClient } from "./TestClinet.js";
const expect = chainer.expect;
let bat;
let testClient;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const startServer = async () => {
  testClient = new TestClient("http://localhost:3001");
  bat = spawn("node", ["./src/cli.js"], {
    env: {
      ...process.env,
      serverPort: 3001,
      sessionJson: "./test/sessions/sessions.json",
      workingFolder: "./temp",
    },
  });
  bat.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });
  bat.stderr.on("data", (data) => {
    console.log(`stderr: ${data}`);
  });
};
before(async () => {
  startServer();
  await sleep(1000);
  //done();
});
after(() => {
  bat.kill();
  fs.rmSync("./temp", { recursive: true, force: true });
});
describe("SessionServer", function () {
  describe("get", function () {
    it("get request to the API should return the requested cookies", function (done) {
      fetch("http://localhost:3001/api/session?tags=aaa", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        expect(res.status).to.equal(200);
        res.json().then((data) => {
          expect(data.length).to.equal(1);
          expect(data[0].domain).to.equal(".web.whatsapp.com");
          done();
        });
      });
    });
  });
  describe("post", function () {
    it("Capture cookies and post it", function (done) {
      fetch("http://localhost:3001/api/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: '{"tags": ["bbb"], "cookies": { "domain": "aaa.com" }}',
      }).then((res) => {
        expect(res.status).to.equal(200);
        fetch("http://localhost:3001/api/session?tags=bbb", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => {
          expect(res.status).to.equal(200);
          res.json().then((data) => {
            expect(data.length).to.equal(1);
            expect(data[0].domain).to.equal("aaa.com");
            done();
          });
        });
        done();
      });
    });
    it("Tags overwrite", async function () {
      const startSessionsCount = await testClient.getSessionsCount();

      await testClient.postSession(
        '{"tags": ["ccc"], "cookies": { "domain": "aaa.com" }}'
      );
      await testClient.postSession(
        '{"tags": ["ccc"], "cookies": { "domain": "aaa.com" }}'
      );

      const endSessionCount = await testClient.getSessionsCount();
      expect(endSessionCount).to.equals(startSessionsCount + 1);
    });
  });
});
