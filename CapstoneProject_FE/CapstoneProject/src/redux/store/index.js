import { combineReducers, configureStore } from '@reduxjs/toolkit'
import profileReducer from '../reducers/profile'
import buildReducer from '../reducers/build'

const mainReducer = combineReducers({
    profile: profileReducer,
    build: buildReducer
})


const store = configureStore({
reducer: mainReducer,
})
export default store
