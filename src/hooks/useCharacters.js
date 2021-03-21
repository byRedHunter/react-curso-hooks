import { useEffect, useState } from 'react'

export const useCharacters = (url) => {
	const [characters, setCharacters] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				setCharacters(data.results)
				setIsLoading(false)
			})
	}, [url])

	return { characters, isLoading }
}
