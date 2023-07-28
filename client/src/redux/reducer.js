import {
  GET_BREED_BY_NAME,
  GET_ALL_BREEDS,
  GET_TEMPERAMENTS,
  FILTER_BY_TEMP,
  FILTER_BY_ORIGIN,
  SORT_BY,
} from "./actions/types";

const initialState = {
  breeds: [],
  temperaments: [],
  filter_temperaments: [],
  filter_origin: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_BREEDS:
      // filter_temperaments y filter_origin guardan todas las breeds para ser usados en los filtros
      return {
        ...state,
        breeds: action.payload,
        filter_temperaments: action.payload,
        filter_origin: action.payload,
      };
    case GET_BREED_BY_NAME:
      return {
        ...state,
        breeds: action.payload,
      };
    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload,
      };
    case FILTER_BY_TEMP:
      if (action.payload === "All") {
        return { ...state, breeds: state.filter_temperaments };
      }
      return {
        // includes matchea un substring dentro de un string. action.payload trae el substring que
        // corresponde a una sola palabra de temperamento. includes lo busca dentro de los temperamentos
        // existentes de las breeds que corresponden a strings con varias palabras
        ...state,
        breeds: state.filter_temperaments.filter((breed) =>
          breed.temperament.includes(action.payload)
        ),
      };
    case FILTER_BY_ORIGIN:
      // Aplicando la misma logica que en el back con la ruta GET /dogs/:id, si el id recibido (que es un string)
      // es convertible a un int con la funcion Number, entonces su origen es de la API. Si no puede ser
      // convertido a numero, es porque tiene un id generado por la base de datos, y entonce ese es su origen.
      if (action.payload === "All") {
        return { ...state, breeds: state.filter_origin };
      }
      if (action.payload === "API") {
        return {
          ...state,
          breeds: state.filter_origin.filter((breed) => Number(breed.id)),
        };
      }
      if (action.payload === "Created by User") {
        return {
          ...state,
          breeds: state.filter_origin.filter((breed) => !Number(breed.id)),
        };
      }
      break;

    case SORT_BY:
      let copy = state.breeds.sort((a, b) => {
        console.log(action.payload);
        if (action.payload === "A-Z") {
          return a.name - b.name;
        } else if (action.payload === "Z-A") {
          return b.name - a.name;
        } else if (action.payload === "Lighter to Heavier") {
          let weightAvg1 =
            (Number(a.weight.split(" - ")[0]) +
              Number(a.weight.split(" - ")[1])) /
            2;
          let weightAvg2 =
            (Number(b.weight.split(" - ")[0]) +
              Number(b.weight.split(" - ")[1])) /
            2;
          return weightAvg1 - weightAvg2;
        } else {
          return 0;
        }
      });
      console.log(copy);
      return {
        ...state,
        breeds: copy,
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
