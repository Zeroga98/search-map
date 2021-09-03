import {
  BrowserRouter as Router
} from "react-router-dom";
import { ApolloProvider } from "@apollo/client";

import Routes from './scenes/routes';
import Header from './components/header/header'
import apolloClient from '../src/common/api/api'
import ContinentProvider from "./context/continentContext";

function App() {

  return (
    <ApolloProvider client={apolloClient}>
      <ContinentProvider>
        <Router>
          <Header />
          <Routes />
        </Router>
      </ContinentProvider>
    </ApolloProvider >
  );
}

export default App;
