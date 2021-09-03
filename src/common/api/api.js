import {
    ApolloClient,
    InMemoryCache,
} from "@apollo/client";


const GRAPHQL_URL = process.env.REACT_APP_GRAPHQL_URL || 'https://countries.trevorblades.com/'

const client = new ApolloClient({
    uri: GRAPHQL_URL,
    cache: new InMemoryCache()
})

export default client