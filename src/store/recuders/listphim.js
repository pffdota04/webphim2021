const initialState = {
  homeData: {},
  singleData: {},
  seriesData: {},
};

const listPhim = (state = initialState, action) => {
  switch (action.type) {
    case "SET_HOME":
      return {
        ...state,
        homeData: action.payload,
      };
    case "SET_PHIM_LE":
      return {
        ...state,
        singleData: action.payload,
      };
    case "SET_PHIM_BO":
      return {
        ...state,
        seriesData: action.payload,
      };
    default:
      return state;
  }
};

export default listPhim;
