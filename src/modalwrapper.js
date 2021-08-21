import React, { useState } from 'react'
import Modal from 'react-modal'

import { parseJSONFile, parseConfig } from './fileutils'

Modal.setAppElement('#root')

function ModalWrapper({ isOpen, closeModal }) {

  let [ loadingError, setLoadingError ] = useState()


  // TODO: custom style the file picker element (separate function?)
  // TODO: JSON parsing from file in separate file
  
  return (
    <Modal
      isOpen = { isOpen }
      shouldCloseOnOverlayClick = { false }
      className = "modal-frame"
      overlayClassName = "modal-overlay"
      onAfterOpen = { () => { console.log('opened modal') }}
      onRequestClose = { e => console.log('closed modal') }
      ariaHideApp = { true }

    >
      <div className = 'modal-content'>
	
	<button
	  className = 'close-button'
	  onClick = { e => closeModal() }
	>&#x2715;</button>
	<br />
	<input
	  type = 'file'
	  id = 'file'
	  className = 'inputfile'
	  accept = '.json'
	  onChange = { async event => {
	    event.preventDefault()

	    try {
	      const combinedConfig = await parseJSONFile(event.target.files[0])
	      const { config, data } = parseConfig(combinedConfig)
	    }
	    catch(error) {
	      setLoadingError(error.message)
	      return
	    }
	  }}
	/>
	
      </div>
    </Modal>
  )
}

export default ModalWrapper
