import React from "react"; 
import { Nav, NavLink, NavMenu } from "./NavbarElements"

const Navbar = () => {
    return (
      <>
        <Nav>
          <NavMenu>
            <NavLink to="/Simulator" activeStyle>
              Simulator
            </NavLink>
            <NavLink to="/News" activeStyle>
              News
            </NavLink>
            <NavLink to="/Account" activeStyle>
              Account
            </NavLink>
          </NavMenu>
        </Nav>
      </>
    );
  };
    
  export default Navbar;