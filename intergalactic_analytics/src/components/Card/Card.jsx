import React from 'react';
import styles from './Card.module.css';

const Card = ({ title, subtitle }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardSubtitle}>{subtitle}</p>
    </div>
  );
};

export default Card;