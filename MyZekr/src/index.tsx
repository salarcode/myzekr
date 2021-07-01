import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import './zekr-material-ui-override.scss';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root'),
);

// https://felixgerschau.com/how-to-make-your-react-app-a-progressive-web-app-pwa/

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
