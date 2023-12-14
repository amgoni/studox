import "./contact.scss";
import Button from "./Button";
import {
  FaPhone,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";

const Contact = () => {
  return (
    <section id="contact">
      <div className="contact-container">
        <div className="contact-content">
          <div className="reservation-form">
            <h3>
              Tell us what features/tools we can add that will help you study.
            </h3>
            <form action="">
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Type Your Email"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  name="subject"
                  id="subject"
                  placeholder="Subject"
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  id="message"
                  cols="30"
                  rows="1"
                  placeholder="Message"
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <Button type="submit" title="Send" color="dark" />
              </div>
            </form>
          </div>
          <div className="contact-info">
            <div className="contact-info-item phone">
              <FaPhone />
              <a target="_blank" rel="noreferrer" href="tel:+234 813 563 6711">
                +234 813 563 6711
              </a>
            </div>
            <div className="contact-info-item email">
              <FaEnvelope />
              <a
                target="_blank"
                rel="noreferrer"
                href="mailto:studox.edu@gmail.com"
              >
                studox.edu@gmail.com
              </a>
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
        </div>
      </div>
    </section>
  );
};

export default Contact;
