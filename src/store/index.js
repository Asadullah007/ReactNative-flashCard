import { combineReducers, createStore, applyMiddleware } from "redux";
import deckReducer from './Reducers/deckReducer'
import thunk from "redux-thunk";
import logger from 'redux-logger'
const rootReducer = combineReducers( { deckReducer } );
function configureStore() {
    return createStore( rootReducer, {}, applyMiddleware( thunk ) )
}

const store = configureStore();
export default store;