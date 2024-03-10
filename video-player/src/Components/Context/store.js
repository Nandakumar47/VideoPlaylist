import React, { useReducer } from "react";
import { initialState, videoPlayerReducer } from "./videoPlayerReducer";

const VideoPlayerContext = React.createContext({});

export const useVideoPlayerContext = () => {
  const context = React.useContext(VideoPlayerContext);
  return context;
};
export const VideoPlayerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(videoPlayerReducer, initialState);
  return (
    <VideoPlayerContext.Provider value={{ state, dispatch }}>
      {children}
    </VideoPlayerContext.Provider>
  );
};
