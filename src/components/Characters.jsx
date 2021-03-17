import React, { useEffect, useState } from 'react'
import { Character } from './Character'

export const Characters = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [characters, setCharacters] = useState([])

	useEffect(() => {
		fetch('https://rickandmortyapi.com/api/character/')
			.then((response) => response.json())
			.then((data) => {
				setCharacters(data.results)
				setIsLoading(false)
			})
	}, [])

	return (
		<div className='container characters'>
			{isLoading && <div className='loading'>Cargando...</div>}

			{characters.map((character) => (
				<Character
					key={character.id}
					name={character.name}
					url={character.image}
					species={character.species}
					status={character.status}
				/>
			))}
		</div>
	)
}
