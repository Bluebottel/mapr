import React, { useState } from 'react'
import Modal from 'react-modal'

import { parseJSONFile, verifyConfig, parseConfig } from './fileutils'

Modal.setAppElement('#root')

function ModalWrapper({ isOpen, closeModal, setConfig, setMarkers, setBoth }) {

	let [loadingError, setLoadingError] = useState()


	// TODO: custom style the file picker element (separate function?)

	return (
		<Modal
			isOpen={isOpen}
			shouldCloseOnOverlayClick={false}
			className='modal-frame'
			overlayClassName='modal-overlay'
			onAfterOpen={() => { console.log('opened modal') }}
			onRequestClose={e => console.log('closed modal')}
			ariaHideApp={true}
		>
			<div className='modal-content'>

				<button
					className='close-button'
					onClick={() => closeModal()}
				>&#x2715;</button>
				<br />
				<input
					type='file'
					id='file'
					className='inputfile'
					accept='.json'
					onChange={async event => {
						event.preventDefault()

						try {
							const configAndData = await parseJSONFile(event.target.files[0])
							const { config, data } = parseConfig(configAndData)
							console.log('config parsed: ', config)
							setMarkers(data)
							setConfig(config)

							console.log('verify: ', verifyConfig({ config, data }))

							// TODO: run verify and present to the user
						}
						catch (error) {
							setLoadingError(error.message)
							console.log('error ', error)
							return
						}
					}}
				/>

			</div>
		</Modal>
	)
}

export default ModalWrapper
