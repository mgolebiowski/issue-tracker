const Issue = require("../../models/schemas/issue");

const createItem = (req, res) => {

  const issue = createNewIssueModel(req.body.title, req.body.description);

  issue.save()
    .then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the issue."
      });
    });
};

const createNewIssueModel = (title, description) => {
  if(!title) {
    title = "Untitled issue";
  }
  return new Issue({title, description, status: 0});
};

const findAll = (req, res) => {
  Issue.find().sort({status: 1, createdAt: -1})
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

const updateIssueStatus = (issue) => {
  if(issue.status === 2) {
    throw new Error("Issue is closed");
  } else {
    issue.status++;
    return issue;
  }
};

const updateStatus = (req, res) => {
  Issue.findById(req.params.issueID)
    .then((issue) => {
      try{
        issue = updateIssueStatus(issue);
        issue.save().then((data)=>{
          res.send(data);
        });
      } catch(err) {
        res.status(400).send({
          message: err
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
  updateStatus,

  createNewIssueModel,
  updateIssueStatus
};