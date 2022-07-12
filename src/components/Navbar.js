import React from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase/firebase'

const Navbar = () => {
	const history = useNavigate()
	const handleSignout = async e => {
		e.preventDefault()
		try {
			await auth
				.signOut()
				.then(() => history('/', { replace: true }))
				.catch(err => console.log(err))
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<header>
			<h1 className='title'>Reactionary</h1>
			<button className='logout' onClick={handleSignout}>
				Logout
			</button>
		</header>
	)
}

export default Navbar
