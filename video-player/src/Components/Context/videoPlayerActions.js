export const setSelectedVideo = (dispatch, data) => {
  dispatch({ type: "SET_SELECTED_VIDEO", payload: data });
};
export const addCurrentTime = (dispatch, data) => {
  dispatch({ type: "SET_CURRENT_TIME", payload: data });
};
