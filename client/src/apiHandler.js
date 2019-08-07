const production = "https://github-userprofiler.herokuapp.com/api";
const development = "http://localhost:5000/api";
console.log(process.env);
const url = process.env.NODE_ENV === "production" ? production : development;
export function Fetch(path, params) {
  return fetch(url + path, params).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}
