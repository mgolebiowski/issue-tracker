const express = require("express");

const HomeController = require("./controllers/home");
const APIController = require("./controllers/api");

module.exports = function (app) {
  // Initializing route groups
  const apiRoutes = express.Router();
  const homeRoutes = express.Router();

  apiRoutes.post("/api", APIController.create);
  apiRoutes.get("/api", APIController.findAll);
  apiRoutes.get("/api/:issueID", APIController.findOne);
  apiRoutes.put("/api/:issueID", APIController.update);
  apiRoutes.delete("/api/:issueID", APIController.delete);

  homeRoutes.get("/", HomeController.index);

  app.use("/api", apiRoutes);
  app.use("/", homeRoutes);
};

