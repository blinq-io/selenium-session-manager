#!/usr/bin/env node
import SeleniumSessionServer from "./selenium-session.js";
import logo from "./logo.js";

console.log(logo);
new SeleniumSessionServer().initServer();