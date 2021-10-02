export const setWatchLater = (data) => {
  return {
    type: "SET_LATER_DATA",
    payload: data,
  };
};

export const setUnlockList = (data) => {
  return {
    type: "SET_UNLOCK_DATA",
    payload: data,
  };
};
