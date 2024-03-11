export const initialState = {
  selectedVideo: {},
  previousTimeDurations: {},
};
export const videoPlayerReducer = (state, action) => {
  switch (action.type) {
    case "SET_SELECTED_VIDEO":
      return { ...state, selectedVideo: action.payload };
    case "SET_CURRENT_TIME":
      return {
        ...state,
        previousTimeDurations: {
          ...state.previousTimeDurations,
          ...action.payload,
        },
      };
    default:
      break;
  }
};
