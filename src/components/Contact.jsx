import React from "react";
import "./contact.scss";
import Button from "./Button";

const Contact = () => {
  return (
    <section id="contact">
      <h1>Contact Us</h1>
      <form action="">
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <input type="text" placeholder="Subject" />
        <textarea
          name="message"
          id="message"
          cols="30"
          rows="10"
          placeholder="Message"
        ></textarea>
        <Button title="Send" color="dark" />
      </form>
    </section>
  );
};

export default Contact;
