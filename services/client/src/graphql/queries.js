import gql from "graphql-tag"

export const ALL_USERS = gql`
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
