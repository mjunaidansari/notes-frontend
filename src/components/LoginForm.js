import React, {useState} from "react"
import PropTypes from 'prop-types'

import { useFetcher, useNavigate } from "react-router-dom"

import loginServices from '../services/login'
import noteService from '../services/notes'

import { Form, Button } from "react-bootstrap"


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
			props.setNotification(`Welcome ${user.name}`)
			navigate('/')
        } catch(exception) {
            setErrorMessage('Wrong Credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
	}

    return (
	<>
		<h2>Login</h2>
		<Form onSubmit={handleLogin}>
			<Form.Group>
				<Form.Label>Username:</Form.Label>
				<Form.Control
					id = 'username'
					type = 'text'
					name = 'username'
					value={username}
					onChange = {({ target }) => setUsername(target.value)}
				/>
				<Form.Label>Password:</Form.Label>
				<Form.Control
					id = 'password'
					type = 'password'
					name = 'password'
					value={password}
					onChange = {({ target }) => setPassword(target.value)}
				/>
			</Form.Group>
			<Button id="login-button" variant="primary" type="submit">Login</Button>
			{/* <div>
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
			<button id='login-button' type='submit'>Login</button> */}
		</Form>
	</>
	)
}

// LoginForm.propTypes = {
//     handleLogin: PropTypes.func.isRequired,
//     handleUsernameChange: PropTypes.func.isRequired,
//     handlePasswordChange: PropTypes.func.isRequired,
//     username: PropTypes.string.isRequired,
//     password: PropTypes.string.isRequired
// }

export default LoginForm