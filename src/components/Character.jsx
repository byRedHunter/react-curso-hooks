import React from 'react'

export const Character = ({ name, url, species, status }) => {
	return (
		<article className='character'>
			<img src={url} alt={name} />
			<div className='character-info'>
				<h3>{name}</h3>
				<p>
					<strong>Specie: </strong> {species}{' '}
				</p>
				<p>
					<strong>Status: </strong> {status}{' '}
				</p>
			</div>
		</article>
	)
}
