import React, { useEffect, useState } from 'react'
import WordDetails from './WordDetails'
import { fetchWordData, checkForError } from '../apiCalls/apiCalls'
import handleApiData from '../apiCalls/cleanApiData'
import { useSelector, useDispatch } from 'react-redux'
import { updateStatus } from '../actions/action'
import { db } from '../firebase/firebase'
import { storeUserID } from '../actions/action'
import orangeStar from '../assests/orange-star.png'
import whiteStar from '../assests/white-star.png'
import speaker from '../assests/speaker.png'
import '../App.css'

const Form = () => {
	const [sound, setSound] = useState('')
	const [word, setWord] = useState('')
	const [phonetic, setPhonetic] = useState('')
	const [meanings, setMeanings] = useState([])
	const [displayedWord, setDisplayedWord] = useState('')
	const [findUser, setFindUser] = useState('')
	const [statusCode, setStatusCode] = useState(200)
	const [fetchedError, setFetchedError] = useState(false)
	const [isStarred, setIsStarred] = useState(false)
	const dispatch = useDispatch()
	const status = useSelector(store => store.status)
	const user = useSelector(store => store.user)

	const handleChange = e => {
		setWord(([e.target.name] = e.target.value))
	}

	const handleMeanings = meanings => {
		return meanings.map((info, i) => {
			return (
				<>
					<WordDetails
						key={i}
						word={word}
						type={info.partOfSpeech}
						def={info.definitions[0].definition}
						syns={
							info.definitions[0].synonyms &&
							info.definitions[0].synonyms.join(', ')
						}
						example={info.definitions[0].example}
					/>
				</>
			)
		})
	}

	useEffect(() => {
		const getDocID = async () => {
			const snapshot = await db.collection('users').get()
			snapshot.docs.forEach(doc => {
				if (doc.data().userID === user.email) {
					setFindUser(doc.id)
					dispatch(storeUserID(doc.id))
				}
			})
		}
		getDocID()
	}, [dispatch, user.email])

	const handleFavorite = () => {
		if (!isStarred) {
			db.collection(`users`).doc(`${findUser}`).collection(`words`).add({
				displayedWord: displayedWord,
				phonetic: phonetic,
				sound: sound,
				meanings: meanings,
			})
		} else if (isStarred) {
			db.collection(`users`)
				.doc(`${findUser}`)
				.collection(`words`)
				.get()
				.then(data => {
					data.docs.forEach((doc, i) => {
						if (i === 0) {
							db.collection(`users`)
								.doc(`${findUser}`)
								.collection(`words`)
								.doc(doc.id)
								.delete()
						}
					})
				})
		}
	}
	const handleStarIcon = () => setIsStarred(!isStarred)

	const handleDisplay = () => {
		return (
			<div className='cards'>
				{meanings.length ? (
					<div className='notecard'>
						<article className='toprow'>
							<h1 className='displayword'>{displayedWord}</h1>
							<h2 className='phonetic'>[{phonetic}]</h2>
							<button onClick={playAudio}>
								<img className='icon' src={speaker} alt='speaker icon' />
							</button>
							<button className='icon' onClick={handleFavorite}>
								<img
									className='star'
									src={isStarred ? orangeStar : whiteStar}
									alt='star icon'
									onClick={handleStarIcon}
								/>
							</button>
						</article>
						<article className='notedetails'>
							{React.Children.toArray(handleMeanings(meanings))}
						</article>
					</div>
				) : null}
			</div>
		)
	}
	const playAudio = () => {
		new Audio(sound).play()
	}

	const assignData = e => {
		if (word && e.key === 'Enter') {
			setIsStarred(false)
			setFetchedError(false)
			fetchWordData(word)
				.then(response => {
					setStatusCode(response.status)
					return response.json()
				})
				.then(data => {
					setDisplayedWord(handleApiData(data).word)
					setSound(handleApiData(data).sound)
					setPhonetic(handleApiData(data).phonetic)
					setMeanings(handleApiData(data).meanings)
					dispatch(updateStatus(true))
				})
				.catch(() => setFetchedError(true))
		}
	}

	return (
		<>
			<div className='search-box'>
				<input
					className='searchbar'
					type='text'
					placeholder='Search your word here...'
					autoComplete='off'
					name='word'
					max='20'
					value={word}
					onChange={e => handleChange(e)}
					onKeyDown={assignData}
				/>
			</div>
			{fetchedError && checkForError(statusCode)}
			{!fetchedError && status && handleDisplay()}
		</>
	)
}

export default Form
