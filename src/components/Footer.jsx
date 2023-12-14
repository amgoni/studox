import { Link } from "react-router-dom";
import "./footer.scss";
import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";
import studox from "../images/studox.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="main">
          <div className="logo">
            <Link to="/">
              <img src={studox} alt="Studox logo" />
            </Link>
          </div>
          <div className="contact">
            <a target="_blank" rel="noreferrer" href="tel:+234 813 563 6711">
              +234 813 563 6711
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="mailto:studox.edu@gmail.com"
            >
              studox.edu@gmail.com
            </a>
          </div>
          <div className="links">
            <Link className="link" to="/">
              Home
            </Link>
            <Link to="/about">About Us</Link>
            <Link className="link" to="/contact">
              Contact Us
            </Link>
          </div>
          <div className="socials">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://web.facebook.com/profile.php?id=61552314959917"
            >
              <FaFacebook />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/tiptop_apartments/"
            >
              <FaInstagram />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://twitter.com/tiptop_20"
            >
              <FaXTwitter />
            </a>
          </div>
        </div>
        <div className="sub">
          <Link>Terms and Conditions</Link>
          <Link>Privacy Policy</Link>
          <Link>© Studox, 2023. All rights reserved.</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
