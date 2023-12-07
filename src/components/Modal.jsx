import React, { useState } from "react";
import "./Modal.scss"; // Create a CSS file for styling
import { FaXmark } from "react-icons/fa6";

const Modal = ({ isOpen, onClose, children }) => {
  const modalStyles = {
    display: isOpen ? "block" : "none",
  };

  return (
    <div className="modal" style={modalStyles}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          <FaXmark />
        </span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
