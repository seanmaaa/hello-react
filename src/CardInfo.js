import { Fragment, useEffect, useState } from "react";
import { Box, makeStyles, ButtonGroup, Button, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
          },
        alignItems: "center",
        display: 'flex',
        flexDirection: 'row'
      }
  }));

function CardInfo({ info = { id: 0, name: "N/A", description: "N/A" }, handleOnUpdate, handleOnDelete }) {
    const [editing, setEditing] = useState(false)
    const [name, setName] = useState(info.name)
    const [description, setDescription] = useState(info.description)

    const classes = useStyles();

    useEffect(() => {
        console.log("CardInfo component created.")
        return () => console.log("cardInfo component destroyed.")
    }, [])

    return (
        <Box borderRadius={16} borderColor="gray.500" border={1} style={{
            padding: '8px',
            margin: '8px'
        }}>
            {
                editing
                    ?
                    <form className={classes.root} onSubmit={e => { e.preventDefault(); setEditing(false); handleOnUpdate({ id: info.id, name: name, description: description }) }} >
                        <TextField id="standard-required" label="name" name="cardName" value={name} onChange={e => setName(e.target.value)} />
                        <TextField id="standard-required" label="description" value={description} name="cardDescription" onChange={e => setDescription(e.target.value)} />
                        <ButtonGroup size="large">
                            <Button type="submit" color="primary"> Submit </Button>
                            <Button color="secondary" onClick={e => setEditing(false)}> Cancel </Button>
                        </ButtonGroup>
                    </form>
                    :
                    <Box className={classes.root}>
                        <TextField id="standard-required" label="name" name="cardName" value={info.name} disabled/>
                        <TextField id="standard-required" label="description" value={info.description} name="cardDescription" disabled/>
                        <ButtonGroup size="large">
                            <Button color="primary" onClick={e => setEditing(true)}> Edit </Button>
                            <Button color="secondary" onClick={e => handleOnDelete(info.id)}> Delete </Button>
                        </ButtonGroup>
                    </Box>
            }
        </Box>
    );
}

export default CardInfo
