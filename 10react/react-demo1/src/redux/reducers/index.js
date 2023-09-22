import userReducer from "./useReducer";
import countReducer from "./countReducer";
import tabReducer from './tabReducer'
import goodReducer from './goodReducer'
import { combineReducers } from "redux";

export default combineReducers({
  userStore: userReducer,
  countStore: countReducer,
  tabStore:tabReducer,
  goodStore:goodReducer,
});
