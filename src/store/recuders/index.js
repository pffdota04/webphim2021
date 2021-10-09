import listTatCa from "./listPhim/tatca";
import listUser from "./userList/userList";
import userData from "./userList/user";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  listTatCa,
  listUser,
  userData,
});

export default rootReducer;