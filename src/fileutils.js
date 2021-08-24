

async function parseJSONFile(fileHandle) {
  return new Promise((resolve, reject) => {
    fileHandle.text().then(json => {
      if (json.length === 0)
	reject(new Error('File length is zero'))
      
      try {
	let parsedObject = JSON.parse(json)
	resolve(parsedObject)
      }
      
      catch (error) {
	console.log('Error while loading: ', error)
	reject(new Error('Broken file: ' + error.message))
      }
    })
  })

}

function verifyConfig({ tagColors,
			dataOrigin,
			dataEdited,
			author,
			missingDataString,
			fields,
			data }) {

  // errors are things that causes the marker to not display
  // at all and warnings are for things that might have been
  // inadvertently left out but aren't critical
  let errors = [], warnings = []

  // the Map constructor is surprisingly fault tolerant
  const tagColorsMap = new Map(tagColors)

  if (data.length === 0) errors.push({ message: 'No data found' })

  const { errors: fieldErrors,
	  warnings: fieldWarnings } = verifyFields(fields)

  errors.push(...fieldErrors)
  warnings.push(...fieldWarnings)

  const metaWarnings = verifyMetaData({ dataOrigin,
					dataEdited,
					author,
					missingDataString})

  warnings.push(...metaWarnings)
  
  data.forEach((marker, i) => {
    if (!(marker.hasOwnProperty('lat') || marker.hasOwnProperty('lat')))
      errors.push({
	element: marker,
	message: `Marker #${i+1} is missing latitude/longitude`,
      })

    if (!marker.hasOwnProperty('title'))
      warnings.push({
	element: marker,
	message: `Marker #${i+1} is missing a title`,
      })

    const { missing, tagsWithoutColors } = verifyTags(tagColorsMap, marker)

    if (missing) {
      warnings.push({
	element: marker,
	message: 'Marker #' + i + ' has tags without defined colors ('
	       + tagsWithoutColors.reduce((prev, curr) => `${prev}, curr`)
	       + ')',
      })
    }
  })

  // TODO: check for fields that are never filled in
  // TODO: don't specify an element when something is missing
  // just leave it undefined instead and let the error displayer
  // handle it from there

  return { warnings, errors }
  
}

function verifyTags(tagColorsMap, marker) {
  let tagsWithoutColors = []
  let missing = false
  
  if (marker.hasOwnProperty('tags')) {
    marker.tags.forEach(tag => {
      if (!tagColorsMap.get(tag)) {
	tagsWithoutColors.push(tag)
	missing = true
      }
    })
  }

  return { missing, tagsWithoutColors }
}

function verifyFields(fields) {
  let errors = [], warnings = []

  if (fields.length === 0)
    errors.push({
      element: [],
      message: 'No fields found',
    })

  fields.forEach((field, i) => {
    if (!field.type)
      errors.push({
	element: field,
	message: `Field #${i+1} is missing a type`
      })

    if (field.type === 'template') {

      if (!field.templateString) {
	errors.push({
	  element: field,
	  message: `Field #${i+1} is missing the templateString`
	})
      }

      // check for missing template datapoints ie $foo
      if (!templateContainsDataPoints(field.templateString)) {
	warnings.push({
	  element: field,
	  message: `Field #${i+1} doesn't have any datamarkers ($dataName)`
	})
      }

      if (!field.label) {
	warnings.push({
	  element: field,
	  message: `Field #${i+1} is missing the label`
	})
      }
    }


    if (field.type === 'simple') {

      if (!field.label) {
	warnings.push({
	  element: field,
	  message: `Field #${i+1} is missing the label`
	})
      }

      if (!field.dataSource) {
	warnings.push({
	  element: field,
	  message: `Field #${i+1} is missing a dataSource`
	})
      }
    }

    if (field.type === 'tags' && !field.dataSource) {
      warnings.push({
	element: field,
	message: `Field #${i+1} is missing a dataSource`
      })
    }
  })

  return { warnings, errors }
}

function verifyMetaData(config) {
  let warnings = []
  
  if (!config.hasOwnProperty('dataOrigin'))
    warnings.push({
      element: [],
      message: 'dataOrigin property is missing',
    })

  if (!config.hasOwnProperty('missingDataString'))
    warnings.push({
      element: [],
      message: 'missingDataString property is missing',
    })

  if (!config.hasOwnProperty('dataEdited'))
    warnings.push({
      element: [],
      message: 'dataEdited property is missing',
    })

  if (!config.hasOwnProperty('author'))
    warnings.push({
      element: [],
      message: 'author property is missing',
    })

  return warnings
  
}

function templateContainsDataPoints(templateString) {
  return templateString?.match(/\$\w+/g).length > 0
}

export {
  parseJSONFile,
  verifyConfig,
}
