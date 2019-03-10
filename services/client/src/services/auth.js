import axios from "axios"

const USERS_SERVICE_URL = process.env.REACT_APP_USERS_SERVICE_URL

export const signUp = data =>
  axios
    .post(`${USERS_SERVICE_URL}/auth/register`, data)
    .then(({data}) => data)
    .catch(err => console.log(err))

export const login = data =>
  axios
    .post(`${USERS_SERVICE_URL}/auth/login`, data)
    .then(({data}) => data)
    .catch(err => console.log(err))

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
