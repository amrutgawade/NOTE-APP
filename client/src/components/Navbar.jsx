import Cookies from "js-cookie";
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
 
  return (
    <nav className="navbar sticky-top navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="#">
          NOTE APP
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
