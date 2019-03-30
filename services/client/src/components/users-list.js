import React, {Fragment} from "react"

export default ({users}) => (
  <Fragment>
    <div className="title is-1 is-1">All Users</div>
    <table className="table is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>Username</th>
          <th>Active</th>
          <th>Admin</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(users) &&
          users.map(user => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>{String(user.active)}</td>
                <td>{String(user.admin)}</td>
              </tr>
            )
          })}
      </tbody>
    </table>
  </Fragment>
)
