import React from 'react'
import Navbar from './Navbar'
import Form from './Form'
import { Link } from 'react-router-dom'
import backbtn from '../assests/back-button.png'

const Search = () => {
	return (
		<div className='search-wrapper'>
			<Navbar />
			<Link to='/home'>
				<img src={backbtn} alt='back-button' className='go-back-btn' />
			</Link>
			<Form />
		</div>
	)
}

export default Search
