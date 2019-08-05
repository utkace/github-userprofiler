import React, { Component } from "react";

export default class UserContainer extends Component {
  render() {
    return (
      <div className="card">
        {this.props.usernames.map((el, i) => (
          <div key={i}>
            <div className="row no-gutters">
              <div className="col-md-4">
                <img
                  src={el.avatar_url}
                  className="card-img"
                  alt={`user image ${el.name}`}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{el.name}</h5>
                  <p className="card-text">{el.id}</p>
                  <p className="card-text">{el.bio}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
