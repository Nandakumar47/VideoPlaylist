import React, { useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DragHandleIcon from "@mui/icons-material/DragHandle";
function PLaylistCard(props) {
  const { title, description, subtitle, thumb, isPlaying, index } = props;
  const [isMouseAbove, setIsMouseAbove] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        transition: " transform 0.2s ease-in-out",
        marginBottom: "8px",
      }}
      id={title}
      onMouseEnter={() => {
        setIsMouseAbove(true);
      }}
      onMouseLeave={() => {
        setIsMouseAbove(false);
      }}
    >
      {/* <div>{isMouseAbove ? <DragHandleIcon /> : <p>{index + 1}</p>}</div> */}
      <div style={{ width: "140px", position: "relative" }}>
        {isPlaying ? (
          <div
            style={{
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
            }}
          >
            playing
          </div>
        ) : (
          <span
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              background: "#ddd5d5",
              opacity: "0.7",
              padding: "0px 8px",
              borderRadius: "8px",
            }}
          >
            <PlayArrowIcon style={{ width: "28px", height: "28px" }} />
          </span>
        )}
        <img src={thumb} alt="Thumbnail" />
      </div>
      <div
        style={{
          marginLeft: "8px",
          marginTop: "8px",
          width: "160px",
        }}
      >
        <h2 style={{ fontWeight: "600" }} className="md:text-sm sm:text-xs">
          {title}
        </h2>
        <p style={{ fontSize: "0.8rem" }}>{subtitle}</p>
      </div>
    </div>
  );
}

export default PLaylistCard;
