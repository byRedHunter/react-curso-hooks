import React from 'react'

export const Favorite = ({ name, url, id, deleteFavorite }) => {
	return (
		<li className='list-favorites-item'>
			<div className='content'>
				<img src={url} alt='' />

				<p>
					<strong>{name}</strong>
				</p>
			</div>

			<div className='close' onClick={() => deleteFavorite(id)}>
				❌
			</div>
		</li>
	)
}
