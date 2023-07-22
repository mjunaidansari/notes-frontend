import React from "react"
import PropTypes from 'prop-types'

const LoginForm = (props) => {

    const {handleLogin, handleUsernameChange, handlePasswordChange, username, password} = props
    return (
    <form onSubmit={handleLogin}>
        <div>
            username: 
            <input 
            id = 'username'
            type = 'text'
            value = {username}
            name = 'Username'
            onChange = {handleUsernameChange}
            />
        </div>
        <div>
            password: 
            <input
            id = 'password'
            type = 'password'
            value = {password}
            name = 'Password'
            onChange={handlePasswordChange}
            />
        </div>
        <button id='login-button' type='submit'>Login</button>
    </form>)
}

LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
}

export default LoginForm