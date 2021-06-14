import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.scss';
import Layout from './containers/Layout/Layout';
import { HomePage } from './pages/HomePage/HomePage';
import ZekrPage from './pages/ZekrPage/ZekrPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { ZekrCategoryPage } from './pages/ZekrCategoryPage/ZekrCategoryPage';
import { configureStore } from './store/store';
import { Provider } from 'react-redux';
import { ZekrCounter } from './pages/ZekrCounter/ZekrCounter';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';

function App() {
	const store = configureStore();

	useEffect(() => {
		// here we are checking if we are serving from myzerk.com or github?
		console.log('App.useEffect');
	}, []);

	return (
		<Provider store={store}>
			<BrowserRouter>
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
