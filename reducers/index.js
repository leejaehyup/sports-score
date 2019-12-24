import {combineReducers} from "redux";
import scoreGameReducer from "./scoreGame";

export default combineReducers({
  scoreGame: scoreGameReducer
});
