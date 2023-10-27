import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
      <footer className="py-4 fixed-bottom bg-dark">
        <div className="container-fluid px-4">
          <div className="d-flex align-items-center justify-content-between small">
            <div className="text-muted">
              Copyright © NOTE APP 2023. Designed and Developed by{" "}
              <Link to="http://freakdevelopers.com" target="_Blank">
                FreakDevs
              </Link>
            </div>
          </div>
        </div>
      </footer>
  );
}

export default Footer;
