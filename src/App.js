import React, { useState, useEffect, useRef } from 'react'

import Note from './components/Note'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

import noteService from './services/notes'
import loginServices from './services/login'

import styles from './index'
import NoteForm from './components/NoteForm'

const App = () => {

    /** USESTATE HOOKS */

    const [notes, setNotes] = useState([])
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const [loginVisible, setLoginVisible] = useState(false)

    /** USEREF HOOKS */

    const noteFormRef = useRef()

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

    const addNote = async (noteObject) => {

        try {
            noteFormRef.current.toggleVisibility()
            const data = await
            noteService.create(noteObject)
            console.log(data)
            setNotes(notes.concat(data))
        } catch (exception) {
            console.log(exception)
        }

    }

    const notesToShow = showAll? notes : notes.filter(note => note.important === true)

    const toggleImportanceOf = (id) => {
        //finding and modifying the importance of note
        const note = notes.find(note => note.id === id)
        const changeNote = {
            ...note, 
            important: !note.important
        }
        //updating note in server
        noteService
            .update(id, changeNote)
            .then(response => {
                setNotes(notes.map(note => note.id !== id ? note : response.data))
            })
            .catch(error => {
                setErrorMessage(`The note ${note.content} was already deleted from the server`)
                setTimeout(()=> {
                    setErrorMessage(null)
                }, 5000)
                setNotes(notes.filter(note => note.id !== id))
            })
    }
    
    const handleLogin = async (event) =>{
        event.preventDefault()
        
        try {
            const user = await loginServices.login({
                username, password
            })
            window.localStorage.setItem(
                'loggedNoteappUser', JSON.stringify(user)
            )
            noteService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch(exception) {
            setErrorMessage('Wrong Credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }

    }

    /** HELPER FUNCTIONS */

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
        <div>
            <h1>Notes</h1>
            <Notification message = {errorMessage} />

            {!user && 
                <Togglable buttonLabel = 'Login'>
                    <LoginForm
                        username = {username}
                        password = {password}
                        handleUsernameChange = { ({ target }) => setUsername(target.value)}
                        handlePasswordChange = { ({ target }) => setPassword(target.value)}
                        handleLogin = {handleLogin}
                    />
                </Togglable>
            }
            {user && 
                <>
                    <p>{user.name} is logged in</p>
                    {noteForm()}
                 </>
            }

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
            
            
        </div>
    )

}

export default App