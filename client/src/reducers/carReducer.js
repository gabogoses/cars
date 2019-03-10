import {
  GET_CARS,
  ADD_CAR,
  DELETE_CAR,
  UPDATE_CAR,
  CARS_LOADING
} from "../actions/types";

const initialState = {
  cars: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CARS:
      return {
        ...state,
        cars: action.payload,
        loading: false
      };
    case DELETE_CAR:
      return {
        ...state,
        cars: state.cars.filter(car => car._id !== action.payload)
      };
    case ADD_CAR:
      return {
        ...state,
        cars: [action.payload, ...state.cars]
      };
    case CARS_LOADING:
      return {
        ...state,
        loading: true
      };
    case UPDATE_CAR:
      return state.map(car => {
        if (car.id === action.id) {
          return {
            ...car,
            name: action.data.newName,
            availability: action.data.newAvailability
          };
        } else return car;
      });
    default:
      return state;
  }
}
