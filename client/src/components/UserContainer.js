import React, { Component } from "react";
import Usercard from "./Usercard";
export default class UserContainer extends Component {
  render() {
    return (
      <div>
        {this.props.usernames.map((el, i) => (
          <Usercard user={el} key={i} />
        ))}
      </div>
    );
  }
}
