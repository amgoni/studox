import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaXmark } from "react-icons/fa6";
import "./navbar.scss";
import studox from "../images/studox.png";
import AuthContext from "../store/auth-context";
import Modal from "./Modal";
import Authentication from "./Authentication";
import Upload from "../components/Upload";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  const authCtx = useContext(AuthContext);

  const logoutHandler = () => {
    authCtx.logout();
  };

  const openAuthModal = () => {
    setIsAuthModalOpen(true);
    closeMenu();
  };

  const openUploadModal = () => {
    closeMenu();
    if (authCtx.isLoggedIn) {
      setIsUploadModalOpen(true);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const closeUploadModal = () => {
    setIsUploadModalOpen(false);
  };

  return (
    <nav id="navbar">
      <div className="navbar__desktop">
        <Link to="/">
          <img src={studox} alt="Studox logo" />
        </Link>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            <button onClick={openUploadModal}>Upload</button>
          </li>
          {authCtx.isLoggedIn ? (
            <li>
              <button className="button-dark" onClick={logoutHandler}>
                Log Out
              </button>
            </li>
          ) : (
            <li>
              <button className="button-dark" onClick={openAuthModal}>
                Login
              </button>
            </li>
          )}
        </ul>
      </div>

      <div className="navbar__mobile">
        <Link to="/">
          <img src={studox} alt="Studox logo" />
        </Link>
        <div className="navbar-menu-icon" onClick={toggleMenu}>
          {showMenu ? <FaXmark color="white" /> : <FaBars />}
        </div>
        {showMenu && (
          <div className="navbar__mobile-container">
            <ul>
              <li>
                <Link to="/" onClick={closeMenu}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={closeMenu}>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={closeMenu}>
                  Contact Us
                </Link>
              </li>
              <li>
                <button onClick={openUploadModal}>Upload</button>
              </li>
              {authCtx.isLoggedIn ? (
                <li>
                  <button className="button-dark" onClick={logoutHandler}>
                    Log Out
                  </button>
                </li>
              ) : (
                <li>
                  <button className="button-dark" onClick={openAuthModal}>
                    Login
                  </button>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
      <Modal isOpen={isAuthModalOpen} onClose={closeAuthModal}>
        <Authentication closeModal={closeAuthModal} />
      </Modal>
      <Modal isOpen={isUploadModalOpen} onClose={closeUploadModal}>
        <Upload closeModal={closeUploadModal} />
      </Modal>
    </nav>
  );
};

export default Navbar;
