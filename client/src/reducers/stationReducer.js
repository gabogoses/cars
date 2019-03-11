import {
  GET_STATIONS,
  ADD_STATION,
  DELETE_STATION,
  STATIONS_LOADING
} from "../actions/types";

const initialState = {
  stations: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_STATIONS:
      return {
        ...state,
        stations: action.payload,
        loading: false
      };
    case DELETE_STATION:
      return {
        ...state,
        stations: state.stations.filter(
          station => station._id !== action.payload
        )
      };
    case ADD_STATION:
      return {
        ...state,
        stations: [action.payload, ...state.stations]
      };
    case STATIONS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
