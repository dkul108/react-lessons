import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk';
import {rootReducer} from '../Reducer'

export default function configureStore(initialState) {
    const createStoreWithMiddleware = applyMiddleware(
        thunk
    )(createStore);
    const store = createStoreWithMiddleware(rootReducer);
    return store;
}