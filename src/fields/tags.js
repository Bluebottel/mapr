import React from 'react'

// TODO: include this properly across files
const DEFAULT_TAG_COLOR = '#b0b0b0'

function Tags({ field, marker, tagColors }) {
	console.log('tags')

	console.log('tags: ', field, marker, tagColors)

	const tags = marker[field.dataSource]

	return (
		<div className='tag-container'>
			{
				tags.map(tag => {
					return (
						<div
							className='tag'
							style={{
								backgroundColor: tagColors.has(tag)
									? tagColors.get(tag) : DEFAULT_TAG_COLOR
							}}
						>
							{ tag }
						</div>
					)
				})
			}
		</div>
	)
}

export default Tags