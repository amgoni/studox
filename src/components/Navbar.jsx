import React, { useState } from "react";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import "./navbar.scss";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const toggleHandler = () => setToggleMenu((prev) => !prev);

  return (
    <nav id="navbar">
      <div className="navbar__desktop">
        <a href="#">
          <img src="../assets/studox.png" alt="Studox logo" />
        </a>
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Pricing</a>
          </li>
          <li>
            <a href="#">Sign Up</a>
          </li>
          <li>
            <a href="#">Upload</a>
          </li>
          <li>
            <button>Contact Us</button>
          </li>
        </ul>
      </div>

      <div className="navbar__mobile">
        <a href="#">
          <img src="../assets/studox.png" alt="Studox logo" />
        </a>
        {toggleMenu ? (
          <RiCloseLine color="34194c" size={30} onClick={toggleHandler} />
        ) : (
          <RiMenu3Line color="34194c" size={30} onClick={toggleHandler} />
        )}
        {toggleMenu && (
          <div className="navbar__mobile-container">
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Pricing</a>
              </li>
              <li>
                <a href="#">Sign Up</a>
              </li>
              <li>
                <a href="#">Upload</a>
              </li>
              <li>
                <button>Contact Us</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
