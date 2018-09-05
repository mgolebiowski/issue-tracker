import React from "react";
import PropTypes from "prop-types";

import { Form, FormGroup, Label, Input } from "reactstrap";

export default class FormComp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {title: "", description: "", processing: false};

    this.createIssue = this.createIssue.bind(this);
    this.editTitle = this.editTitle.bind(this);
    this.editDescription = this.editDescription.bind(this);
  }

  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="title">Title</Label>
          <Input
            type="text"
            name="title"
            id="title"
            value={this.state.title}
            onChange={this.editTitle} />
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input
            type="textarea"
            name="description"
            id="description"
            value={this.state.description}
            onChange={this.editDescription} />
        </FormGroup>
        <button
          onClick={this.createIssue} className="btn btn-primary pull-xs-right">Open an issue</button>
      </Form>);
  }

  editTitle(e) {
    this.setState({title: e.target.value});
  }

  editDescription(e) {
    this.setState({description: e.target.value});
  }

  createIssue(e) {
    e.preventDefault();

    fetch("/api/issue", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(
        {
          title: this.state.title,
          description: this.state.description
        }
      )
    })
      .then((resp) => {
        if(resp.ok) {
          this.setState({title: "", description: ""});
          this.props.afterAdd();
        }
      })
      .catch(console.log);
  }
}

FormComp.propTypes = {
  afterAdd: PropTypes.func
};