
import ApolloClient from "apollo-boost";

const GRAPHQL_URL = process.env.REACT_APP_GRAPHQL_URL || 'https://countries.trevorblades.com/'

const client = new ApolloClient({
    uri: GRAPHQL_URL,
    request: (operation) => {
        let headers = {}
        operation.setContext({ headers })
    }
})

export default client