import * as React from 'react';
import {
    Switch,
    Route,
} from "react-router-dom";

import Home from './home'

function Routes() {
    return (
        <React.Fragment>
            <div>
                {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/about">
                        <About />
                    </Route>
                    <Route path="/users">
                        <Users />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </div>
        </React.Fragment>
    );
}

function About() {
    return <h2>About</h2>;
}

function Users() {
    return <h2>Users</h2>;
}

export default Routes;