import ApolloClient from "apollo-boost"
import {InMemoryCache} from "apollo-cache-inmemory"

export const client = new ApolloClient({
  uri: "http://localhost/graphql",
  cache: new InMemoryCache()
})
