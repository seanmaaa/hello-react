import { useState } from "react";
import { useHistory } from "react-router-dom"
import { TextField, Button, makeStyles } from '@material-ui/core';


function Login() {
    const [userName, setUserName] = useState("")
    const history = useHistory();

    const useStyles = makeStyles((theme) => ({
        form: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: '25ch',
            },
            alignItems: "center",
            display: 'flex',
            flexDirection: 'row'
        }
    }));

    const classes = useStyles();

    const handleSubmit = (e) => {
        e.preventDefault()
        if (userName === "") {
            alert("Error: Empty username")
        } else {
            history.push("/todo?username=".concat(userName));
        }
    }
    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <TextField id="standard-required" label="name" value={userName} onChange={e => setUserName(e.target.value)} />
            <Button size="large" variant="contained" type="submit"> Login </Button>
        </form>
    );
}

export default Login;
