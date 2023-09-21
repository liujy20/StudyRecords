import userReducer from "./useReducer";
import countReducer from "./countReducer";
import tabReducer from './tabReducer'
import { combineReducers } from "redux";

export default combineReducers({
  userStore: userReducer,
  countStore: countReducer,
  tabStore:tabReducer,
});
