import { Characters } from './components/Characters'
import { Header } from './components/Header'
import { ThemeProvider } from './context/ThemeContext'

function App() {
	return (
		<ThemeProvider>
			<Header />

			<Characters />
		</ThemeProvider>
	)
}

export default App
