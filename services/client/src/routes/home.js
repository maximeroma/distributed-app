import React, {Component} from "react"
import {getUsers, addUser} from "services/users"
import gql from "graphql-tag"
import {useQuery} from "react-apollo-hooks"

import UsersList from "components/users-list"

const ALL_USERS = gql`
  {
    allUsers {
      edges {
        node {
          id
          email
          username
          active
          admin
        }
      }
    }
  }
`

const Home = () => {
  const {data, loading, error} = useQuery(ALL_USERS)
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
