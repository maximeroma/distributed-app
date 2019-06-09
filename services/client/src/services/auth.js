import axios from "axios"

const USERS_SERVICE_URL = process.env.REACT_APP_USERS_SERVICE_URL

export const userStatus = () => {
  const options = {
    url: `${USERS_SERVICE_URL}/auth/status`,
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${window.localStorage.authToken}`
    }
  }
  return axios(options)
    .then(({data}) => data.data)
    .catch(error => console.log(error))
}
