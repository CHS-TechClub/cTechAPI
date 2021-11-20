const Route = require("./Route");

class GroupData extends Route {
  constructor(databaseConnection) {
    super(databaseConnection);
  }

  registerRoutes() {

    this.router.get("/", (req, res) => {
      this.conn.query("SELECT * FROM groupsData", (err, groups) => {
        if (err) throw err;

        let names = [];

        for (const group of groups) {
          names.push([group.name, group.color]);
        }

        res.send(names);

      });
    });

    this.router.get("/get/:name?", (req, res) => {
      let name = req.params.name;
      let data = {
        "name": "",
        "color": "",
        "ownerId": "",
        "coins": 0,
        "members": []
      };

      let groupData;
      this.conn.query("SELECT * FROM groupsData WHERE name=?", [name], (err, result) => {
        let groupData = result[0];
        if (!groupData) {
          res.send(null);
          return;
        }
        data.name = groupData.name;
        data.color = groupData.color;
        data.ownerId = groupData.ownerUuid;
        data.coins = groupData.coins;
        this.conn.query("SELECT * FROM playersData WHERE groupName=?", [name], (err, players) => {
          for (const player of players) {
            data.members.push(player.uuid);
          }
          res.send(data);
        });
      });

    });



  }

}

module.exports = GroupData;
