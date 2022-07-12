import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { auth } from '../firebase/firebase'
import PropTypes from 'prop-types'

const Signin = props => {
	const {
		email,
		setEmail,
		password,
		setPassword,
		emailError,
		passwordError,
		setEmailError,
		setPasswordError,
		clearErrors,
	} = props

	const clearInputs = () => {
		setEmail('')
		setPassword('')
		clearErrors()
	}
	const history = useNavigate()

	const handleLogin = async e => {
		e.preventDefault()
		try {
			clearErrors()
			await auth.signInWithEmailAndPassword(email, password)
			history('/home', { replace: true })
		} catch (err) {
			switch (err.code) {
				case 'auth/invalid-email':
					setEmailError(err.message)
					break
				case 'auth/user-not-found':
					setEmailError(err.message)
					break
				case 'auth/wrong-password':
					setPasswordError(err.message)
					break
				default:
					return setEmailError(err.message)
			}
		}
	}

	return (
		<div className='form'>
			<label>
				Email
				<input
					type='text'
					autoFocus
					name='name'
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
					autoComplete='off'
				/>
			</label>
			<p className='errorMsg'>{passwordError}</p>
			<div className='submit-btns'>
				<button className='loginbtn' onClick={handleLogin}>
					Sign In
				</button>
				<p>
					Don't have an account?{' '}
					<span>
						<Link to='/signup' onClick={clearInputs}>
							Create an account
						</Link>
					</span>
				</p>
			</div>
		</div>
	)
}

Signin.prototypes = {
	email: PropTypes.array,
	setEmail: PropTypes.func,
	password: PropTypes.string,
	setPassword: PropTypes.func,
	emailError: PropTypes.string,
	passwordError: PropTypes.string,
	setEmailError: PropTypes.func,
	setPasswordError: PropTypes.func,
	clearErrors: PropTypes.func,
}

export default Signin
