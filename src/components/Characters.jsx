import React, { useEffect, useState, useReducer } from 'react'
import { Character } from './Character'
import { Favorite } from './Favorite'

const initialState = {
	favorites: JSON.parse(localStorage.getItem('favorites')) || [],
}

const favoriteReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_TO_FAVORITE':
			return {
				...state,
				favorites: [...state.favorites, action.payload],
			}

		case 'DELETE_TO_FAVORITE':
			return {
				...state,
				favorites: state.favorites.filter(
					(favorite) => favorite.id !== action.payload
				),
			}

		default:
			return state
	}
}

export const Characters = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [characters, setCharacters] = useState([])

	const [favorites, dispatch] = useReducer(favoriteReducer, initialState)

	useEffect(() => {
		localStorage.setItem('favorites', JSON.stringify(favorites.favorites))
	}, [favorites])

	useEffect(() => {
		fetch('https://rickandmortyapi.com/api/character/')
			.then((response) => response.json())
			.then((data) => {
				setCharacters(data.results)
				setIsLoading(false)
			})
	}, [])

	const validateItem = (data) => {
		let state = false

		favorites.favorites.forEach((favorite) => {
			if (favorite.id === data.id) state = true
		})

		return state
	}

	const handleClick = (favorite) => {
		if (!validateItem(favorite)) {
			dispatch({ type: 'ADD_TO_FAVORITE', payload: favorite })
		}
	}

	const deleteFavorite = (id) => {
		dispatch({ type: 'DELETE_TO_FAVORITE', payload: id })
	}

	return (
		<div className='container'>
			{isLoading && <div className='loading'>Cargando...</div>}

			{favorites.favorites.length > 0 && (
				<>
					<h3>Mis Favoritos</h3>
					<ul className='list-favorites'>
						{favorites.favorites.map((favorite) => (
							<Favorite
								key={favorite.id}
								name={favorite.name}
								url={favorite.image}
								id={favorite.id}
								deleteFavorite={deleteFavorite}
							/>
						))}
					</ul>
				</>
			)}

			<section className='characters'>
				{characters.map((character) => (
					<Character
						key={character.id}
						name={character.name}
						url={character.image}
						species={character.species}
						status={character.status}
						data={character}
						handleClick={handleClick}
					/>
				))}
			</section>
		</div>
	)
}
