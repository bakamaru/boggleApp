import { createBrowserHistory } from 'history';
import configureStore from './configureStore';
import { ApplicationState } from './index';
// Create browser history to use in the Redux store
//const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href')!;
const history = createBrowserHistory({ basename: "/" });
// Get the application-wide store instance, prepopulating with state from the server where available.
const initialState = ApplicationState;//(window).initialReduxState;
const store = configureStore(history, initialState);
export default store;