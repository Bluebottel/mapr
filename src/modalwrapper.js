import React, { useState } from 'react'
import Modal from 'react-modal'

Modal.setAppElement('#root')

function ModalWrapper({ isOpen, closeModal }) {

  let [ loadingError, setLoadingError ] = useState()
  
  console.log('modalwrapper: ', isOpen)

  
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

	  onChange = { event => {
	      event.preventDefault()
	      event.target.files[0].text()
		   .then(data => {
		     
		     try {
		       // parses from JSON to actual data
		       data = JSON.parse(data)
		       console.log(data)
		     }
		     catch (error) {
		       setLoadingError('Error while loading: ' + error)
		       console.log('Error while loading: ', error)
		       return
		     }
		     
		     // in case the user is trying to load a broken or empty file
		     if (!data) {
		       this.props.setLoadingError('JSON broken or missing')
		       console.log('JSON broken or missing')
		       return
		     }
		   })
	  }}
	/>
	
      </div>
    </Modal>
  )
}

export default ModalWrapper
