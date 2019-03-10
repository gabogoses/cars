import axios from "axios";
import {
  GET_CARS,
  ADD_CAR,
  DELETE_CAR,
  UPDATE_CAR,
  CARS_LOADING
} from "./types";

export const getCars = () => dispatch => {
  dispatch(setCarsLoading());
  axios.get("/cars").then(res => {
    dispatch({
      type: GET_CARS,
      payload: res.data
    });
  });
};

export const addCar = car => dispatch => {
  axios.post("/cars", car).then(res =>
    dispatch({
      type: ADD_CAR,
      payload: car
    })
  );
};

export const deleteCar = id => dispatch => {
  axios.delete(`/cars/${id}`).then(res =>
    dispatch({
      type: DELETE_CAR,
      payload: id
    })
  );
};

export const setCarsLoading = () => {
  return {
    type: CARS_LOADING
  };
};

export const updateCar = id => {
  return {
    type: UPDATE_CAR,
    payload: id
  };
};
