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
import { redirectToMyZekrCom } from './common/myZekrDomainRedirect';

function App() {
	const store = configureStore();

	useEffect(() => {
		//const history = createBrowserHistory();
		// // Initialize google analytics page view tracking
		// history.listen(location => {
		// ReactGA.set({ page: location.pathname }); // Update the user's current page
		// ReactGA.pageview(location.pathname); // Record a pageview for the given page
		// });
	}, []);

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
function createBrowserHistory() {
	throw new Error('Function not implemented.');
}
