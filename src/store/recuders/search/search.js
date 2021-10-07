const initialState = {
  searchData: {},
};
const listSearch = (state = initialState, action) => {
  switch (action.type) {
    case "SET_DATA_SEARCH": {
      return {
        ...state,
        searchData: action.payload,
      };
    }
  }
};

export default listSearch;