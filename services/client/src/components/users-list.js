import React, {Fragment} from "react"

export default ({users}) => (
  <Fragment>
    <div className="title is-1 is-1">All Users</div>
    {Array.isArray(users) &&
      users.map(user => {
        return (
          <h4 key={user.id} className="box title is-4">
            {user.username}
          </h4>
        )
      })}
  </Fragment>
)
