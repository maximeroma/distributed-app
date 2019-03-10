import React, {useState, useEffect} from "react"
import {userStatus} from "services/auth"
import {useAuth} from "hooks/auth"
import {Redirect} from "@reach/router"

const UserStatus = () => {
  const [email, setEmail] = useState("")
  const [id, setId] = useState("")
  const [username, setUsername] = useState("")
  const {isAuthenticated} = useAuth()

  if (!isAuthenticated) {
    return <Redirect to="/login" noThrow />
  }

  useEffect(() => {
    userStatus().then(res => {
      setEmail(res.email)
      setId(res.id)
      setUsername(res.username)
    })
  }, [])

  return (
    <div>
      <ul>
        <li>
          <strong>User ID:</strong>
          {id}
        </li>
        <li>
          <strong>Email:</strong>
          {email}
        </li>
        <li>
          <strong>Username:</strong>
          {username}
        </li>
      </ul>
    </div>
  )
}

export default UserStatus
