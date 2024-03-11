import React from "react";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import styled from "styled-components";
const VolumeBar = styled.div({
  padding: "0 8px",
  transition: "all 0.3s ease-out",
  display: "flex",
});
function VideoVolume(props) {
  const { setShowVolumeBar, showVolumeBar, volume, handleVolumeChange } = props;
  return (
    <div
      style={{ display: "flex", alignItems: "center" }}
      onMouseLeave={() => {
        setShowVolumeBar(false);
      }}
    >
      <button onMouseEnter={() => setShowVolumeBar(true)}>
        <VolumeUpIcon />
      </button>
      {showVolumeBar ? (
        <VolumeBar>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            style={{ cursor: "pointer" }}
            onChange={handleVolumeChange}
          />
        </VolumeBar>
      ) : null}
    </div>
  );
}

export default VideoVolume;
