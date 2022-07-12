const handleApiData = (data) => {
  return {
    word: data[0].word,
    phonetic: data[0].phonetics[0].text,
    sound: data[0].phonetics[0].audio,
    meanings: data[0].meanings
  }
}

export default handleApiData