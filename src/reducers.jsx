/* @jsx h */
import { createContext, h } from 'preact';
import { useContext, useMemo, useReducer } from 'preact/hooks';
import font, { initialState } from './reducers/font';

const contextState = createContext();
const contextDispatch = createContext();

export function Provider({ children }) {
	const [state, dispatch] = useReducer(font, initialState);
	return (
		<contextState.Provider value={state}>
			<contextDispatch.Provider value={dispatch}>{children}</contextDispatch.Provider>
		</contextState.Provider>
	);
}

export function useDispatch() {
	return useContext(contextDispatch);
}

export function useState() {
	return useContext(contextState);
}

export function useSelector(cb) {
	const s = useState();
	return useMemo(() => cb(s || {}), [cb, s]);
}
