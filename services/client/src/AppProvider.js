import React from "react"
import {AuthProvider} from "hooks/auth"
import {client} from "graphql/setup"
import {ApolloProvider} from "react-apollo"
import {ApolloProvider as ApolloHooksProvider} from "react-apollo-hooks"

export default ({children}) => (
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
      <AuthProvider>{children}</AuthProvider>
    </ApolloHooksProvider>
  </ApolloProvider>
)
