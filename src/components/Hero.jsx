import React from "react";
import "./hero.scss";
import CourseForm from "./CourseForm";

const Hero = () => {
  return (
    <section id="hero">
      <div className="hero__container">
        <div className="hero__welcome">
          <h1>Welcome to Studox,</h1>
          <p>Where students come first. Where we take pride in education.</p>
        </div>
        <div className="hero__form-container">
          <h3>Browse documents</h3>
          <div className="">
            <CourseForm className="hero__form" />
          </div>
        </div>
      </div>
      <div className="hero__image">
        <img src="../assets/hero.jpg" alt="" />
      </div>
      <div className="arrow-right"></div>
      <div className="circle"></div>
      <div className="line"></div>
    </section>
  );
};

export default Hero;
