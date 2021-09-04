const DEFAULT_MISSING_DATA_STRING = '-'

// naively parse into an object
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

// parsed JSON object => { config, data }
function parseConfig({ missingDataString = DEFAULT_MISSING_DATA_STRING,
  tagColors,
  dataOrigin = missingDataString,
  dataEdited = missingDataString,
  author = missingDataString,
  fields,
  data }) {

  const { map: tagColorsMap } = createTagColorsMap(tagColors)

  dataEdited = new Date(dataEdited)

  return {
    config: {
      tagColors: tagColorsMap,
      dataOrigin,
      dataEdited,
      author,
      missingDataString,
      fields,
    },
    data
  }

}

function verifyConfig({ config, data }) {

    let { tagColors,
      dataOrigin,
      dataEdited,
      author,
      missingDataString,
      fields } = config

  // errors are things that causes the marker to not display
  // at all and warnings are for things that might have been
  // inadvertently left out but aren't critical
  let errors = [], warnings = []

  const { map: tagColorsMap, errors: tagColorMapErrors } = createTagColorsMap(tagColors)
  errors.push(...tagColorMapErrors)
  tagColors = tagColorsMap

  if (data.length === 0) errors.push({ message: 'No data found' })

  const { errors: fieldErrors,
    warnings: fieldWarnings } = verifyFields(fields)

  errors.push(...fieldErrors)
  warnings.push(...fieldWarnings)

  const metaWarnings = verifyMetaData({
    dataOrigin,
    dataEdited,
    author,
    missingDataString
  })

  warnings.push(...metaWarnings)

  data.forEach((marker, i) => {
    if (!(marker.lat || marker.lat))
      errors.push({
        element: marker,
        message: `Marker #${i + 1} is missing latitude/longitude`,
      })

    if (!marker.title)
      warnings.push({
        element: marker,
        message: `Marker #${i + 1} is missing a title`,
      })

    const { missing, tagsWithoutColors } = verifyTags(tagColors, marker)

    if (missing) {
      warnings.push({
        element: marker,
        message: 'Marker #' + (i + 1) + ' has tags without defined colors ('
          + tagsWithoutColors.reduce((prev, curr) => `${prev}, curr`)
          + ')',
      })
    }
  })

  // TODO: check for fields that are never filled in

  return { warnings, errors }

}

function verifyTags(tagColorsMap, marker) {
  const tagsWithoutColors = []
  let missing = false

  if (marker.tags) {
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
      message: 'No fields found',
    })

  fields.forEach((field, i) => {
    if (!field.type)
      errors.push({
        element: field,
        message: `Field #${i + 1} is missing a type`
      })

    if (field.type === 'template') {

      if (!field.templateString) {
        errors.push({
          element: field,
          message: `Field #${i + 1} is missing the templateString`
        })
      }

      // check for missing template datapoints ie $foo
      if (!templateContainsDataPoints(field.templateString)) {
        warnings.push({
          element: field,
          message: `Field #${i + 1} doesn't have any datamarkers ($dataName)`
        })
      }

      if (!field.label) {
        warnings.push({
          element: field,
          message: `Field #${i + 1} is missing the label`
        })
      }
    }

    if (field.type === 'simple') {

      if (!field.label) {
        warnings.push({
          element: field,
          message: `Field #${i + 1} is missing the label`
        })
      }

      if (!field.dataSource) {
        warnings.push({
          element: field,
          message: `Field #${i + 1} is missing a dataSource`
        })
      }
    }

    if (field.type === 'tags' && !field.dataSource) {
      warnings.push({
        element: field,
        message: `Field #${i + 1} is missing a dataSource`
      })
    }
  })

  return { warnings, errors }
}

function verifyMetaData(config) {
  let warnings = []

  if (!config.dataOrigin)
    warnings.push({
      message: 'dataOrigin property is missing',
    })

  if (!config.missingDataString)
    warnings.push({
      message: 'missingDataString property is missing',
    })

  if (!config.dataEdited)
    warnings.push({
      message: 'dataEdited property is missing',
    })

  if (!config.author)
    warnings.push({
      message: 'author property is missing',
    })

  return warnings

}

function templateContainsDataPoints(templateString) {
  return templateString?.match(/\$\w+/g).length > 0
}

function createTagColorsMap(tagTupleArray) {
  let tagMap
  try {
    tagMap = new Map(tagTupleArray)
    return {
      errors: [],
      map: tagMap,
    }
  }
  catch (error) {
    return {
      errors: {
        message: 'Failed to create tagColors map: ' + error.message,
      },
      map: new Map(),
    }
  }
}

export {
  parseJSONFile,
  verifyConfig,
  parseConfig,
}
