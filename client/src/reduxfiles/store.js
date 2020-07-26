import {createStore, combineReducers, applyMiddleware} from 'redux'
import userReducer from './user/userReducer'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import songReducer from './song/songReducer'

const rootReducer = combineReducers({
    user: userReducer,
    song: songReducer
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store