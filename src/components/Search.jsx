import React from 'react'

export const Search = ({ search, handleSearch, searchInput }) => {
	return (
		<div className='search'>
			<label htmlFor='search'>Filtrar Personajes</label>
			<input
				ref={searchInput}
				type='text'
				value={search}
				onChange={handleSearch}
				id='search'
				placeholder='Buscar...'
			/>
		</div>
	)
}
