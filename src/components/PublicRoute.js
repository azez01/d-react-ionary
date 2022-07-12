import React from 'react'
import { Route, Navigate } from 'react-router-dom'
import { auth } from '../firebase/firebase'

const PublicRoute = ({ children }) => {
	const user = auth.currentUser
	// return (
	// 	<Route
	// 		render={props => {
	// 			return user ? <Navigate to='/home' /> : <Component {...rest} />
	// 		}}
	// 	/>
	// )

	return user ? <Navigate to='/home' /> : children
}
export default PublicRoute
