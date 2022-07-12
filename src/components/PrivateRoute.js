import React from 'react'
import { Route, Navigate } from 'react-router-dom'
import { auth } from '../firebase/firebase'

const PrivateRoute = ({ children}) => {
	const user = auth.currentUser

  return (
    user && user != null ? children : <Navigate to='/' />
  )
	// return (
	// 	<Route
	// 		render={() => {
	// 			return user && user != null ? (
	// 				<Component {...rest} />
	// 			) : (
	// 				<Navigate to='/' />
	// 			)
	// 		}}
	// 	></Route>
	// )
}

export default PrivateRoute
