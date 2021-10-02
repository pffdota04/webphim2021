const initialState = {
  unlockList: {},
  watchLater: {},
};

const userList = (state = initialState, action) => {
  switch (action.type) {
    case "SET_UNLOCK_DATA": {
      return {
        ...state,
        unlockList: action.payload,
      };
    }
    case "SET_LATER_DATA": {
      return {
        ...state,
        watchLater: action.payload,
      };
    }
    default:
      return state;
  }
};

export default userList;
