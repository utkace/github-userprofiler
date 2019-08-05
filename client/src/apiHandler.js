const base =
  `http://localhost:${JSON.stringify(process.env.PORT)}/api` ||
  "http://localhost:5000/api";

export function Fetch(path, params) {
  return fetch(base + path, params).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}
