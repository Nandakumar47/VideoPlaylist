import React from "react";

function VideoFooter() {
  const temp = {
    id: "8",
    description:
      "Sintel is an independently produced short film, initiated by the Blender Foundation as a means to further improve and validate the free/open source 3D creation suite Blender. With initial funding provided by 1000s of donations via the internet community, it has again proven to be a viable development model for both open 3D technology as for independent animation film.\nThis 15 minute film has been realized in the studio of the Amsterdam Blender Institute, by an international team of artists and developers. In addition to that, several crucial technical and creative targets have been realized online, by developers and artists and teams all over the world.\nwww.sintel.org",
    sources: [
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    ],
    subtitle: "By Blender Foundation",
    thumb: "images/Sintel.jpg",
    title: "Sintel",
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        marginTop: "8px",
      }}
    >
      <div style={{ fontSize: "1.4rem", fontWeight: "600", marginLeft: "8px" }}>
        {temp.title}
      </div>
      <div
        style={{
          fontSize: "0.9rem",
          fontWeight: "400",
          marginLeft: "8px",
          color: "grey",
          marginTop: "-4px",
        }}
      >
        {temp.subtitle}
      </div>
      <div
        style={{
          fontSize: "0.9rem",
          padding: " 16px",
          background: "#efefef",
          borderRadius: "8px ",
        }}
      >
        {temp.description}
      </div>
    </div>
  );
}

export default VideoFooter;
