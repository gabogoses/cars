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

export const deleteStation = id => dispatch => {
  axios.delete(`/stations/${id}`).then(res =>
    dispatch({
      type: DELETE_STATION,
      payload: id
    })
  );
};

export const addStation = stationName => dispatch => {
  dispatch(setStationLoading());
  axios.post("/stations", stationName).then(res =>
    dispatch({
      type: ADD_STATION,
      payload: stationName
    })
  );
};

export const setStationLoading = () => {
  return {
    type: STATIONS_LOADING
  };
};
