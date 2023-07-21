import React from 'react'

// import styles from './styles/NotesNotification.module.css'

const Notification = ({message}) => {

    if (message === null)
        return null

    return (
        <div className='error' id = 'error'>
            {message}
        </div>
    )

}

export default Notification