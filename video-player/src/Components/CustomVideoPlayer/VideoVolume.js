import React from "react";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
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
        <div
          style={{
            padding: "0 8px",
            transition: "all 0.3s ease-out",
            display: "flex",
          }}
        >
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            defaultValue="1"
            value={volume}
            style={{ cursor: "pointer", transition: "all 0.3s ease-out" }}
            onChange={handleVolumeChange}
          />
        </div>
      ) : null}
    </div>
  );
}

export default VideoVolume;
