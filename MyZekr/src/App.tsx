import React from 'react';
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

		// <div className="App">
		//   <header className="App-header">
		//     <img src={logo} className="App-logo" alt="logo" />
		//     <p>
		//       Edit <code>src/App.tsx</code> and save to reload.
		//     </p>
		//     <a
		//       className="App-link"
		//       href="https://reactjs.org"
		//       target="_blank"
		//       rel="noopener noreferrer"
		//     >
		//       Learn React
		//     </a>
		//   </header>
		// </div>
	);
}

export default App;
