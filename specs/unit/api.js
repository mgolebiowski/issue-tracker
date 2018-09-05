var {describe, it} = require("mocha");
var {expect} = require("chai");

var {createNewIssueModel, updateIssueStatus} = require("../../controllers/api");

describe("API", () => {
  describe("Creating new issue", () => {
    it("Complete empty title", () => {
      var context = createNewIssueModel("","desc");
      expect(context.title).to.equals("Untitled issue");
    });
    it("Gives new issue status open", () => {
      var context = createNewIssueModel("title", "desc");
      expect(context.status).to.equals(0);
    });
  });

  describe("Updating status of issue", () => {
    it("Updates", () => {
      var context = updateIssueStatus({status: 0});
      expect(context.status).to.equals(1);
    });
    it("Doesn't allow to update closed issue", () => {
      expect(()=>updateIssueStatus({status: 2})).to.throw();
    });
  });
});