import React from 'react'

import './styles/filterpanel.css'

const SearchBar = props => {

  return (
    <div className = 'filter-panel'>
      <input
	type = 'text'
	className = 'filter-bar'
	placeholder = 'Filter by boat or owner name, equipment'
	value = { props.filterString }
	onChange = { e => {
	  props.setFilterString(e.target.value)
	}}
	onFocus = { e => e.target.select() }
      />
    </div>
  )
}	  

export default SearchBar
