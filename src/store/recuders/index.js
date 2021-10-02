// import listPhim from "./listphim";
import listTatCa from "./listPhim/tatca";
import listUser from "./userList/userList";

// import listPhimLe from "./listPhim/phimle";
// import listPhimBo from "./listPhim/phimbo";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  // listPhim,
  listTatCa,
  listUser,
  // listPhimLe,
  // listPhimBo,
});

export default rootReducer;
