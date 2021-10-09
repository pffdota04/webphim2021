const initialState = {
  curentUser: { checkUser : "init"},
};

const userData = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_DATA": {
      return {
        ...state,
        curentUser: action.payload,
      };
    }
    default:
      return state;
  }
};

export default userData;
