import React from 'react'

import colorMappings from './colors.json'

import './styles/infopanel.css'

const colorMap = new Map(colorMappings)

function Infopanel(props) {

  if (props.selectedMarker === null) {
    return (
      <div className = 'placeholder'>
	No boat selected
      </div>
    )
  }

  return (
    <div className = 'info-panel'>
      <h1>{ props.selectedMarker.name }</h1>

      <label>Owner</label>
      <p>
	{ !props.selectedMarker.ownerName ? 'None recorded'
	  : props.selectedMarker.ownerName }
      </p>

      <label>Comments</label>
      <p>{ props.selectedMarker.comments.replaceAll('$', '\n') }</p>

      <label>Contact number</label>
      <p>{ props.selectedMarker.AlarmPhoneNumber }</p>


      <label>Price</label>
      <p>{ props.selectedMarker.hourFee ? props.selectedMarker.hourFee : 'None recorded' }</p>

      <label>Length / width / depth</label>
      <p>{ props.selectedMarker.lengthMeters ? props.selectedMarker.lengthMeters : '-' }
	{ ' / ' + (props.selectedMarker.width ? props.selectedMarker.width : '-') }
	{ ' / ' + (props.selectedMarker.depth ? props.selectedMarker.depth : '-') }
      </p>

      <label>Top speed</label>
      <p>{ props.selectedMarker.topSpeed ?
	   props.selectedMarker.topSpeed
	   : '-'} kn</p>

      <div className = 'tag-container'>
	{
	  props.selectedMarker?.equipmentTags?.split(',').map((tag, i) => {
	    if (tag === '') return null
	    return (
	      <div
		className = 'equipment-tag'
		style = {{
		  backgroundColor: paint(tag)
		}}
		key = { i }
	      >
		{ tag }
	      </div>
	    )
	  })
	}
      </div>

      <div className = 'meta-info'>
	Data from CRM 2.0, båtar 2020-12-01 med orgnummer
      </div>
      
    </div>
  )
}

export default Infopanel

function paint(tag) {
  return colorMap.has(tag) ? colorMap.get(tag) : '#8c8585'
}
