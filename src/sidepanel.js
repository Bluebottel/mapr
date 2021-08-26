import React from 'react'

import colorMappings from './colors.json'

import './styles/sidepanel.css'

const colorMap = new Map(colorMappings)

// light gray
const DEFAULT_TAG_COLOR = '#b0b0b0'
const DEFAULT_MISSING_DATA_STRING = '-'

function SidePanel({ config = {}, selectedMarker }) {

  const { missingDataString = DEFAULT_MISSING_DATA_STRING,
	  fields, colorMap } = config

  // TODO: don't give a default value to fields (?)

  if (!selectedMarker || !config) {
    return (
      <div className = 'placeholder'>
	No marker selected
      </div>
    )
  }

  if (!selectedMarker.title)
    selectedMarker.title = missingDataString

  // TODO: handle fields with undefined type
  return (
    <div className = 'info-panel'>
      <h1>{ selectedMarker.title }</h1>
      {
	fields.map(field => {
	  const elementFunction = typeMap.get(field.type)
	  return elementFunction(selectedMarker)
	})
      }
    </div>
  )
}

export default SidePanel

const typeMap = new Map([
  [ 'simple', Simple ],
  [ 'tags', Tags ],
  [ 'template', Template ],
])

function paint(tag) {
  return colorMap.has(tag) ? colorMap.get(tag) : '#8c8585'
}

function Simple({ missingDataString = DEFAULT_MISSING_DATA_STRING,
		  label = missingDataString,
		  text = missingDataString, }) {
  return (
    <div className = 'data-section'>
      <label>{ label }</label>
      <data-section--text>{ text }</data-section--text>
    </div>
  )
}

function Tags({ tags, colorMap }) {
  return (
    <div className = 'tag-container'>
      {
	tags.map(tag => {
	  return (
	    <div
	      className = 'tag'
	      style = {{
		backgroundColor: colorMap.has(tag.text)
			       ? colorMap.get(tag.text) : DEFAULT_TAG_COLOR
	      }}
	    >
	      { tag.text }
	    </div>
	  )
	})
      }
    </div>
  )
}

function Template({
  missingDataString = DEFAULT_MISSING_DATA_STRING,
  label = missingDataString,
  templateString = missingDataString,
  markerData, }) {

  let text = templateString
  let keywords = templateString.match(/\$\w+/g)
  keywords = keywords.map(keyword => keyword.replace('$', ''))

  // "$foo something $bar" => "fooValue something barValue"
  keywords.forEach(keyword => {
    const keywordData = markerData[keyword] ?
			 markerData[keyword]
		       : missingDataString
    text = text.replaceAll(keyword, keywordData)
  })

  return (
    <div className = 'data-section'>
      <label>{ label }</label>
      <data-section--text>{ text }</data-section--text>
    </div>
  )
    
}
