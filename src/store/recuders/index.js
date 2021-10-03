import listTatCa from "./listPhim/tatca";
import listUser from "./userList/userList";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  listTatCa,
  listUser,
});

export default rootReducer;
