import { React, useState } from "react"

const NoteForm = ({ createNote }) => {

    const [newNote, setNewNote] = useState('')

    const addNote = (event) => {
        event.preventDefault()
        createNote({
            content: newNote,
            // important: Math.random > 0.5
            important: true
        })
        setNewNote('')
    }

    return (
        <div>
            <h2>Create a new Note</h2>
            <form onSubmit={addNote}>
                <input
                    id = 'note-input'
                    value = {newNote}
                    onChange = {event => {setNewNote(event.target.value)}}
                    placeholder="A new Note..."
                />
                <button type = 'submit'>Save</button>
            </form>
        </div>
    )

}

export default NoteForm