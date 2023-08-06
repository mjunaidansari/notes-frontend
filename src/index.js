import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// import React, {useState} from "react"
// import ReactDOM from 'react-dom/client'
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"

// const Home = () => {
// 	return (
// 		<div><h1>Notes App</h1></div>
// 	)
// }

// const Notes = () => {
// 	return (
// 		<div><h1>Notes</h1></div>
// 	)
// }

// const Users = () => {
// 	return (
// 		<div><h1>Users</h1></div>
// 	)
// }

// const App = () => {

// 	const padding = {
// 		padding: 5
// 	}

// 	return (
// 		<Router>

// 			<div>
// 				<Link style={padding} to="/">Home</Link>
// 				<Link style={padding} to="/notes">Notes</Link>
// 				<Link style={padding} to="/users">Users</Link>
// 			</div>

// 			<Routes>
// 				<Route path="/notes" element = {<Notes/>} />
// 				<Route path="/users" element = {<Users/>} />
// 				<Route path="/" element = {<Home/>} />
// 			</Routes>

// 			<div>
// 				<i>Note App, dept of Computer Science</i>
// 			</div>

// 		</Router>
// 	)

// }

// const root = ReactDOM.createRoot(document.getElementById('root'))
// root.render(<App/>)