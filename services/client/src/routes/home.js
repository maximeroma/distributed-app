import React, {useEffect} from "react"
import {useQuery} from "react-apollo-hooks"
import {ALL_USERS} from "graphql/queries"
import UsersList from "components/users-list"

const Home = () => {
  const {data, loading, error, refetch} = useQuery(ALL_USERS)

  useEffect(() => {
    refetch()
  }, [])

  if (error) {
    return <div>Error</div>
  }

  if (loading) {
    return <div>Loading</div>
  }

  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-one-third">
            <br />
            <UsersList users={data.allUsers.edges} />
            <hr />
            <br />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home
