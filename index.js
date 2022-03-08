const Server = require("./src/models/Server");

const server = new Server();

const httpServer = server.listen(3000);

const app = server.app;

module.exports = { app, httpServer };
