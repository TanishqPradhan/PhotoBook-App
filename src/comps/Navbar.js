import React from "react";
import { Nav, NavLink, Bars, NavMenu } from "./NavbarElements";

const Navbar = () => {
  return (
    <>
      <Nav>
        <Bars />
        <NavMenu>
          <NavLink to="/" activestyle>
            Home
          </NavLink>
          <NavLink to="/UploadImageForm" activestyle>
            Upload New Image
          </NavLink>
          <NavLink to="/ImageGrid" activestyle>
            My PhotoBook
          </NavLink>
          <NavLink to="/Manage" activestyle>
            Manage Photos
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
