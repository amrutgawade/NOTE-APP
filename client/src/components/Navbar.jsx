import Cookies from "js-cookie";
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
 
  return (
    <nav className="navbar sticky-top navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="#">
          NOTE APP
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
