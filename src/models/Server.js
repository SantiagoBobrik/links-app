const express = require("express");
const cors = require("cors");
const connectDb = require("../database/connection");
class Server {
  constructor() {
    //Environment
    require("dotenv").config();

    this.app = express();
    connectDb();
    // Middlewares
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();
  }

  listen(port) {
    return this.app.listen(port, () => {});
  }

  routes() {
    this.app.use("/links", require("../routers/linkRoutes"));
    this.app.use("/users", require("../routers/userRoutes"));
    this.app.use("/auth", require("../routers/authRoutes"));
    this.app.use(
      "/special-announcements",
      require("../routers/specialAnnouncement")
    );
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());
  }
}

module.exports = Server;
