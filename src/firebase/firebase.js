// // import firebase from 'firebase/app'
// // import 'firebase/auth'
// // import 'firebase/firestore'
// import { initializeApp } from 'firebase/app'
// import { getFirestore } from 'firebase/firestore'
// import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

// // const firebaseConfig = {
// // 	apiKey: process.env.REACT_APP_API_KEY,
// // 	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
// // 	projectId: process.env.REACT_APP_PROJECT_ID,
// // 	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
// // 	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
// // 	appId: process.env.REACT_APP_API_ID,
// // }
// // const app = firebase.initializeApp(firebaseConfig)

// // const db = firebase.firestore()
// // const auth = app.auth()
// // export { auth, db }

// const firebaseConfig = {
// 	apiKey: 'AIzaSyBdZZjo8laZwtbljQPHrNmzNHvg55J37uQ',
// 	authDomain: 'd-react-ionary.firebaseapp.com',
// 	projectId: 'd-react-ionary',
// 	storageBucket: 'd-react-ionary.appspot.com',
// 	messagingSenderId: '274084823491',
// 	appId: '1:274084823491:web:e20bbd6418eec234893d76',
// }

// const app = initializeApp(firebaseConfig)

// export const db = getFirestore(app)
// export const auth = getAuth(app)

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const app = firebase.initializeApp({
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_API_ID,
})
const db = firebase.firestore()
const auth = app.auth()
export { auth, db }
