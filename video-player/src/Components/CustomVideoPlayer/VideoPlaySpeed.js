import React from "react";

const VideoPlaySpeed = (props) => {
  const { speed, handleSpeedChange } = props;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <label htmlFor="speed">Speed:</label>
      <select
        name="speed"
        id="speed"
        value={speed}
        style={{ background: "none" }}
        onChange={handleSpeedChange}
      >
        <option value="0.5">0.5x</option>
        <option value="0.75">0.75x</option>
        <option value="1">Normal</option>
        <option value="1.25">1.25x</option>
        <option value="1.50">1.50x</option>
      </select>
    </div>
  );
};

export default VideoPlaySpeed;
