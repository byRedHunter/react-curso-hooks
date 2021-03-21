import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import { addTheme } from '../utils/darkLightMode'

const lightTheme = {
	'--color-light': '#f7f7f7',
	'--color-dark': '#100303',
	'--color-primary': '#72e7ca',
	'--color-secondary': '#95389e',
	'--color-shadow': '#10030361',
}
const darkTheme = {
	'--color-light': '#323232',
	'--color-dark': '#f7f7f7',
	'--color-primary': '#ff1e56',
	'--color-secondary': '#ffac41',
	'--color-shadow': '#f7f7f738',
}

export const Header = () => {
	//const [darkMode, setDarkMode] = useState(false)
	const { theme, setTheme } = useContext(ThemeContext)

	const handleClick = () => {
		/* setDarkMode(!darkMode)
		if (!darkMode) {
			addTheme(darkTheme)
		} else {
			addTheme(lightTheme)
		} */
		setTheme(!theme)
		if (!theme) {
			addTheme(darkTheme)
		} else {
			addTheme(lightTheme)
		}
	}

	return (
		<div className='container header'>
			<h1 className='header-title'>ReactHooks</h1>

			<button className='header-button' type='button' onClick={handleClick}>
				{theme ? 'DarkMode' : 'Light Mode'}
			</button>
		</div>
	)
}
