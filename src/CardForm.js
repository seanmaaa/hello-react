import { useState } from 'react';
import { makeStyles, Button, TextField } from '@material-ui/core';

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

function CardForm({ onCreate = (v) => console.log(v) }) {
    const [cardName, setName] = useState("")
    const [description, setDescription] = useState("")

    const classes = useStyles();

    const handleSubmit = (e) => {
        e.preventDefault()
        onCreate({ name: cardName, description: description })
        setName("")
        setDescription("")
    }

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <TextField id="standard-required" label="name" value={cardName} name="cardName" onChange={e => setName(e.target.value)} />
            <TextField id="standard-required" label="description" value={description} name="cardDescription" onChange={e => setDescription(e.target.value)} />
            <Button size="large" variant="contained" type="submit"> Add </Button>
        </form>
    );
}

export default CardForm;
