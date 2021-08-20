import { configureStore } from '@reduxjs/toolkit'
import rootreducer from './reducers/weatherReducer'

const Store = configureStore({
    reducer: rootreducer
})
export default Store;