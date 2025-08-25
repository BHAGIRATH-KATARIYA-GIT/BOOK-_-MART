import { configureStore } from '@reduxjs/toolkit'
import userAuthReducer from '../slice/userAuthSlice'

export default configureStore({
  reducer: {
    userAuth: userAuthReducer
  }
})