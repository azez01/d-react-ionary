import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import WordDetails from './WordDetails'
import { auth, db } from '../firebase/firebase'
import { useSelector, useDispatch } from 'react-redux'
import { storeUserID } from '../actions/action'
import close from '../assests/close.png'
import dropdown from '../assests/dropdown.png'
import orangeStar from '../assests/orange-star.png'
import backbtn from '../assests/back-button.png'
import speaker from '../assests/speaker.png'
import { Link } from 'react-router-dom'

const Bookmark = () => {
	const dispatch = useDispatch()
	const id = useSelector(store => store.id)
	const user = auth.currentUser

	const [shots, setShots] = useState([])
	const [isActive, setIsActive] = useState(false)
	const [isStarred, setIsStarred] = useState(true)

	const toggling = e => {
		setIsActive(!isActive)
		if (isActive) {
			e.target.parentElement.parentElement.classList.remove('active')
		} else {
			e.target.parentElement.parentElement.classList.add('active')
		}
	}

	const playAudio = audio => {
		new Audio(audio).play()
	}

	const handleStarIcon = () => setIsStarred(!isStarred)

	const handleMeanings = meanings => {
		return meanings.map((info, i) => {
			return (
				<>
					<WordDetails
						key={i}
						type={info.partOfSpeech}
						def={info.definitions[0].definition}
						syns={
							info.definitions[0].synonyms &&
							info.definitions[0].synonyms.join(', ')
						}
						example={info.definitions[0].example}
						playAudio={playAudio}
					/>
				</>
			)
		})
	}

	const getFavWords = async () => {
		if (id) {
			const snapshot = await db
				.collection(`users`)
				.doc(`${id}`)
				.collection(`words`)
				.get()
			setShots(snapshot.docs)
		}
	}

	const handleDeleteFavorite = async e => {
		if (e) {
			const isOk = window.confirm('Are you sure you wish to delete this word?')
			if (isOk === true) {
				const getId =
					e.target.parentElement.parentElement.parentElement.parentElement.id
				const getCollection = await db
					.collection(`users`)
					.doc(`${id}`)
					.collection(`words`)
					.get()
				getCollection.docs.forEach(doc => {
					if (doc.id === getId) {
						db.collection(`users`)
							.doc(`${id}`)
							.collection(`words`)
							.doc(doc.id)
							.delete()
							.then(() => getFavWords())
					}
				})
			}
		}
	}

	useEffect(() => {
		const getDocID = async () => {
			const snapshot = await db.collection('users').get()
			snapshot.docs.forEach(doc => {
				if (doc.data().userID === user.email) {
					dispatch(storeUserID(doc.id))
				}
			})
		}
		getDocID()
	}, [dispatch, user.email])

	!shots.length && getFavWords()
	return (
		<>
			<section className='bookmark'>
				<Navbar />
				<Link to='/home'>
					<img src={backbtn} alt='back-button' className='go-back-btn' />
				</Link>
				{!shots.length && (
					<h1 className='loading'>You haven't saved any words yet :(</h1>
				)}
				{shots.map((doc, i) => {
					return (
						<div className='mini-card' key={doc.id} id={doc.id}>
							{doc.data().displayedWord && (
								<div className='mini-notecard'>
									<article className='toprow'>
										<h1 className='displayword'>{doc.data().displayedWord}</h1>
										<h2 className='phonetic'>[{doc.data().phonetic}]</h2>
										<button onClick={() => playAudio(doc.data().sound)}>
											<img className='icon' src={speaker} alt='speaker icon' />
										</button>
										<button
											className='icon'
											onClick={e => handleDeleteFavorite(e)}
										>
											<img
												className='star'
												src={orangeStar}
												alt='star icon'
												onClick={handleStarIcon}
											/>
										</button>
									</article>
									<article className='mini-notedetails'>
										{React.Children.toArray(
											handleMeanings(doc.data().meanings)
										)}
									</article>
									<button className='toggle'>
										<img
											className='togglebtn dropdown'
											src={dropdown}
											alt='dropdown icon'
											onClick={e => toggling(e)}
										/>
										<img
											className='togglebtn close'
											src={close}
											alt='close icon'
											onClick={e => toggling(e)}
										/>
									</button>
								</div>
							)}
						</div>
					)
				})}
			</section>
		</>
	)
}

export default Bookmark
