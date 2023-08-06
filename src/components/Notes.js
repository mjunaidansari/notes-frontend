import React, {useState} from "react"

import Togglable from "./Togglable"
import Note from "./Note"

const Notes = (props) => {

	const notes = props.notes
	
    const [showAll, setShowAll] = useState(true)

	const notesToShow = showAll? notes : notes.filter(note => note.important === true)

	return (
		<>
			 <h1>Notes</h1>
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
						toggleImportance={() => props.toggleImportanceOf(note.id)}
					/>
				)}
			</ul>
		</>
	)

}

export default Notes