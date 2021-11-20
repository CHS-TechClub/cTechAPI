const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const config = require("./config.json");
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: config.database.host,
  user: config.database.username,
  password: config.database.password,
  database: "ctechsmp"
});

//Insecure but the inputs are sql sanitized and we just return raw json...
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.enable('verbose errors');
require('events').EventEmitter.defaultMaxListeners = 0;
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const PlayerData = require("./routes/PlayerData");
const GroupData = require("./routes/GroupData");

app.get("/", (req, res) => {
  res.send("Ok");
})

app.use("/players", new PlayerData(connection).router);
app.use("/groups", new GroupData(connection).router);

app.listen(port);
