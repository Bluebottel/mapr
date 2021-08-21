

async function parseJSONFile(fileHandle) {

  fileHandle.text().then(json => {

    if (json.length === 0)
      return Promise.reject(new Error('File length is zero'))
    
    try {
      json = JSON.parse(json)
      console.log(json)
      return json
    }
    
    catch (error) {
      console.log('Error while loading: ', error)
      return Promise.reject(new Error('Broken file: ' + error.message))
    }
    
  })
}

function parseConfig({ tagColors = [],
		       dataOrigin,
		       dataEdited,
		       missingDataString,
		       fields = [],
		       data }) {
  return
}
