import './App.css'
import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { auth } from './firebase/firebase'
import { storeUser } from './actions/action'
import PublicRoute from './components/PublicRoute'
import PrivateRoute from './components/PrivateRoute'
import Signup from './components/Signup'
import Signin from './components/Signin'
import Home from './components/Home'
import Search from './components/Search'
import Bookmark from './components/Bookmark'

const App = () => {
	const dispatch = useDispatch()
	const user = useSelector(store => store.user)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [emailError, setEmailError] = useState('')
	const [passwordError, setPasswordError] = useState('')
	const clearInputs = () => {
		setEmail('')
		setPassword('')
	}

	const clearErrors = () => {
		setEmailError('')
		setPasswordError('')
		clearInputs()
	}

	useEffect(() => {
		const authListener = auth.onAuthStateChanged(currUser => {
			if (currUser) {
				dispatch(storeUser(currUser))
			}
		})
		return authListener
	}, [dispatch])
	return (
		<div className='App'>
			<Routes>
				<Route
					path='/'
					element={
						<PublicRoute>
							<Signin
								email={email}
								setEmail={setEmail}
								password={password}
								setPassword={setPassword}
								emailError={emailError}
								setEmailError={setEmailError}
								setPasswordError={setPasswordError}
								passwordError={passwordError}
								clearErrors={clearErrors}
							/>
						</PublicRoute>
					}
				/>
				<Route
					path='/signup'
					element={
						<PublicRoute>
							<Signup
								email={email}
								setEmail={setEmail}
								password={password}
								setPassword={setPassword}
								emailError={emailError}
								setEmailError={setEmailError}
								setPasswordError={setPasswordError}
								passwordError={passwordError}
								clearErrors={clearErrors}
							/>
						</PublicRoute>
					}
				/>

				{user && (
					<Route
						path='/home'
						element={
							<PrivateRoute>
								<Home />
							</PrivateRoute>
						}
					/>
				)}
				{user && (
					<Route
						path='/search'
						element={
							<PrivateRoute>
								<Search />
							</PrivateRoute>
						}
						// element={<PrivateRoute exact path='/search' element={Search} />}
					/>
				)}
				{user && (
					<Route
						path='/bookmark'
						element={
							<PrivateRoute>
								<Bookmark />
							</PrivateRoute>
						}
						// element={<PrivateRoute exact path='/bookmark' element={Bookmark} />}
					/>
				)}
				{/* {user && <PrivateRoute exact path='/home' component={Home} />}

				{user && <PrivateRoute exact path='/search' component={Search} />}
				{user && <PrivateRoute exact path='/bookmark' component={Bookmark} />} */}
			</Routes>
		</div>
	)
}

export default App
