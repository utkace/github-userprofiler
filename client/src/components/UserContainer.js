import React, { Component } from "react";
import Usercard from "./Usercard";
export default class UserContainer extends Component {
  render() {
    return (
      <div>
        {this.props.usernames.map((el, i) =>
          el.source ? (
            <Usercard user={el} key={i} />
          ) : (
            <div key={i} className="card not-found">
              {el.login} {el.message}
            </div>
          )
        )}
      </div>
    );
  }
}
