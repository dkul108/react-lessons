import { createStore,applyMiddleware } from 'redux'
import {rootReducer} from '../Reducer/index'

export default function configureStore(initialState) {
    return createStore(rootReducer);
}