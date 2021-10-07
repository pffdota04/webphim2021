const initialState = {
  homeData: {},
  data: {},
  dataTatca: {},
  dataMovie: {},
  dataSeries: {},
  searchData: {},
};

const listTatCa = (state = initialState, action) => {
  switch (action.type) {
    case "SET_DATA_HOME": {
      return {
        ...state,
        homeData: action.payload,
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
    case "ADD_HOME_DATA":
      return {
        ...state,
        data: [...state.homeData, ...action.payload],
      };
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
    case "SET_DATA_SEARCH": {
      return {
        ...state,
        searchData: action.payload,
      };
    }
    default:
      return state;
  }
};

export default listTatCa;
