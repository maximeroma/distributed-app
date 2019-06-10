import React from "react"
import {render as renderRTl} from "react-testing-library"
import axios from "axios"
import AppProvider from "AppProvider"
import MockAdapter from "axios-mock-adapter"
import {AuthProvider} from "hooks/auth"
import {ApolloProvider} from "react-apollo"
import {ApolloProvider as ApolloHooksProvider} from "react-apollo-hooks"
import {MockLink} from "apollo-link-mock"
import {InMemoryCache} from "apollo-cache-inmemory"
import {ApolloClient} from "apollo-boost"
import gql from "graphql-tag"

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

const mocks = [
  {
    request: {
      query: gql`
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
      `,
      variables: {}
    },
    result: {
      data: {
        allUsers: {
          edges: [
            {
              node: {
                id: 1,
                username: "toto",
                email: "toto",
                active: false,
                admin: true,
                __typename: "User"
              },
              __typename: "UserEdge"
            }
          ],
          __typename: "UserConnection"
        }
      }
    }
  }
]

const createClient = overrides => {
  return new ApolloClient({
    link: new MockLink(overrides || mocks),
    cache: new InMemoryCache()
  })
}

export const render = ui => {
  const client = createClient()
  const component = renderRTl(
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <AuthProvider>{ui}</AuthProvider>
      </ApolloHooksProvider>
    </ApolloProvider>
  )

  return component
}

export const mock = new MockAdapter(axios)
