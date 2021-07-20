import React, { useState } from 'react'
import { MapContainer } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

import Mapbox from './mapbox'
import Infopanel from './infopanel'
import Filterpanel from './filterpanel'

import './styles/app.css'

function App(props) {
  
  let [state, setState] = useState({
    selectedMarker: null,
    center: [59.3, 18.3],
    filterString: '',
  })

  return (
    <div className = 'grid-placer'>
      <MapContainer
	center = { state.center }
	zoom = { 8 }
	className = 'map-port'
      >
	<Mapbox
	  markers = { state.markers }
	  selectedMarker = { state.selectedMarker }
	  center = { state.center }
	  setCenter = { coords => setState({ center: coords })}
	  setSelected = { newMarker =>
	    setState({ ...state, selectedMarker: newMarker })}
	  filterString = { state.filterString }
	/>
      </MapContainer>
      
      <div className = 'side-panel'>
	<Filterpanel
	  filterString = { state.filterString }
	  setFilterString = { newString => {
	    setState({ ...state, filterString: newString })
	  }}
	/>
	<Infopanel selectedMarker = { state.selectedMarker }/>
      </div>
      
    </div>
  )
}	  

export default App
