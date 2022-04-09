/* @jsx h */
import { h, render } from 'preact';
import './assets/reset.css';
import App from './components/App';
import { Provider } from './reducers';

function Main() {
	return (
		<Provider>
			<App />
		</Provider>
	);
}

render(<Main />, document.body);
