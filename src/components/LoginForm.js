import React, {useState} from "react"
import PropTypes from 'prop-types'

import { useNavigate } from "react-router-dom"

import loginServices from '../services/login'
import noteService from '../services/notes'


const LoginForm = (props) => {

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

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

    // const {handleLogin, handleUsernameChange, handlePasswordChange, username, password} = props
    return (
    <form onSubmit={handleLogin}>
        <div>
            username: 
            <input 
            id = 'username'
            type = 'text'
            value = {username}
            name = 'Username'
            onChange = { ({ target }) => setUsername(target.value) }
            // onChange = {handleUsernameChange}
            />
        </div>
        <div>
            password: 
            <input
            id = 'password'
            type = 'password'
            value = {password}
            name = 'Password'
            onChange={ ({ target }) => setPassword(target.value) }
            // onChange={handlePasswordChange}
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