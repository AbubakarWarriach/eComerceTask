import { createStore, applyMiddleware, combineReducers } from 'redux';
import ThunkMiddleware from 'redux-thunk'
import ProductReducer from './ProductReducer'

const rootReducer = combineReducers({
    ProductReducer
});
const Store = createStore(rootReducer, applyMiddleware(ThunkMiddleware));

export default Store;