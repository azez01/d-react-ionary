import React from 'react'
const baseURL = 'https://api.dictionaryapi.dev/api/v2/entries/en_US/'

const fetchWordData = query => {
  return fetch(`${baseURL}${query}`)
}

const checkForError = status => {
  let errorMsg;
  switch (status) {
    case 404:
      errorMsg = 'Sorry, we couldn\'t find definitions for the word you were looking for';
      break;
    case 500:
      errorMsg = 'Internal Server Error. Our whole team are now aware.';
      break;
    default:
      errorMsg = 'Oops! Request failed. Please try again.';
  }

  return <h1 className='error-msg'>{errorMsg}</h1>

}

export {
  fetchWordData, 
  checkForError
}