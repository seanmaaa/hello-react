import { Fragment } from "react";
import { Link, Route } from "react-router-dom"
import About from "../pages/About";
import Home from "../pages/Home";

function App() {
    return (
        <Fragment>
            <Fragment>
                <Link to="/"> Home </Link>
                <Link to ="/about"> About </Link>
            </Fragment>
            <Fragment>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
            </Fragment>
        </Fragment>
    );
}

export default App;
