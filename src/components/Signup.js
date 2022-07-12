import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { auth, db } from '../firebase/firebase'
import PropTypes from 'prop-types'

const Signup = ({
	email,
	setEmail,
	password,
	setPassword,
	emailError,
	passwordError,
	setEmailError,
	setPasswordError,
	clearErrors,
}) => {
	const history = useNavigate()
	const [name, setName] = useState('')
	const [nameError, setNameError] = useState('')

	const clearInputs = () => {
		setEmail('')
		setPassword('')
		clearErrors()
	}

	const handleSignup = async e => {
		e.preventDefault()
		console.log(name)
		clearErrors()
		!name && setNameError(`Please insert your name`)
		try {
			name &&
				(await auth.createUserWithEmailAndPassword(email, password).then(() => {
					const user = auth.currentUser
					user.updateProfile({
						displayName: name,
					})
					db.collection(`users`).add({
						userID: user.email,
					})
					history('/home', { replace: true })
				}))
		} catch (err) {
			console.log(err)
			switch (err.code) {
				case 'auth/email-already-in-use':
					setEmailError(err.message)
					break
				case 'auth/email-already-exists':
					setEmailError(err.message)
					break
				case 'auth/invalid-email':
					setEmailError(err.message)
					break
				case 'auth/weak-password':
					setPasswordError(err.message)
					break
				default:
					return setEmailError(err.message)
			}
		}
	}

	return (
		<form className='form'>
			<label>
				Firstname
				<input
					type='text'
					required
					autoFocus
					name='firstname'
					value={name}
					onChange={e => setName(e.target.value)}
					autoComplete='off'
				/>
				<p className='errorMsg'>{nameError}</p>
			</label>
			<label>
				Email
				<input
					type='text'
					name='email'
					value={email}
					onChange={e => setEmail(e.target.value)}
					autoComplete='off'
				/>
			</label>
			<p className='errorMsg'>{emailError}</p>
			<label>
				Password
				<input
					type='password'
					name='password'
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
			</label>
			<p className='errorMsg'>{passwordError}</p>
			<div className='submit-btns'>
				<button className='loginbtn' onClick={handleSignup}>
					Sign Up
				</button>
				<p>
					Have an account?{' '}
					<span>
						<Link to='/' onClick={clearInputs}>
							Sign In
						</Link>
					</span>
				</p>
			</div>
		</form>
	)
}

Signup.prototypes = {
	email: PropTypes.array,
	setEmail: PropTypes.func,
	password: PropTypes.string,
	setPassword: PropTypes.func,
	emailError: PropTypes.string,
	setEmailError: PropTypes.func,
	setPasswordError: PropTypes.func,
	passwordError: PropTypes.string,
	clearErrors: PropTypes.func,
}

export default Signup
