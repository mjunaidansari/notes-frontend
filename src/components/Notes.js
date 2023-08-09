import React, {useState, useRef} from "react"

import Note from "./Note"
import Togglable from "./Togglable"
import NoteForm from "./NoteForm"

import noteService from '../services/notes'

import { useNavigate } from "react-router-dom"

const Notes = (props) => {

	const notes = props.notes
	const user = props.user

    const [showAll, setShowAll] = useState(true)

	const noteFormRef = useRef()

	const notesToShow = showAll? notes : notes.filter(note => note.important === true)

	const addNote = async (noteObject) => {

		try {
			noteFormRef.current.toggleVisibility()
			const data = await noteService.create(noteObject)
			console.log(data)
			props.setNotes(notes.concat(data))
		}
		catch (exception) {
			console.log(exception)
		}

	}

	const toggleImportanceOf = async (id) => {
        //finding and modifying the importance of note
        const note = notes.find(note => note.id === id)
        const changeNote = {
            ...note,
            important: !note.important
        }
        //updating note in serve
		try {
			const response = await noteService.update(id, changeNote)
            props.setNotes(notes.map(note => note.id !== id ? note : response.data))
		} catch(exception) {
			props.setErrorMessage(`The note ${note.content} was already deleted from the server`)
			setTimeout(()=> {
				props.setErrorMessage(null)
			}, 5000)
			props.setNotes(notes.filter(note => note.id !== id))
		}
    }

	const noteForm = () => {
        return (
            <Togglable buttonLabel = 'New Note' ref = {noteFormRef}>
                <NoteForm
                    createNote = {addNote}
                />
            </Togglable>
        )
    }

	return (
		<>
			<h1>Notes</h1>

			{user && noteForm()}
			<div>
				<button onClick={() => setShowAll(!showAll)}>
					show {showAll? 'important' : 'all'}
				</button>
			</div>

			<ul>
				{notesToShow.map(note => 
					<Note 
						key = {note.id} 
						note = {note} toggle
						toggleImportance={() => toggleImportanceOf(note.id)}
					/>
				)}
			</ul>
		</>
	)

}

export default Notes