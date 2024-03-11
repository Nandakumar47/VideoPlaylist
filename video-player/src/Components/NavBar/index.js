import React from "react";
import styled from "styled-components";
const NavBarContainer = styled.div({
  height: "60px",
  background: "#ECB159",
  color: "#FEFBF6",
  fontSize: "1.5rem",
  fontWeight: "600",
  paddingLeft: "32px",
  display: "flex",
});
function NavBar() {
  return (
    <NavBarContainer>
      {/* <h2>Rigi</h2> */}
      <img
        src="https://app.rigi.club/wp-content/themes/Rigi/assets/img/logo.svg"
        alt=""
        style={{ width: "80px" }}
      />
    </NavBarContainer>
  );
}

export default NavBar;
