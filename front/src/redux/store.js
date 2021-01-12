import {applyMiddleware, createStore} from 'redux';
import ReduxThunk from 'redux-thunk';
import {rootReducer} from './reducer/rootReducer';
import {composeWithDevTools} from 'redux-devtools-extension';

export const store = createStore(
    rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk)),
);
