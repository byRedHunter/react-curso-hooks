import React, { useEffect, useState, useReducer, useMemo } from 'react'
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

	const [search, setSearch] = useState('')

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

	const handleSearch = ({ target }) => {
		setSearch(target.value)
	}

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

	/* const filteredUsers = characters.filter((user) =>
		user.name.toLowerCase().includes(search.toLowerCase())
	) */
	const filteredUsers = useMemo(
		() =>
			characters.filter((user) =>
				user.name.toLowerCase().includes(search.toLowerCase())
			),
		[characters, search]
	)

	return (
		<div className='container'>
			{isLoading && <div className='loading'>Cargando...</div>}

			{!isLoading && (
				<div className='search'>
					<label htmlFor='search'>Filtrar Personajes</label>
					<input
						type='text'
						value={search}
						onChange={handleSearch}
						id='search'
						placeholder='Buscar...'
					/>
				</div>
			)}

			{favorites.favorites.length > 0 && !isLoading && (
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
				{filteredUsers.map((character) => (
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
