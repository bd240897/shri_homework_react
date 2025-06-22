// Modal.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.modal}>
      <div className={styles.modalOverlay} onClick={onClose}></div>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
