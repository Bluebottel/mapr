import React from 'react'

// TODO: include this one properly across all files
const DEFAULT_MISSING_DATA_STRING = '-'

function Template({ field, marker }) {
  const {
    missingDataString = DEFAULT_MISSING_DATA_STRING,
    label = missingDataString,
    templateString = missingDataString
  } = field

  let text = templateString

  let keywords = templateString.match(/\$\w+/g)
  if (keywords === null) keywords = []
  keywords = keywords.map(keyword => keyword.replace('$', ''))


  // "$foo something $bar" => "fooValue something barValue"
  keywords.forEach(keyword => {
    const keywordData = marker[keyword] ?
      marker[keyword]
      : missingDataString
    text = text.replaceAll('$' + keyword, keywordData)
  })

  return (
    <section className='data-section'>
      <label>{ label }</label>
      <p className='data-section--text'>{ text }</p>
    </section>
  )

}

export default Template