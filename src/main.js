import { Provider, connect } from 'preact-redux';
import { h, render } from 'preact';

import App from './components/App';
import store from './store';

import './assets/reset.css';

const Main = () => (
	<Provider store={store}>
		<App />
	</Provider>
);

render(<Main />, document.body);
