import { useState, React } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

// This Navbar has a functionality to include navlinks, uncomment the commented parts inside this file and css

function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(!click);
  };

  const signUpClick = () => {
    console.log("Sign up clicked");
    alert("Devs are working on it, please wait for a while :)");
  };

  return (
    <>
      <nav className="nav">
        <div className="navbar-container">
          <div className="menu-switch" onClick={handleClick}>
            <i className="fas fa-bars fa-2x" />
          </div>
          <div className="navbar-left">
            <Link to="/" className="navbar-logo">
              Codex
            </Link>

            <div
              className={
                click ? "navbar-left-items active" : "navbar-left-items"
              }
            >
              {/* <Link to="/">Noted</Link> */}
            </div>
            <div></div>
          </div>
          <div className="navbar-right">
            <Link to="/" className="navbar-btn">
              <button className="auth-button" onClick={signUpClick}>
                Sign up
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
