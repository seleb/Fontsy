import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import reducers from './reducers';
import middleware from './middleware';

const initialState = {};

const store = createStore(
	reducers,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
