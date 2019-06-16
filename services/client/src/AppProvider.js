import React from "react"
import {AuthProvider} from "hooks/auth"
import {client} from "graphql/setup"
import {ApolloProvider} from "react-apollo-hooks"

export default ({children}) => (
  <ApolloProvider client={client}>
    <AuthProvider>{children}</AuthProvider>
  </ApolloProvider>
)
