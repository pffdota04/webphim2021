export const setUserData = (data) => {
  return {
    type: "SET_USER_DATA",
    payload: data,
  };
};

export const setUserDataDetail = (data) => {
  return {
    type: "SET_USER_DATA_DETAIL",
    payload: data,
  };
};