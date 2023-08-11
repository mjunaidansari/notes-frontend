import React, {useState} from "react"
import PropTypes from 'prop-types'

import { useFetcher, useNavigate } from "react-router-dom"

import loginServices from '../services/login'
import noteService from '../services/notes'

import useField from "../hooks/hooks"


const LoginForm = (props) => {

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	// const username = useField('text')
	// const password = useField('password')

	const {setUser, setErrorMessage} = props

	const navigate = useNavigate()

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
			console.log(user)
            setUser(user)
            setUsername('')
            setPassword('')
			navigate('/')
        } catch(exception) {
            setErrorMessage('Wrong Credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
	}

    return (
    <form onSubmit={handleLogin}>
        <div>
            username: 
            <input 
            id = 'username'
            type = 'text'
            value = {username}
            name = 'Username'
            onChange = {({ target }) => setUsername(target.value)}
            />
        </div>
        <div>
            password: 
            <input
            id = 'password'
            type = 'password'
            value = {password}
            name = 'Password'
            onChange={({ target }) => setPassword(target.value)}
            />
        </div>
        <button id='login-button' type='submit'>Login</button>
    </form>)
}

// LoginForm.propTypes = {
//     handleLogin: PropTypes.func.isRequired,
//     handleUsernameChange: PropTypes.func.isRequired,
//     handlePasswordChange: PropTypes.func.isRequired,
//     username: PropTypes.string.isRequired,
//     password: PropTypes.string.isRequired
// }

export default LoginForm