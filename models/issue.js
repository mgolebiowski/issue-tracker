const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const IssueSchema = new Schema(
  {
    title: {
      type: String
    },
    description: {
      type: String
    },
    status: {
      type: Number
    }
  }
);


module.exports = mongoose.model("issue", IssueSchema);
