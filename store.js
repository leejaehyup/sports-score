import {createStore, applyMiddleware, compose} from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";

const initialState = {};

const middleWare = [thunk];

// **** 리덕스 개발자도구 적용
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleWare))
);
export default store;
