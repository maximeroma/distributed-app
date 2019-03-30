import React, {useState, useEffect} from "react"
import {userStatus} from "services/auth"
import {useAuth} from "hooks/auth"
import {Redirect} from "@reach/router"

const UserStatus = () => {
  const [email, setEmail] = useState("")
  const [id, setId] = useState("")
  const [username, setUsername] = useState("")
  const [active, setActive] = useState("")
  const [admin, setAdmin] = useState("")
  const {isAuthenticated} = useAuth()

  if (!isAuthenticated) {
    return <Redirect to="/login" noThrow />
  }

  useEffect(() => {
    userStatus().then(res => {
      setEmail(res.email)
      setId(res.id)
      setUsername(res.username)
      setActive(res.active)
      setAdmin(res.admin)
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
        <li>
          <strong>Active:</strong>
          {active}
        </li>
        <li>
          <strong>Admin:</strong>
          {admin}
        </li>
      </ul>
    </div>
  )
}

export default UserStatus
