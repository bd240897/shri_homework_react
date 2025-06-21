import React from 'react'
import styles from './CardsVertical.module.css'; // Твои CSS Module стили
import Card from '../../../components/Card/Card';

const CardsVertical = ({cardsData}) => {
  return (
    <div className={styles.cardGrid}>
      {cardsData.map((card, index) => (
        <Card key={index} title={card.title} subtitle={card.subtitle} />
      ))}
    </div>
  )
}

export default CardsVertical
