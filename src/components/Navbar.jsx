import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import "./navbar.scss";
import studox from "../images/studox.png";
import AuthContext from "../store/auth-context";
import Modal from "./Modal";
import Authentication from "./Authentication";
import Upload from "../pages/Upload";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const toggleHandler = () => setToggleMenu((prev) => !prev);

  const authCtx = useContext(AuthContext);

  const logoutHandler = () => {
    authCtx.logout();
  };

  const openAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const openUploadModal = () => {
    setIsUploadModalOpen(true);
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
        <a href="#">
          <img src={studox} alt="Studox logo" />
        </a>
        <ul>
          <li>
            <a href="#">Home</a>
          </li>

          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact Us</a>
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
        <a href="#">
          <img src={studox} alt="Studox logo" />
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
                <a href="#">Sign Up</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
              <li>
                <Link to="/upload">
                  <button>Upload</button>
                </Link>
              </li>
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
