const Route = require("./Route");

class PlayerData extends Route {
  constructor(databaseConnection) {
    super(databaseConnection);
  }

  registerRoutes() {
    this.router.get("/:uuid?", (req, res) => {
      let uuid = req.params.uuid;
      let data = {
        "uuid": "",
        "groupName": "",
        "rankName": "",
        "playerCoins": 0,
        "killed": [],
        "killedBy": []
      };

      let playerData;
      this.conn.query("SELECT * FROM playersData WHERE uuid=?", [uuid], (err, result) => {
        if (err) throw err;
        playerData = result[0];
        data.uuid = playerData.uuid;
        data.groupName = playerData.groupName;
        data.rankName = playerData.rankName;
        data.playerCoins = playerData.coins;

        this.conn.query("SELECT * FROM killsData WHERE dead=?", [uuid], (error, deaths) => {
          if (error) throw error;

          for (const death of deaths) {
            data.killedBy.push(death.killer)
          }

          this.conn.query("SELECT * FROM killsData WHERE killer=?", [uuid], (mysqlError, kills) => {
            if (mysqlError) throw mysqlError;

            for (const kill of kills) {
              data.killed.push(kill.death);
            }

            res.send(data);

          });
        });
      });
    });



  }

}

module.exports = PlayerData;
