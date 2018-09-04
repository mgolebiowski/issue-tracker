const Issue = require("../../models/schemas/issue");

const createItem = (req, res) => {

  const issue = new Issue({
    title: req.body.title || "Untitled Issue",
    description: req.body.description,
    status: 0
  });

  issue.save()
    .then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the issue."
      });
    });
};

const findAll = (req, res) => {
  Issue.find()
    .then((issues) => {
      res.send(issues);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message
      });
    });
};

const findOne = (req, res) => {
  Issue.findById(req.params.issueID)
    .then((issue) => {
      if(!issue) {
        res.status(404).send({
          message: "Not found any issue with id " + req.params.issueID
        });
      }
      res.send(issue);
    }).catch((err) => {
      res.status(500).send({
        message: "Error",
        err
      });
    });
};

const updateStatus = (req, res) => {
  Issue.findById(req.params.issueID)
    .then((issue) => {
      if(issue.status === 2) {
        res.status(400).send({
          message: "Issue is closed"
        });
      } else {
        issue.status++;
        issue.save().then((data) => {
          res.send(data);
        }).catch((err) => {
          res.send(
            {
              message: "Error",
              err
            }
          );
        });
      }
    })
    .catch((err) => {
      res.send(
        {
          message: "Error",
          err
        }
      );
    });
};

module.exports = {
  createItem,
  findAll,
  findOne,
  updateStatus
};