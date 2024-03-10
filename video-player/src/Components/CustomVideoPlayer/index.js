import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import VideoController from "./VideoController";
const VideoPLayerOuterDiv = styled.div((props) => ({
  //   background: "transparent",
  //   zIndex: 9999,
  //   position: "relative",
  //   ...(props.isFull && {
  //     width: "100vw",
  //     height: "100vh",
  //     zIndex: 9999,
  //     position: "relative",
  //   }),
  borderRadius: "16px",
  // background: "#ffffff",
  // boxShadow: "20px 20px 56px #d9d9d9, -20px -20px 56px #ffffff",
  border: "1px solid lightgrey",
  padding: "16px",
  paddingBottom: "8px",
}));

const VideoOuterDiv = styled.div({
  position: "relative",
});

const CustomVideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef();
  const outerDivRef = useRef();
  const [currentTime, setCurrentTime] = useState(0);
  const [speed, setSpeed] = useState("1");
  const [showVolumeBar, setShowVolumeBar] = useState(false);
  const [volume, setVolume] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  useEffect(() => {
    const video = videoRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    if (video) {
      handlePlay();
      video.addEventListener("timeupdate", handleTimeUpdate);
    }

    return () => {
      if (video) {
        video.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, []);

  const handlePause = () => {
    setIsPlaying(false);
    if (showVolumeBar) {
      setShowVolumeBar(false);
    }
    videoRef.current.pause();
  };

  const handlePlay = () => {
    setIsPlaying(true);
    if (showVolumeBar) {
      setShowVolumeBar(false);
    }
    videoRef.current.play();
  };
  const handleSpeedChange = (e) => {
    setSpeed(e.target.value);
    videoRef.current.playbackRate = Number(e.target.value);
  };
  const handleSeek = (event) => {
    if (videoRef.current) {
      setCurrentTime(event.target.value);
      videoRef.current.currentTime = event.target.value;
    }
  };
  const handleVolumeChange = (evt) => {
    setVolume(evt.target.value);
    if (videoRef.current) {
      if (isMuted) {
        setIsMuted(false);
      }
      videoRef.current.volume = parseFloat(evt.target.value);
    }
  };
  const toggleFullScreen = () => {
    if (outerDivRef.current) {
      if (!document.fullscreenElement) {
        setIsFullScreen(true);
        outerDivRef.current.requestFullscreen().catch((err) => {
          console.log(
            `Error attempting to enable full-screen mode: ${err.message}`
          );
        });
      } else {
        if (document.exitFullscreen) {
          setIsFullScreen(false);

          document.exitFullscreen();
        }
      }
    }
  };
  return (
    <VideoPLayerOuterDiv ref={outerDivRef} $isFull={isFullScreen}>
      <VideoOuterDiv>
        <video
          width="100%"
          height="100%"
          ref={videoRef}
          muted={isMuted}
          onClick={() => {
            isPlaying ? handlePause() : handlePlay();
          }}
        >
          <source
            src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4"
            type="video/mp4"
          />
        </video>
      </VideoOuterDiv>
      <VideoController
        duration={videoRef.current ? videoRef.current.duration : 0}
        isPlaying={isPlaying}
        handlePause={handlePause}
        handlePlay={handlePlay}
        currentTime={currentTime}
        setShowVolumeBar={setShowVolumeBar}
        showVolumeBar={showVolumeBar}
        volume={volume}
        handleVolumeChange={handleVolumeChange}
        handleSpeedChange={handleSpeedChange}
        speed={speed}
        handleSeek={handleSeek}
      />
    </VideoPLayerOuterDiv>
  );
};

export default CustomVideoPlayer;
