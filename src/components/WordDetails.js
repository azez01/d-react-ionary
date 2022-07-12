import React from 'react'
import PropTypes from 'prop-types'
const WordDetails = (props) => {
  const { type, def, example, syns } = props
  return (
    <>
     <strong> <p className='type'>{type}</p></strong>
      <p> ▫️  {def}</p>
      <p>👉🏼 <em> {example} </em></p>
      {syns && 
      <>
        <p className='syns'><strong>synonyms</strong></p>  
        <em>{syns}</em>
      </>
    }
    </>
  )
}

WordDetails.prototype = {
  type: PropTypes.string,
  def: PropTypes.string,
  example: PropTypes.string,
  syns: PropTypes.string,
}

export default WordDetails