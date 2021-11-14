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

app.enable('verbose errors');
require('events').EventEmitter.defaultMaxListeners = 0;
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const PlayerData = require("./routes/PlayerData");

app.get("/", (req, res) => {
  res.send("Ok");
})

app.use("/player", new PlayerData(connection).router);

app.listen(port);
