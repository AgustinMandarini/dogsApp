import axios from "axios";
import {
  GET_BREED_BY_NAME,
  GET_ALL_BREEDS,
  GET_TEMPERAMENTS,
  FILTER_BY_TEMP,
  FILTER_BY_ORIGIN,
  SORT_BY,
} from "./types";
const REACT_APP_URL_DEV = process.env.REACT_APP_URL_DEV;

const URL = REACT_APP_URL_DEV;

const getAllBreeds = () => {
  const endpoint = `${URL}/dogs`;
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint);
      return dispatch({
        type: GET_ALL_BREEDS,
        payload: data,
      });
    } catch (error) {
      return alert("Unexpected error ocurred while obtaining all breeds.");
    }
  };
};

const getBreedByName = (name) => {
  const endpoint = `${URL}/dogs/search?name=${name}`;
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint);
      return dispatch({
        type: GET_BREED_BY_NAME,
        payload: data,
      });
    } catch (error) {
      return alert("Could not find a breed with that name!");
    }
  };
};

const getTemperaments = () => {
  const endpoint = `${URL}/temperaments`;
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint);
      return dispatch({
        type: GET_TEMPERAMENTS,
        payload: data,
      });
    } catch (error) {
      return alert(
        "Unexpected error ocurred while obtaining all temperaments."
      );
    }
  };
};

const filter_by_temp = (temperament) => {
  return { type: FILTER_BY_TEMP, payload: temperament };
};

const filter_by_origin = (origin) => {
  return { type: FILTER_BY_ORIGIN, payload: origin };
};

const sortBy = (param) => {
  return { type: SORT_BY, payload: param };
};

export {
  getAllBreeds,
  getBreedByName,
  getTemperaments,
  filter_by_temp,
  filter_by_origin,
  sortBy,
};
