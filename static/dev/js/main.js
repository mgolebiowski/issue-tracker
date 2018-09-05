import "../styles/style.scss";

import React from "react";
import ReactDOM from "react-dom";

//Components
import FormComp from "./components/form";
import ListComp from "./components/list";

class Index extends React.Component {

  constructor(props) {
    super(props);

    this.state = {issues: []};
    this.updateList = this.updateList.bind(this);
  }

  updateList() {
    fetch("/api/issues")
      .then((resp) => {
        if(resp.ok) {
          resp.json().then(data => {
            this.setState({issues: data});
          });
        }
      })
      .catch(console.log);
  }

  componentDidMount() {
    this.updateList();
  }

  render() {
    return <div>
      <FormComp afterAdd={this.updateList}></FormComp>
      <ListComp updateCallback={this.updateList} issues={this.state.issues}></ListComp>
    </div>;

  }
}

ReactDOM.render(<Index />, document.querySelector("#app"));