const initialState = {
  curentUser: { checkUser: "init" },
  userDetail: { checkUser: "init" },
};

const userData = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_DATA": {
      return {
        ...state,
        curentUser: action.payload,
      };
    }
    case "SET_USER_DATA_DETAIL": {
      return {
        ...state,
        userDetail: action.payload,
      };
    }
    default:
      return state;
  }
};

export default userData;
