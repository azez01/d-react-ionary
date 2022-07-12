import React from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
const Home = () => {
	return (
		<section className='home'>
			<Navbar />
			<section className='tab-btns'>
				<Link to='/search' className='search-icon btn'>
					🔍{' '}
				</Link>
				<Link to='/bookmark' className='star-icon btn'>
					🌟
				</Link>
			</section>
		</section>
	)
}

export default Home
