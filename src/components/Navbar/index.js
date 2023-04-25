import React from "react"; 
import { Nav, NavLink, NavMenu } from "./NavbarElements"

const Navbar = () => {
    return (
      <>
        <Nav>
          <NavMenu>
          <NavLink to="/login" activeStyle>
              Login
            </NavLink>
            <NavLink to="/Simulator" activeStyle>
              Simulator
            </NavLink>
            <NavLink to="/Buystock" activeStyle>
              BuyStock
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