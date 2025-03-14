export const GetCities = () => {
    return fetch(`http://localhost:8088/cities`).then((res) => res.json())
  }