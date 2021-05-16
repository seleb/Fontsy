/* @jsx h */
import { h, render } from 'preact';
import { Provider } from 'react-redux';
import './assets/reset.css';
import App from './components/App';
import store from './store';

const Main = () => (
	<Provider store={store}>
		<App />
	</Provider>
);

render(<Main />, document.body);
