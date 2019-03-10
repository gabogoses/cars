import { combineReducers } from "redux";
import carReducer from "./carReducer";
import stationReducer from "./stationReducer";

export default combineReducers({
  car: carReducer,
  station: stationReducer
});
