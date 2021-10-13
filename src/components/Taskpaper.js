import { useState } from "react";
import { Paper } from '@material-ui/core';
import { makeStyles, IconButton } from '@material-ui/core';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';

function TaskPaper({ taskId = -1, title = "", description = "", completed = false, handleOnUpdate, handleOnDelete }) {
    const useStyles = makeStyles(theme => ({
        paper: {
            padding: theme.spacing(2),
            background: completed === false ? "white" : "lightGrey"
        }
    }));

    const classes = useStyles();


    return (
        <Paper variant="outlined" className={classes.paper}>
            {(completed === false) ?
                <IconButton color="primary" aria-label="done" onClick={() => handleOnUpdate(taskId, true)}>
                    <DoneIcon />
                </IconButton> :
                <IconButton color="primary" aria-label="done" disabled>
                    <DoneIcon />
                </IconButton>
            }

            <IconButton color="secondary" aria-label="remove" onClick={() => handleOnDelete(taskId)}>
                <DeleteIcon />
            </IconButton>
            {title} : {description}
        </Paper>
    );
}

export default TaskPaper;