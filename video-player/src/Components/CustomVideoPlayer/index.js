import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
const VideoPLayerOuterDiv = styled.div({
  //   display: "flex",
});
const VideoController = styled.div({
  display: "flex",
  alignItems: "center",
  height: "40px",
});
const VideoOuterDiv = styled.div({
  position: "relative",
});

const CustomVideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef();
  const [currentTime, setCurrentTime] = useState(0);
  const [speed, setSpeed] = useState("1");
  const [showVolumeBar, setShowVolumeBar] = useState(false);
  const [volume, setVolume] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
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
  // Helper function to format time in seconds to HH:MM:SS format
  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    let formattedTime = "";

    if (hours > 0) {
      formattedTime += `${hours}:`;
    }

    if (minutes < 10 && hours > 0) {
      formattedTime += `0${minutes}:`;
    } else {
      formattedTime += `${minutes}:`;
    }

    if (seconds < 10) {
      formattedTime += `0${seconds}`;
    } else {
      formattedTime += `${seconds}`;
    }

    if (hours === 0 && minutes === 0) {
      formattedTime = `0.${padNumber(seconds)}`;
    }

    return formattedTime;
  };

  // Helper function to pad single digit numbers with leading zeros
  const padNumber = (number) => {
    return number.toString().padStart(2, "0");
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
    debugger;
    if (videoRef.current) {
      if (isMuted) {
        setIsMuted(false);
      }
      videoRef.current.volume = parseFloat(evt.target.value);
    }
  };
  return (
    <VideoPLayerOuterDiv>
      <VideoOuterDiv>
        <video
          width="100%"
          height="400px"
          ref={videoRef}
          autoPlay
          muted={isMuted}
          onClick={() => {
            isPlaying ? handlePause() : handlePlay();
          }}
        >
          <source
            src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4"
            type="video/mp4"
          />
        </video>
      </VideoOuterDiv>
      <VideoController>
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
          value={currentTime || 0}
          max={videoRef.current ? videoRef.current.duration : 0}
          style={{ flexBasis: "100%", cursor: "pointer" }}
          onChange={handleSeek}
        />
        <p>
          {formatTime(currentTime)}/
          {formatTime(videoRef?.current ? videoRef.current.duration : 0)}
        </p>
        <div
          style={{ position: "relative" }}
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
                padding: "8px",
              }}
            >
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                defaultValue="1"
                value={volume}
                style={{ cursor: "pointer" }}
                onChange={handleVolumeChange}
              />
            </div>
          ) : null}
        </div>
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
      </VideoController>
    </VideoPLayerOuterDiv>
  );
};

export default CustomVideoPlayer;
