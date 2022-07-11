import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { createStore } from 'redux'
// import allReducer from './reducers/allReducers'
import { Provider } from 'react-redux'

// const store = createStore(
// 	allReducer,
// 	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )

ReactDOM.render(
	// <Provider store={store}>
	<Router>
		<App />
	</Router>,
	// </Provider>,
	document.getElementById('root')
)
