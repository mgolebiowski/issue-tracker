const express = require("express");

const HomeController = require("./controllers/home");
const APIController = require("./controllers/api");

module.exports = function (app) {
  // Initializing route groups
  const apiRoutes = express.Router();
  const homeRoutes = express.Router();

  apiRoutes.post("/issue", APIController.createItem);
  apiRoutes.get("/issues", APIController.findAll);
  apiRoutes.get("/issue/:issueID", APIController.findOne);
  apiRoutes.put("/issue/:issueID", APIController.updateStatus);

  homeRoutes.get("/", HomeController.index);

  app.use("/api", apiRoutes);
  app.use("/", homeRoutes);
};

