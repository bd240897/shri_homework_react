import React from 'react';
import styles from './Button.module.css';
import classNames from 'classnames';

const Button = ({ className, children, type, ...props }) => {
  return (
    <button
      className={classNames(styles.submitButton, className, {
        [styles.black]: type === 'black',
        [styles.green]: type === 'green',
        [styles.gray]: type === 'gray',
        [styles.yellow]: type === 'yellow',
      })}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
