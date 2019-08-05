import React, { Component } from "react";
import { Fetch } from "../apiHandler";
import UserContainer from "./UserContainer";
export default class Layout extends Component {
  usernameInputRef;

  constructor(props) {
    super(props);
    this.usernameInputRef = React.createRef();
    this.state = {
      userdata: []
    };
  }

  SubmitHandler = async e => {
    e.preventDefault();
    const input = this.usernameInputRef.current.value;
    let inputArr = input.split(",");

    //To remove extraspace before and after the string's in the array
    inputArr.forEach((el, i) => {
      inputArr[i] = el.trim();
    });

    let params = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Access-Control-Request-Method": "*"
      },
      body: JSON.stringify({
        query: {
          usernames: inputArr
        }
      })
    };

    const res = await Fetch("/user/getUsers", params);
    this.setState({
      userdata: res
    });
  };
  render() {
    return (
      <div className="Layout container">
        <form id="user-form">
          <div className="form-group">
            <label htmlFor="userids">Enter user_id's seperated by " , "</label>
            <input
              type="text"
              className="form-control"
              id="userids"
              placeholder="<user_name1>, <user_name2>, <user_name3>..."
              ref={this.usernameInputRef}
            />
            <button
              className="btn btn-primary my-2"
              onClick={this.SubmitHandler}
            >
              Submit
            </button>
          </div>

          <UserContainer usernames={this.state.userdata} />
        </form>
      </div>
    );
  }
}
