import React from "react";
import styled from "styled-components";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { formatTime } from "../Utils";
import VideoPlaySpeed from "./VideoPlaySpeed";
import VideoVolume from "./VideoVolume";
const Container = styled.div({
  display: "flex",
  alignItems: "center",
  height: "40px",
  gap: "8px",
  marginTop: "8px",
});

const VideoController = (props) => {
  const {
    isPlaying,
    handlePause,
    handlePlay,
    currentTime,
    setShowVolumeBar,
    showVolumeBar,
    volume,
    handleVolumeChange,
    handleSpeedChange,
    speed,
    handleSeek,
    duration,
  } = props;
  return (
    <Container>
      {isPlaying ? (
        <button onClick={handlePause}>
          <PauseIcon style={{ cursor: "pointer" }} />
        </button>
      ) : (
        <button onClick={handlePlay}>
          <PlayArrowIcon style={{ cursor: "pointer" }} />
        </button>
      )}
      <input
        type="range"
        id="vol"
        name="vol"
        min="0"
        value={currentTime}
        max={duration}
        style={{ flexBasis: "100%", cursor: "pointer" }}
        onChange={handleSeek}
      />
      <p>
        {formatTime(currentTime)}/{formatTime(duration)}
      </p>
      <VideoVolume
        setShowVolumeBar={setShowVolumeBar}
        showVolumeBar={showVolumeBar}
        volume={volume}
        handleVolumeChange={handleVolumeChange}
      />
      <VideoPlaySpeed speed={speed} handleSpeedChange={handleSpeedChange} />
      {/* <button onClick={toggleFullScreen}>
          <FullscreenIcon />
        </button> */}
    </Container>
  );
};

export default VideoController;
