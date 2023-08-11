import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

/** UNCOMMMENT BELOW CODE FOR SIMPLE CUSTOM HOOK */

// import React, {useState} from "react"
// import ReactDOM from "react-dom/client"

// const useCounter = () => {

// 	const [value, setValue] = useState(0)

// 	const increase = () => {
// 		setValue(value + 1)
// 	}

// 	const decrease = () => {
// 		setValue(value - 1)
// 	}
	
// 	const zero = () => {
// 		setValue(0)
// 	}

// 	return {
// 		value,
// 		increase,
// 		decrease,
// 		zero
// 	}

// }

// const App = () => {

// 	const counter = useCounter()

// 	return (
// 		<div>
// 			<div>{counter.value}</div>
// 			<button onClick={counter.increase}>
// 				Plus
// 			</button>
// 			<button onClick={counter.increase}>
// 				Zero
// 			</button>
// 			<button onClick={counter.increase}>
// 				Minus
// 			</button>
// 		</div>
// 	)

// }

// const root = ReactDOM.createRoot(document.getElementById('root'))
// root.render(<App/>)
