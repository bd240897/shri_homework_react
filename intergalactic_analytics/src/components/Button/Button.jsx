import React from "react";
import styles from './Button.module.css'; // Твои CSS Module стили

const Button = ({className, handleSubmit, disabled, children}) => {
  return (
    <button
      className={`${className} ${styles.submitButton}`}
      onClick={handleSubmit}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
