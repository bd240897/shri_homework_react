import React from 'react';
import styles from './CardsVertical.module.css'; // Твои CSS Module стили
import Card from '../Card/Card';
import { titles } from '../CardsHorizontal/utils';
import { parseDayOfYearToMonthDay } from '../../share/utils';

const CardsVertical = ({ values }) => {
  return (
    <div className={styles.cardGrid}>
      {Object.entries(values)
        .map((element) => {
          if (['less_spent_at', 'big_spent_at'].includes(element[0])) {
            element[1] = parseDayOfYearToMonthDay(element[1]);
          }
          return element;
        })
        .map(([key, value], index) => (
          <Card key={index} title={value} subtitle={titles[key]} />
        ))}
    </div>
  );
};

export default CardsVertical;
