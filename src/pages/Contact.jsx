import "./contact.scss";
import Contact from "../components/Contact";

const ContactPage = () => {
  return (
    <section id="contact">
      <div className="contact-overlay">
        <div className="contact-welcome">
          <h1>Contact Us</h1>
          <p>
            Studox is committed to providing exceptional service to our users.
            If you have any questions, feedback, or concerns, please do not
            hesitate to contact us. Our team is here to help and will respond to
            your inquiry as soon as possible.
          </p>
        </div>
      </div>
      <div className="contact-container">
        <Contact />
      </div>
    </section>
  );
};

export default ContactPage;
