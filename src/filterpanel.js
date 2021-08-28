import React from 'react'

import './styles/filterpanel.css'

function Filterpanel({ filterString, setFilterString }) {

	return (
		<div className = 'filter-panel'>
			<input
				type = 'text'
				className = 'filter-bar'
				placeholder = 'Filter on title'
				value = { filterString }
				onChange = { event => {
					setFilterString(event.target.value)
				}}
				onFocus = { event => event.target.select() }
			/>
		</div>
	)
}

export default Filterpanel
