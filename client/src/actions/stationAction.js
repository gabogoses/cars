import axios from "axios";

import {
  GET_STATIONS,
  ADD_STATION,
  DELETE_STATION,
  STATIONS_LOADING
} from "./types";

export const getStations = () => dispatch => {
  dispatch(setStationLoading());
  axios.get("/stations").then(res => {
    dispatch({
      type: GET_STATIONS,
      payload: res.data
    });
  });
};

export const deleteStation = id => {
  return {
    type: DELETE_STATION,
    payload: id
  };
};

export const addStation = station => {
  return {
    type: ADD_STATION,
    payload: station
  };
};

export const setStationLoading = () => {
  return {
    type: STATIONS_LOADING
  };
};
