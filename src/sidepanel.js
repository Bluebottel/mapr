import React from 'react'

import Template from './fields/template'
import Simple from './fields/simple'
import Tags from './fields/tags'

import './styles/sidepanel.css'

// TODO: store this in a central place
const DEFAULT_MISSING_DATA_STRING = '-'

function SidePanel({ config, selectedMarker }) {

  const { missingDataString = DEFAULT_MISSING_DATA_STRING,
    fields, tagColors } = config

  if (!selectedMarker || !fields) {
    return (
      <div className='placeholder'>
        No marker selected
      </div>
    )
  }

  // TODO: it's hard to add types since they touch many files, consolidate
  const typeMap = new Map([
    ['simple', args => Simple({ ...args })],
    ['tags', args => Tags({ tagColors, ...args })],
    ['template', Template],
  ])

  if (!selectedMarker.title) selectedMarker.title = missingDataString

  return (
    <div className='info-panel'>
      <h1>{selectedMarker.title}</h1>
      {
        fields.map(field => {
          const elementFunction = typeMap.get(field.type)

          // don't render fields with an invalid/missing type
          return elementFunction ? elementFunction({ field, marker: selectedMarker }) : ''
        })
      }
    </div>
  )
}

export default SidePanel
