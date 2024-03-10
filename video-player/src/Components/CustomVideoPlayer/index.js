import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import VideoController from "./VideoController";
import { useVideoPlayerContext } from "../Context/store";
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
  const [showVolume, setShowVolume] = useState(true);
  const { state, dispatch } = useVideoPlayerContext();

  useEffect(() => {
    const video = videoRef.current;
    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };
    setIsPlaying(true);
    video.volume = 0;
    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [videoRef, state.selectedVideo]);
  useEffect(() => {
    const handleKeyPress = (evt) => {
      switch (evt.code) {
        case "Space":
          evt.preventDefault();
          isPlaying ? handlePause() : handlePlay();
          break;
        case "ArrowRight":
          evt.preventDefault();
          videoRef.current.currentTime += 5;
          break;
        case "ArrowLeft":
          evt.preventDefault();
          videoRef.current.currentTime -= 5;
          break;
        case "ArrowUp":
          evt.preventDefault();
          if (videoRef.current.volume + 0.01 < 1) {
            setIsMuted(false);
            videoRef.current.volume += 0.01;
            setVolume(videoRef.current.volume + 0.01);
          }
          break;
        case "ArrowDown":
          evt.preventDefault();
          if (videoRef.current.volume - 0.01 > 0) {
            videoRef.current.volume -= 0.01;
            setVolume(videoRef.current.volume - 0.01);
          }
          break;
        default:
          break;
      }
    };
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isPlaying, state.selectedVideo]);
  useEffect(() => {
    setShowVolume(true);
    const handleVolumeChange = () => {
      setShowVolume(false);
    };
    const id = setTimeout(handleVolumeChange, 500);
    return () => {
      clearTimeout(id);
    };
  }, [volume]);
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
        {showVolume ? (
          <span
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "60px",
              height: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "none",
              color: "white",
            }}
          >
            <span
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                opacity: 0.5,
                background: "black",
              }}
            ></span>
            <p
              style={{
                opacity: 1,
                position: "relative",
                zIndex: 1,
                color: "white",
              }}
            >
              {Math.round((volume / 1) * 100)}%
            </p>
          </span>
        ) : null}
        <video
          key={
            state?.selectedVideo?.sources?.length
              ? state?.selectedVideo?.sources[0]
              : ""
          }
          width="100%"
          height="100%"
          ref={videoRef}
          muted={isMuted}
          autoPlay
          onClick={() => {
            isPlaying ? handlePause() : handlePlay();
          }}
        >
          <source
            src={
              state?.selectedVideo?.sources?.length
                ? state?.selectedVideo?.sources[0]
                : ""
            }
            type="video/mp4"
          />
        </video>
      </VideoOuterDiv>
      <VideoController
        duration={videoRef?.current?.duration ? videoRef.current.duration : 0}
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
