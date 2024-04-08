import React from "react";
import "./Navbar.css";
import PropTypes from "prop-types";

/*
In this component i have learned how props get here from App.js and able to set the value. 
Also learned the declaration of type to the incoming props and default values to set.
*/
export default function Navbar(props) {
  return (
    <nav className="navbar navbar-expand-lg nav">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          {props.navTitle}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href={props.navEle1Link}
              >
                {props.navEle1}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav >
  );
}

Navbar.prototype = {
  navEle1: PropTypes.string.isRequired,
  navEle1Link: PropTypes.string.isRequired,
  navTitle: PropTypes.string.isRequired,
};

Navbar.defaultProps = {
  navTitle: "Title_Here",
  navEle1: "NavEle_1",
  navEle1Link: "/",
};
