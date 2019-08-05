import React from "react";

export default function Usercard(props) {
  return (
    <div className="card my-2 p-1">
      <div className="row no-gutters">
        <div className="col-4">
          <img
            src={props.user.avatar_url}
            className="card-img"
            alt={`user_image ${props.user.name}`}
          />
        </div>
        <div className="col-8">
          <div className="card-body">
            <h5 className="card-title">{props.user.name}</h5>
            <p className="card-text">
              <span>ID: </span>
              {props.user.id}
            </p>
            <div className="card-text">
              <span>USER NAME: </span>
              {props.user.login}
            </div>
          </div>
        </div>
      </div>
      <div className="row no-gutters py-2">
        <p className="card-text">{props.user.bio}</p>
      </div>
      <div className="row no-gutters">
        <div className="col-6">
          <div className="card-body">
            <p className="card-text">
              <span>PUBLIC REPOS: </span>
              {props.user.public_repos}
            </p>
            <p className="card-text">
              <span>PUBLIC GISTS: </span>
              {props.user.public_gists}
            </p>
          </div>
        </div>

        <div className="col-6">
          <div className="card-body">
            <p className="card-text">
              <span>FOLLOWERS: </span>
              {props.user.followers}
            </p>
            <p className="card-text">
              <span>FOLLOWING: </span>
              {props.user.following}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
