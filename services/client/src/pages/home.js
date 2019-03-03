import React, {useEffect} from "react"
import AddUser from "components/add-user"
import UsersList from "components/users-list"
import useApi from "hooks/use-api"

export function Home() {
  const {doGet, doPost, postUsers, getUsers} = useApi()

  useEffect(() => {
    doGet("/users")
  }, [postUsers])

  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-one-third">
            <br />
            {getUsers && getUsers.isLoading && <div>...loading</div>}
            {getUsers && getUsers.isError && <div>...error</div>}
            <AddUser addUser={values => doPost("/users", values)} />
            <br />
            {getUsers && getUsers.data && (
              <UsersList users={getUsers.data.users} />
            )}
            <hr />

            <br />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home
