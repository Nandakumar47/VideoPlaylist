import React, { useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import styled from "styled-components";
const PlayCardContainer = styled.div({
  display: "flex",
  transition: " transform 0.2s ease-in-out",
  marginBottom: "8px",
});
const VideoPLayIndicator = styled.div({
  position: "absolute",
  bottom: "0px",
  background: " rgba(0, 0, 0, 0.5)",
  width: "100%",
  transition: "all 0.5s ease 0s",
  opacity: 1,
  fontSize: "16px",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1,
  color: "white",
});
const PlayIconContainer = styled.span({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  background: "#ddd5d5",
  opacity: "0.7",
  padding: "0px 8px",
  borderRadius: "8px",
});
const VideoDetailsContainer = styled.div({
  marginLeft: "8px",
  marginTop: "8px",
  width: "160px",
});
function PLaylistCard(props) {
  const { title, description, subtitle, thumb, isPlaying, index } = props;
  return (
    <PlayCardContainer id={title}>
      {/* <div>{isMouseAbove ? <DragHandleIcon /> : <p>{index + 1}</p>}</div> */}
      <div style={{ width: "140px", position: "relative" }}>
        {isPlaying ? (
          <VideoPLayIndicator>Playing</VideoPLayIndicator>
        ) : (
          <PlayIconContainer>
            <PlayArrowIcon style={{ width: "28px", height: "28px" }} />
          </PlayIconContainer>
        )}
        <img src={thumb} alt="Thumbnail" />
      </div>
      <VideoDetailsContainer>
        <h2 style={{ fontWeight: "600" }} className="md:text-base sm:text-xs">
          {title}
        </h2>
        <p style={{ color: "grey" }} className="text-xs">
          {subtitle}
        </p>
      </VideoDetailsContainer>
    </PlayCardContainer>
  );
}

export default PLaylistCard;
