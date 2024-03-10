export const initialState = {
  selectedVideo: {},
};
export const videoPlayerReducer = (state, action) => {
  switch (action.type) {
    case "SET_SELECTED_VIDEO":
      return { ...state, selectedVideo: action.payload };
    default:
      break;
  }
};
