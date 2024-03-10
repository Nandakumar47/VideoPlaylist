import React from "react";

function NavBar() {
  return (
    <div
      style={{
        height: "60px",
        background: "#ECB159",
        color: "#FEFBF6",
        fontSize: "1.5rem",
        fontWeight: "600",
        paddingLeft: "32px",
        display: "flex",
      }}
    >
      {/* <h2>Rigi</h2> */}
      <img
        src="https://app.rigi.club/wp-content/themes/Rigi/assets/img/logo.svg"
        alt=""
        style={{ width: "80px" }}
      />
    </div>
  );
}

export default NavBar;
