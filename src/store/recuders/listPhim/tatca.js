const initialState = {
  filmData: {},
  data: {},
  dataTatca: {},
  dataMovie: {},
  dataSeries: {},
};

const listTatCa = (state = initialState, action) => {
  let addList = {};
  switch (action.type) {
    case "SET_FILM_DATA": {
      return {
        ...state,
        filmData: action.payload,
      };
    }
    case "SET_DATA":
      return {
        ...state,
        data: action.payload,
      };
    case "SET_DATA_TATCA":
      return {
        ...state,
        dataTatca: action.payload,
      };
    case "SET_DATA_MOVIE":
      return {
        ...state,
        dataMovie: action.payload,
      };
    case "SET_DATA_SERIES": {
      return {
        ...state,
        dataSeries: action.payload,
      };
    }
    case "ADD_DATA":
      return {
        ...state,
        data: [...state.data, ...action.payload],
      };
    case "ADD_DATA_MOVIE":
      return {
        ...state,
        dataMovie: [...state.dataMovie, ...action.payload],
      };
    case "ADD_DATA_SERIES":
      return {
        ...state,
        dataSeries: [...state.dataSeries, ...action.payload],
      };
    default:
      return state;
  }
};

export default listTatCa;
