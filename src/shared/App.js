import { Fragment } from "react";
import { Switch, Route } from "react-router-dom"
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import Login from "../pages/Login";
import Todo from "../pages/Todo";

function App() {
    return (
        <Fragment>
            <AppBar position="sticky">
                <Toolbar>
                    <Typography variant="h6">React Sample Todo App</Typography>
                </Toolbar>
            </AppBar>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/todo" component={Todo} />
            </Switch>
        </Fragment>
    );
}

export default App;
