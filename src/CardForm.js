import { useState } from 'react';

function CardForm({ onCreate = (v) => console.log(v) }) {
    const [cardName, setName] = useState("")
    const [description, setDescription] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        onCreate({ name: cardName, description: description })
        setName("")
        setDescription("")
    }

    return (
        <form onSubmit={handleSubmit} style={{
            padding: '8px',
            margin: '8px'
        }}>
            <input type="text" value={cardName} name="cardName" placeholder="name" onChange={e => setName(e.target.value)} />
            <input type="text" value={description} name="cardDescription" placeholder="description" onChange={e => setDescription(e.target.value)} />
            <button type="submit"> Add </button>
        </form>
    );
}

export default CardForm;
