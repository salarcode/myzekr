import { useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.scss';
import ReactGA from 'react-ga';
import Layout from './containers/Layout/Layout';
import { HomePage } from './pages/HomePage/HomePage';
import ZekrPage from './pages/ZekrPage/ZekrPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { ZekrCategoryPage } from './pages/ZekrCategoryPage/ZekrCategoryPage';
import { configureStore } from './store/store';
import { Provider } from 'react-redux';
import { ZekrCounter } from './pages/ZekrCounter/ZekrCounter';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import { createBrowserHistory } from 'history';

function App() {
	const store = configureStore();

	useEffect(() => {
		addFontStyleSheets();

		const history = createBrowserHistory();
		// Initialize google analytics page view tracking
		ReactGA.initialize('G-9BKCVXCGTY', { testMode: process.env.NODE_ENV === 'test' });
		history.listen((location) => {
			ReactGA.set({ page: location.pathname }); // Update the user's current page
			ReactGA.pageview(location.pathname); // Record a pageview for the given page
		});
	}, []);

	/**
	 * Add fonts css to the page dynamically
	 */
	function addFontStyleSheets() {
		var cssFile = document.createElement('link');
		cssFile.rel = 'stylesheet';
		cssFile.href = '/assets/css/fonts.css';
		cssFile.setAttribute('id', 'fonts-stylesheet');
		document.head.appendChild(cssFile);
	}
	function reAddFontStyleSheets() {
		var fontsStylesheet = document.getElementById('fonts-stylesheet');
		if (fontsStylesheet) {
			fontsStylesheet.remove();
			console.log('removed fonts-stylesheet');
		} else {
			console.log('fonts-stylesheet not found!');
		}
		addFontStyleSheets();
	}
	window.addEventListener('offline', () => {
		// Update your UI to reflect that there's no connection.
		console.log('Network is offline!');
		reAddFontStyleSheets();
	});

	window.addEventListener('online', () => {
		// Update your UI to reflect that the connection is back.
		console.log('Network is online!');
	});

	return (
		<Provider store={store}>
			<BrowserRouter basename={process.env.PUBLIC_URL}>
				<Layout>
					<Switch>
						<Redirect path="/home" to="/" />
						<Route exact path="/" component={HomePage} />
						<Route path="/zekr/:zekrUid" component={ZekrPage} />
						<Route path="/zekr-list/:categoryUid" component={ZekrCategoryPage} />
						<Route path="/counter" component={ZekrCounter} />
						<Route path="/favorites" component={FavoritesPage} />
						<Route component={NotFoundPage} />
					</Switch>
				</Layout>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
