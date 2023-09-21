import { legacy_createStore as createStore } from "redux";
import reducer from "./reducers";
// import {  countAdd, userChange } from './actions'


const store = createStore(reducer);
// store.dispatch(countAdd(123))
// store.dispatch(userChange('xxxwg'))
// console.log(store.getState());
export default store