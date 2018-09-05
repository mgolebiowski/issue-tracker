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
  },
  {
    timestamps: true
  }
);


module.exports = mongoose.model("issue", IssueSchema);
