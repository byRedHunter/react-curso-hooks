export const addTheme = (theme) => {
	const styles = document.documentElement.style
	const customStyles = Object.keys(theme)

	for (const style of customStyles) {
		styles.setProperty(style, theme[style])
	}
}
