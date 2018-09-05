import React from "react";
import PropTypes from "prop-types";

import IssueComp from "./issue";

export default class IssuesList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="accordion">
          {
            this
              .props
              .issues
              .map((issue) => (
                <IssueComp
                  key={issue._id}
                  title={issue.title}
                  description={issue.description}
                  id={issue._id}
                  status={issue.status}
                  statusChangedCall={this.props.updateCallback}>
                </IssueComp>
              ))
          }
        </div>
      </div>);
  }
}

IssuesList.propTypes = {
  issues: PropTypes.array,
  updateCallback: PropTypes.func
};