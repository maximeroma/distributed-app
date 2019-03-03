import React from "react"
import axios from "axios"

const BASE_URL = process.env.REACT_APP_USERS_SERVICE_URL

const INITIAL_STATE = {}

const mapUrlToState = (url, method) => {
  const prettyUrl = url
    .split("/")
    .filter(Boolean)
    .map(item => `${item.slice(0, 1).toUpperCase()}${item.slice(1)}`)

  return `${method}${prettyUrl}`
}

const reducer = (state, {type, method, url, payload}) => {
  const key = mapUrlToState(url, method)
  switch (type) {
    case "loading": {
      return {
        ...state,
        [key]: {
          data: [],
          isError: false,
          isLoading: true
        }
      }
    }
    case "error": {
      return {
        ...state,
        [key]: {
          data: [],
          isError: true,
          isLoading: false
        }
      }
    }
    case "success": {
      return {
        ...state,
        [key]: {
          data: payload,
          isError: false,
          isLoading: false
        }
      }
    }

    default:
      return state
  }
}

function usePost() {
  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE)

  const doPost = async (url, values) => {
    dispatch({type: "loading", url, method: "post"})
    try {
      const {
        data: {data}
      } = await axios.post(`${BASE_URL}${url}`, values)
      dispatch({type: "success", payload: data, url, method: "post"})
      return {data, error: false}
    } catch (e) {
      dispatch({type: "error", url, method: "post"})
      return {message: e.message, error: true}
    }
  }

  return {doPost, state}
}

function useGet() {
  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE)

  const doGet = async (url, values) => {
    dispatch({type: "loading", url, method: "get"})
    try {
      const {
        data: {data}
      } = await axios.get(`${BASE_URL}${url}`, values)
      dispatch({type: "success", payload: data, url, method: "get"})
    } catch (e) {
      dispatch({type: "error", url, method: "get"})
    }
  }

  return {doGet, state}
}

export default function useApi() {
  const {doGet, state: getState} = useGet()
  const {doPost, state: postState} = usePost()

  return {...getState, doGet, doPost, ...postState}
}
