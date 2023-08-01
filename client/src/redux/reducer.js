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
  original_breeds: [],
  tempFilterOn: false,
  origFilterOn: false,
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
        original_breeds: action.payload,
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

    case SORT_BY:
      // Las variables globales tempFilterOn y origFilterOn se inicializan en false. Cada vez que el usuario activa filterByTemp
      // la variable se modifica a true, e igualmente ocurre para filterByOrigin. De esta forma le podemos indicar a sortBY cual
      // de los dos filtrados va a ordenar. Si ninguno de los dos filtros es activado, ordenara todas las breeds

      let currFilter = [...state.original_breeds];
      if (state.tempFilterOn) currFilter = [...state.filter_temperaments];
      if (state.origFilterOn) currFilter = [...state.filter_origin];

      currFilter.sort((a, b) => {
        if (action.payload === "A-Z") {
          return 1;
        } else if (action.payload === "Z-A") {
          return -1;
        } else if (action.payload === "Lighter to Heavier") {
          return a.avgWeight - b.avgWeight;
        } else if (action.payload === "Heavier to Lighter") {
          return b.avgWeight - a.avgWeight;
        } else {
          return 0;
        }
      });

      return {
        ...state,
        breeds: currFilter,
      };
    case FILTER_BY_TEMP:
      state.tempFilterOn = true;
      state.origFilterOn = false;

      // includes matchea un substring dentro de un string. action.payload trae el substring que
      // corresponde a una sola palabra de temperamento. includes lo busca dentro de los temperamentos
      // existentes de las breeds que corresponden a strings con varias palabras
      if (action.payload === "All") {
        return { ...state, breeds: state.original_breeds };
      }
      const filterByTemp = state.original_breeds.filter((breed) =>
        breed.temperament.includes(action.payload)
      );
      return {
        ...state,
        breeds: filterByTemp,
        filter_temperaments: filterByTemp, // Guarda el primer filtrado para ser utilizado por sortBy
      };
    case FILTER_BY_ORIGIN:
      state.tempFilterOn = false;
      state.origFilterOn = true;

      // Aplicando la misma logica que en el back con la ruta GET /dogs/:id, si el id recibido (que es un string)
      // es convertible a un int con la funcion Number, entonces su origen es de la API. Si no puede ser
      // convertido a numero, es porque tiene un id generado por la base de datos, y entonce ese es su origen.
      if (action.payload === "All") {
        return { ...state, breeds: state.original_breeds };
      }
      if (action.payload === "API") {
        const filterByAPI = state.original_breeds.filter((breed) =>
          Number(breed.id)
        );
        return {
          ...state,
          breeds: filterByAPI,
          filter_origin: filterByAPI, // Guarda el primer filtrado para ser utilizado por sortBy
        };
      }
      if (action.payload === "Created by User") {
        const filterByDatabase = state.original_breeds.filter(
          (breed) => !Number(breed.id)
        );
        return {
          ...state,
          breeds: filterByDatabase,
          filter_origin: filterByDatabase, // Guarda el primer filtrado para ser utilizado por sortBy
        };
      }
      break;

    default:
      return { ...state };
  }
};

export default rootReducer;
