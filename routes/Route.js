class Router {
  constructor(databaseConnection) {
    this.express = require('express');
    this.router = this.express.Router();
    this.conn = databaseConnection;
    this.registerRoutes();
  }

  registerRoutes() {
    console.log(`Neglected to register routes in ${this.constructor.name} Class! Modify the method: registerRoutes`);
  }

}

module.exports = Router;
