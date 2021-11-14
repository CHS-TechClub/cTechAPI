const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const config = require("./config.json");

app.enable('verbose errors');
require('events').EventEmitter.defaultMaxListeners = 0;
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Ok");
})

app.listen(port);
