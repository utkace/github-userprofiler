import React, { Component } from "react";

export default class UserContainer extends Component {
  render() {
    return (
      <div>
        {this.props.usernames.map((el, i) => (
          <div className="card my-2 p-1" key={i}>
            <div className="row no-gutters">
              <div className="col-4">
                <img
                  src={el.avatar_url}
                  className="card-img"
                  alt={`user_image ${el.name}`}
                />
              </div>
              <div className="col-8">
                <div className="card-body">
                  <h5 className="card-title">{el.name}</h5>
                  <p className="card-text">
                    <span>ID: </span>
                    {el.id}
                  </p>
                  <div className="card-text">
                    <span>USER NAME: </span>
                    {el.login}
                  </div>
                </div>
              </div>
            </div>
            <div className="row no-gutters py-2">
              <p className="card-text">{el.bio}</p>
            </div>
            <div className="row no-gutters">
              <div className="col-6">
                <div className="card-body">
                  <p className="card-text">
                    <span>PUBLIC REPOS: </span>
                    {el.public_repos}
                  </p>
                  <p className="card-text">
                    <span>PUBLIC GISTS: </span>
                    {el.public_gists}
                  </p>
                </div>
              </div>

              <div className="col-6">
                <div className="card-body">
                  <p className="card-text">
                    <span>FOLLOWERS: </span>
                    {el.followers}
                  </p>
                  <p className="card-text">
                    <span>FOLLOWING: </span>
                    {el.following}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
