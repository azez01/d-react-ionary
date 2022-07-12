import userReducer from './userReducer'
import { combineReducers } from 'redux'
import statusReducer from './statusReducers'
import userIDReducer from './userIDReducer'

const allReducers = combineReducers({
  user: userReducer,
  status: statusReducer,
  id: userIDReducer
})

export default allReducers