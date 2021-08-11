import React, { useState } from 'react'
import { MapContainer } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

import Mapbox from './mapbox'
import Infopanel from './infopanel'
import Filterpanel from './filterpanel'
import ModalWrapper from './modalwrapper'

import './styles/app.css'
import './styles/modal.css'

import SettingsImage from './img/settings.svg'

function App(props) {
  
  let [state, setState] = useState({
    selectedMarker: null,
    center: [59.3, 18.3],
    filterString: '',
    modalOpen: false,
  })

  console.log(state)
  
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
	<SettingsImage
	  className = 'settings-button'
	  onClick = { e => setState({ ...state, modalOpen: true }) }
	/>

	<ModalWrapper
	  isOpen = { state.modalOpen }
	  closeModal = { () => setState({ ...state, modalOpen: false} ) }
	/>
      </div>
      
    </div>
  )
}	  

export default App
