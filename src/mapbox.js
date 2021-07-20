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

const MAX_ZOOM = 20


function Mapbox(props) {

  const map = useMap()
  
  const lowerCaseFilter = props.filterString?.toLowerCase()
  const filteredList = props.filterString ? boats.filter(boat => {
    return boat.ownerName?.toLowerCase().includes(lowerCaseFilter)
	|| boat.name?.toLowerCase().includes(lowerCaseFilter)
	|| boat.equipmentTags.toLowerCase().includes(lowerCaseFilter)
  }) : boats
    
  return (
    <div className = 'map-port'>
      <TileLayer
      attribution = { '&copy; <a href="http://osm.org/copyright">'
		   + 'OpenStreetMap</a> contributors' }
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {
	filteredList.map((boat, i) => {
	  return (
	    <Marker
	      position = { [boat.lat, boat.lon]}
	      key = { i }
	      eventHandlers={{
		click: e => {
		  props.setSelected({...boat})
		  console.log(boat)
		},
	      }}
	      icon = {
	      props.selectedMarker?.orgNumber ===  boat.orgNumber
	      && props.selectedMarker?.name === boat.name
	      ? GOLD_MARKER : BLUE_MARKER
	      }
	    >
	      <Tooltip sticky>{ boat.name }</Tooltip>
	    </Marker>
	  )
	})
      }
      
    </div>
  )
}	  

export default Mapbox
