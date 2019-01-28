import axios from "axios";

const url = process.env.REACT_APP_USERS_SERVICE_URL;

export const getUsers = () =>
  axios
    .get(`${url}/users`)
    .then(res => console.log(res))
    .catch(err => console.log(err));
