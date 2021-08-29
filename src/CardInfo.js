import { Fragment, useEffect, useState } from "react";

function CardInfo({ info = { id: 0, name: "N/A", description: "N/A" }, handleOnUpdate, handleOnDelete }) {
    const [editing, setEditing] = useState(false)
    const [name, setName] = useState(info.name)
    const [description, setDescription] = useState(info.description)

    useEffect(() => {
        console.log("CardInfo component created.")
        return () => console.log("cardInfo component destroyed.")
    }, [])

    return (
        <div style={{
            border: '1px solid black',
            padding: '8px',
            margin: '8px'
        }}>
            {
                editing
                    ?
                    <form onSubmit={e => { e.preventDefault(); setEditing(false); handleOnUpdate({ id: info.id, name: name, description: description }) }} >
                        <input type="text" value={name} name="cardName" placeholder="name" onChange={e => setName(e.target.value)} />
                        <input type="text" value={description} name="cardDescription" placeholder="description" onChange={e => setDescription(e.target.value)} />
                        <button type="submit"> Submit </button>
                        <button onClick={e => setEditing(false)}> Cancel </button>
                    </form>
                    :
                    <Fragment>
                        <div><b>{info.name}</b></div>
                        <div>{info.description}</div>
                        <button onClick={e => setEditing(true)}>Edit</button>
                        <button onClick={e => handleOnDelete(info.id)}>Delete</button>
                    </Fragment>
            }
        </div>
    );
}

export default CardInfo
