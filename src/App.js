import React, { useState, useEffect, useRef } from 'react'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Notes from './components/Notes'

import noteService from './services/notes'

/* REACT ROUTER */
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import { Alert, Nav, Navbar, NavbarBrand } from 'react-bootstrap'

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
				console.log(response.data)
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

	const setNotification = (message) => {

		setErrorMessage(message)
		setTimeout(() => {
			setErrorMessage(null)
		}, 10000)

	}

	/* STYLE OBJECTS */

	const padding = {
		padding: 5
	}

    return (
		<div className = 'container'>
        <Router>

		{/* <Notification message = {errorMessage} /> */}
		{(errorMessage &&
			<Alert variant='success'>
				{errorMessage}
			</Alert>	
		)}

			{/* <div>
				<Link style={padding} to="/">Home</Link>
				<Link style={padding} to="/notes">Notes</Link>
				<Link style={padding} to="/users">Users</Link>
				{user
					?<><em>{user.name} logged in </em><button onClick={handleLogout}>Logout</button></>
					:<Link style={padding} to='/login'>Login</Link>	
				}
			</div> */}

			<Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
				<Navbar.Toggle aria-controls='responsive-navbar-nav' />
				<Navbar.Collapse id='reponsive-navbar-nav'>
					<Nav className='me-auto'>
						<Nav.Link href='#' as='span'>
							<Link style={padding} to="/">Home</Link>
						</Nav.Link>
						<Nav.Link href='#' as='span'>
							<Link style={padding} to="/notes">Notes</Link>
						</Nav.Link>
						<Nav.Link href='#' as='span'>
							<Link style={padding} to="/users">Users</Link>
						</Nav.Link>
						<Nav.Link href='#' as='span'>
							{user
								?<><em>{user.name} logged in </em><button onClick={handleLogout}>Logout</button></>
								:<Link style={padding} to='/login'>Login</Link>	
							}
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>

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
						setNotification = {setNotification}
					/>
				} />
			</Routes>
            
        </Router>
		</div>
    )

}

export default App