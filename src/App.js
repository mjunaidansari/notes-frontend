import React, { useState, useEffect, useRef } from 'react'

import Note from './components/Note'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Home from './components/Home'
import Notes from './components/Notes'

import noteService from './services/notes'
import loginServices from './services/login'

import NoteForm from './components/NoteForm'

import { useNavigate } from 'react-router-dom'

/* REACT ROUTER */
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'

const App = () => {

    /** USESTATE HOOKS */

    const [notes, setNotes] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)

    const [user, setUser] = useState(null)

    /** USEEFFECT HOOKS */

    //getting data from the server
    useEffect(() => {
        noteService
            .getAll()
            .then(response => {
                console.log('promise fulfilled')
                setNotes(response.data)
            })
    }, [])

    useEffect(() => {
        const loggedUserJson = window.localStorage.getItem('loggedNoteappUser')
        if(loggedUserJson){
            const user = JSON.parse(loggedUserJson)
            setUser(user)
            noteService.setToken(user.token)
        }
    }, [])

    /** FUNCTIONS */

	const handleLogout = () => {

		localStorage.removeItem('loggedNoteappUser')
		setUser(null)

	}

	/* STYLE OBJECTS */

	const padding = {
		padding: 5
	}

    return (
        <Router>

		<Notification message = {errorMessage} />

			<div>
				<Link style={padding} to="/">Home</Link>
				<Link style={padding} to="/notes">Notes</Link>
				<Link style={padding} to="/users">Users</Link>
				{user
					?<><em>{user.name} logged in </em><button onClick={handleLogout}>Logout</button></>
					:<Link style={padding} to='/login'>Login</Link>	
				}
			</div>

			<Routes>
				<Route path = "/" element = {<Home/>}/>
				<Route path = "/notes" element = {<Notes
														notes = {notes}
														user = {user}
														setNotes = {setNotes}
														setErrorMessage = {setErrorMessage}
													/>}/>
				<Route path = "/login" element = {
					<LoginForm
						setUser = {setUser}
						setErrorMessage = {setErrorMessage}
					/>
				} />
			</Routes>
            
        </Router>
    )

}

export default App