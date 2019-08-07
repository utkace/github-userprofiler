# github-userprofiler
An application to display user profiles from github API

CheckOut the live App: https://github-userprofiler.herokuapp.com

## Features to be implemented
1. A get request to send following info:
   * Number of rows in db.
   * Number of caches results.

2. The database should update itself at an interval of 1 hour to accommodate updates in github accounts

3. Store all the relevant logs in a file, a frontend implementation via socket i.e frontend should update in real time.

## Bugs
* user bio empty is not checked
* user can input spaces as input after one input e.g: username, ,
* no check on sending empty array
