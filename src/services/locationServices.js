export const getLocations = () => {
    return fetch(`http://localhost:8088/locations`).then((res) => res.json())
  }