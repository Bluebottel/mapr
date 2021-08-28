import React from 'react'

import './styles/filterpanel.css'

const Filterpanel = props => {

  return (
    <div className = 'filter-panel'>
      <input
	type = 'text'
	className = 'filter-bar'
	placeholder = 'Filter by boat or owner name, equipment'
	value = { props.filterString }
	onChange = { event => {
	  props.setFilterString(event.target.value)
	}}
	onFocus = { event => event.target.select() }
      />
    </div>
  )
}	  

export default Filterpanel
