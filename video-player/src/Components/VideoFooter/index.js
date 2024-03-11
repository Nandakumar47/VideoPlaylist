import React from "react";
import styled from "styled-components";
import { useVideoPlayerContext } from "../Context/store";
const TitleDiv = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  marginTop: "8px",
});
const SubTitleDiv = styled.div({
  fontSize: "0.9rem",
  fontWeight: "400",
  marginLeft: "8px",
  color: "grey",
  marginTop: "-4px",
});
const DescriptionDiv = styled.div({
  fontSize: "0.9rem",
  padding: " 16px",
  background: "#efefef",
  borderRadius: "8px ",
});
function VideoFooter() {
  const { state, dispatch } = useVideoPlayerContext();

  return (
    <TitleDiv>
      <div style={{ fontSize: "1.4rem", fontWeight: "600", marginLeft: "8px" }}>
        {state?.selectedVideo?.title}
      </div>
      <SubTitleDiv>{state?.selectedVideo?.subtitle}</SubTitleDiv>
      <DescriptionDiv>{state?.selectedVideo?.description}</DescriptionDiv>
    </TitleDiv>
  );
}

export default VideoFooter;
