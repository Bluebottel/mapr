import React from 'react'

import './styles/errorpanel.css'

function Errorpanel({ errors, warnings }) {

  console.log('errorpanel: ', errors, warnings)

  if (errors.length === 0 && warnings.length === 0) return ''

  let errorElements, warningElements

  // TODO: this is not DRY at all
  if (errors.length === 0) {
    errorElements = (
      <div className='notice-panel notice-panel--errors flex-center italic subtle-text'>
        No errors
      </div>
    )
  }
  else {
    errorElements = (
      <div className='notice-panel notice-panel--errors'>
        {
          errors.map(error => {
            return (
              <div className='notice-panel--item'>
                {error.message + '\n' + JSON.stringify(error.element, null, 2)}
              </div>
            )
          })
        }
      </div>
    )
  }

  if (warnings.length === 0) {
    warningElements = (
      <div className='notice-panel notice-panel--warnings flex-center italic subtle-text'>
        No warnings
      </div>
    )
  }
  else {
    warningElements = (
      <div className='notice-panel notice-panel--warnings'>
        {
          errors.map(error => (
            <div className='notice-panel--item'>
              {error.message + '\n' + JSON.stringify(error.element, null, 2)}
            </div>
          )
          )
        }
      </div>
    )
  }

  return (
    <div className='error-warning-container'>
      {errorElements}
      {warningElements}
    </div>
  )
}

export default Errorpanel