import React from "react";
import "./button.scss";

const Button = ({ title, color }) => {
  return <button className={`button_${color}`}>{title}</button>;
};

export default Button;
