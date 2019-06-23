import React from "react"
import {render as renderRTl} from "@testing-library/react"
import axios from "axios"
import MockAdapter from "axios-mock-adapter"
import {AuthProvider} from "hooks/auth"
import {ApolloProvider} from "react-apollo-hooks"
import {MockLink} from "apollo-link-mock"
import {InMemoryCache} from "apollo-cache-inmemory"
import {ApolloClient} from "apollo-boost"
import {ALL_USERS} from "graphql/queries"

export const createMockQuery = ({query, variables = {}} = {}, response) => {
  return {
    request: {
      query,
      variables
    },
    result: {
      data: {
        ...response
      }
    }
  }
}

const mocks = [
  createMockQuery(
    {query: ALL_USERS},
    {
      allUsers: {
        edges: [
          {
            node: {
              id: 1,
              username: "maxime",
              email: "maxime@roma.com",
              active: false,
              admin: true
            }
          }
        ]
      }
    }
  )
]

const createClient = ({overrides = []} = {}) => {
  return new ApolloClient({
    link: new MockLink([...overrides, ...mocks]),
    cache: new InMemoryCache({addTypename: false})
  })
}

export * from "@testing-library/react"

export const render = ui => {
  const client = createClient()
  const component = renderRTl(
    <ApolloProvider client={client} addTypename={false}>
      <AuthProvider>{ui}</AuthProvider>
    </ApolloProvider>
  )

  return component
}

export const mock = new MockAdapter(axios)
