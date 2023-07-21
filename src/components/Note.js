import React from 'react'

// import './styles/Note.module.css'

const Note = ({note, toggleImportance}) => {

    const label = note.important? 'make not important': 'make important'

    return (
        <li className='note'>
            {note.content}
            <button onClick = {toggleImportance}>{label}</button>
        </li>
    )
}

export default Note;