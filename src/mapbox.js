import React from 'react'
import L from 'leaflet'
import { Marker, TileLayer, Tooltip, useMap } from 'react-leaflet'

import gold_icon from './img/marker-gold.png'
import marker_shadow from './img/marker-shadow.png'
import boats from './boats.json' //'./boats_small_list.json'

import './styles/mapbox.css'

const GOLD_MARKER = new L.Icon({
  iconUrl: gold_icon,
  shadowUrl: marker_shadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const BLUE_MARKER = new L.Icon({
  iconUrl: './img/marker-blue.png',
  shadowUrl: './img/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})


function Mapbox(props) {

  const { markers, selectedMarker, center,
	  setSelected, filterString } = props

  const map = useMap()
  
  const lowerCaseFilter = filterString?.toLowerCase()

  console.log('map: ', markers)
  
    
  return (
    <div className = 'map-port'>
      <TileLayer
      attribution = { '&copy; <a href="http://osm.org/copyright">'
		   + 'OpenStreetMap</a> contributors' }
      url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />

      {
	markers.map((marker, i) => {
	  return (
	    <Marker
	      position = {[ marker.lat, marker.lon ]}
	      key = { i }
	      eventHandlers = {{
		click: event => {
		  setSelected({...marker})
		  console.log(marker)
		},
	      }}
	      icon = {
	        markerEquals(marker, selectedMarker)
	        ? GOLD_MARKER : BLUE_MARKER
	      }
	    >
	      <Tooltip sticky>{ marker.title }</Tooltip>
	    </Marker>
	  )
	})
      }
      
    </div>
  )
}

export default Mapbox


// TODO: give each marker an internal ID that
// uniqely identifies them. Check for colliding
// properties before using
function markerEquals(markerA, markerB) {
  return markerA?.lat === markerB?.lat &&
	 markerA?.lon === markerB?.lon
}
