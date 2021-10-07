export const setListHome = (data) => {
  return {
    type: "SET_DATA_HOME",
    payload: data,
  };
};

export const setListTatCa = (data) => {
  return {
    type: "SET_DATA",
    payload: data,
  };
};

export const setListMovie = (data) => {
  return {
    type: "SET_DATA_MOVIE",
    payload: data,
  };
};

export const setListSeries = (data) => {
  return {
    type: "SET_DATA_SERIES",
    payload: data,
  };
};

export const addListHome = (data) => {
  return {
    type: "ADD_DATA_HOME",
    payload: data,
  };
};

export const addListTatCa = (data) => {
  return {
    type: "ADD_DATA",
    payload: data,
  };
};

export const addListMovie = (data) => {
  return {
    type: "ADD_DATA_MOVIE",
    payload: data,
  };
};

export const addListSeries = (data) => {
  return {
    type: "ADD_DATA_SERIES",
    payload: data,
  };
};

export const setListSearch = (data) => {
  return {
    type: "SET_DATA_SEARCH",
    payload: data,
  };
};


// export default {
//   setListFilm,
//   setListTatCa,
//   setListMovie,
//   setListSeries,
// };
