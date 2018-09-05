import React from "react";
import PropTypes from "prop-types";
import {Collapse} from "reactstrap";

export default class Issue extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.updateState = this.updateState.bind(this);
    this.state = {collapsed: false};
  }

  toggle() {
    this.setState({ collapsed: !this.state.collapsed });
  }

  statusRepresenter(status) {
    switch(status) {
    case 0:
      return (<button className="btn float-right btn-primary">Open</button>);
    case 1:
      return (<button className="btn float-right btn-success">Pending</button>);
    case 2:
      return (<button className="btn float-right btn-danger">Closed</button>);
    }
  }

  updateState(e) {
    e.preventDefault();

    fetch("/api/issue/"+this.props.id, {
      method: "PUT",
      mode: "cors",
      cache: "no-cache"
    })
      .then((resp) => {
        if(resp.ok) {
          this.props.statusChangedCall();
        }
      })
      .catch(console.log);
  }

  render() {
    return (
      <div className="card">
        <div className="card-header" onClick={this.toggle} id="headingOne">
          <h6 className="mb-0 row">
            <div className="col">
            #{this.props.id}
            </div>
            <div className="col">
              <a className="text-primary">
                {this.props.title}
              </a>
            </div>
            <div className="status col">
              {this.statusRepresenter(this.props.status)}
            </div>
          </h6>
        </div>

        <Collapse isOpen={this.state.collapsed}>
          <div className="card-body">
            <p>
              {this.props.description}
            </p>
            <button onClick={this.updateState} className="btn btn-primary">Change state</button>
          </div>
        </Collapse>
      </div>
    );
  }
}

Issue.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  status: PropTypes.number,
  statusChangedCall: PropTypes.func
};