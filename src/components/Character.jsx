import React from 'react'

export const Character = ({
	name,
	url,
	species,
	status,
	data,
	handleClick,
}) => {
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

				<button className='button-card' onClick={() => handleClick(data)}>
					Agregar Fovorito
				</button>
			</div>
		</article>
	)
}
