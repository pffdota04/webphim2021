import listTatCa from "./listPhim/tatca";
import listUser from "./userList/userList";
// import listSearch from "./search/search";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  listTatCa,
  listUser,
  // listSearch,
});

export default rootReducer;