import qs from 'qs';
import { Fragment } from "react";
import { useHistory } from "react-router-dom"

function Todo({ location }) {
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true
    });

    const userName = query.username;

    const history = useHistory();

    if (userName === undefined) {
        history.push("/")
    }
    return (
        <Fragment>
            <h2> {userName}'s todo list </h2>

        </Fragment>
    );
}

export default Todo;
