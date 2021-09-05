import React from 'react'

// TODO: include the default missing string properly across all files
const DEFAULT_MISSING_DATA_STRING = '-'

function Simple({ field, marker, missingDataString = DEFAULT_MISSING_DATA_STRING }) {

const { label, dataSource } = field
const text = marker[dataSource] ? marker[dataSource] : missingDataString

console.log('simple')
return (
<section className = 'data-section'>
  <div className = 'data-section--label'>{ label }</div>
  <p className = 'data-section--text'>{ text }</p>
</section>
)
}

export default Simple