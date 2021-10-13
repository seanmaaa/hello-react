import { TextField, Typography, IconButton, makeStyles } from '@material-ui/core';
import qs from 'qs';
import { Fragment, useState, useEffect } from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { useHistory } from "react-router-dom"
import TaskPaper from '../components/Taskpaper';
import axios from 'axios';

function Todo({ location }) {
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true
    });

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

    const classes = useStyles();

    const userName = query.username;

    const [userid, setUserid] = useState(-1)
    const [task_title, setTaskTitle] = useState("")
    const [task_description, setTaskDescription] = useState("")
    const [todoItem, setTodoItem] = useState([{ id: 1, completed: true, description: "Love yourself" }])
    const [insertMode, setInsertMode] = useState(false)
    const [loading, setLoading] = useState(true)

    const fetchTask = async (task) => {
        setLoading(true)
        try {
            const taskResponse = await axios.get(
                'http://127.0.0.1:8080/task?userid=' + userid
            )
            setTodoItem(taskResponse.data.sort(function (x, y) { return (x === y) ? 0 : x ? -1 : 1; }))
        } catch (e) {
            alert("Error occurred while calling API.")
            history.push("/")
        } finally {
            setLoading(false)
        }
    }

    const createTask = async (task) => {
        setLoading(true)
        try {
            const taskResponse = await axios.post(
                'http://127.0.0.1:8080/task', task
            )
        } catch (e) {
            alert("Error occurred while calling API.")
            history.push("/")
        } finally {
            fetchTask()
            setLoading(false)
        }
    }

    const updateTask = async (taskid, isCompleted) => {
        setLoading(true)
        try {
            const taskResponse = await axios.put(
                'http://127.0.0.1:8080/task', {taskId: taskid, status: isCompleted}
            )
        } catch (e) {
            alert("Error occurred while calling API.")
            history.push("/")
        } finally {
            setTodoItem([])
            fetchTask()
            setLoading(false)
        }
    }

    const deleteTask = async (taskid) => {
        setLoading(true)
        try {
            const taskResponse = await axios.delete(
                'http://127.0.0.1:8080/task?userId=' + userid + "&taskId=" + taskid
            )
        } catch (e) {
            alert("Error occurred while calling API.")
            history.push("/")
        } finally {
            fetchTask()
            setLoading(false)
        }
    }

    useEffect(() => {
        if (userName === undefined || userName === "") {
            history.push("/")
        } else {
            console.log("start api call.")
            const fetchUserTask = async () => {
                try {
                    const userResponse = await axios.get(
                        'http://127.0.0.1:8080/user?username=' + userName
                    )
                    const taskResponse = await axios.get(
                        'http://127.0.0.1:8080/task?userid=' + userResponse.data.id
                    )
                    setUserid(userResponse.data.id)
                    setTodoItem(taskResponse.data.sort(function (x, y) { return (x === y) ? 0 : x ? -1 : 1; }))
                } catch (e) {
                    if (e.response.status === 404) {
                        const createUser = await axios.post(
                            'http://127.0.0.1:8080/user', {
                            username: userName
                        })
                        fetchUserTask()
                    } else {
                        alert("Error occurred while calling API.")
                        history.push("/")
                    }
                } finally {
                    setLoading(false)
                }
            }
            fetchUserTask()
        }
    }, [])

    useEffect(() => {
        setTaskTitle("")
        setTaskDescription("")
    }, [insertMode])

    const history = useHistory();

    return (
        <Fragment>
            <Typography componet="h2" variant="h5"> {userName}'s todo list </Typography>

            {todoItem.map(task => (<TaskPaper key={task.id} taskId={task.id} completed={task.isdone} title={task.title} description={task.description} handleOnUpdate={updateTask} handleOnDelete={deleteTask}/>))}

            {insertMode ?
                <div>
                    <form className={classes.root} onSubmit={e => { e.preventDefault(); setInsertMode(false); createTask({ userId: userid, title: task_title, description: task_description }) }} >
                        <TextField id="standard-required" value={task_title} label="title" name="task_title" onChange={e => setTaskTitle(e.target.value)} />
                        <TextField id="standard-required" value={task_description} label="description" name="task_description" onChange={e => setTaskDescription(e.target.value)} />
                        <IconButton color="primary" aria-label="add task" type="submit" >
                            <AddCircleIcon />
                        </IconButton>
                        <IconButton color="secondary" aria-label="discard" onClick={e => setInsertMode(false)}>
                            <DeleteIcon />
                        </IconButton>
                    </form>

                </div>
                :
                <IconButton color="primary" aria-label="set editing mode" onClick={e => setInsertMode(true)}>
                    <AddCircleIcon />
                </IconButton>
            }
        </Fragment>
    );
}

export default Todo;
