import React from 'react';
import styles from './FileStatus.module.css';
import classNames from 'classnames';

const FileStatus = ({ fileName, date, isSuccessful, className, onClick }) => {
  return (
    <div className={classNames(styles.fileStatus, className)} onClick={onClick}>
      <div className={styles.leftSection}>
        <span className={styles.icon}>
          <img src="/file.svg" alt="" />
        </span>
        <span className={styles.fileName}>{fileName}</span>
      </div>
      <div className={styles.date}>{date}</div>
      <div
        className={`${styles.status} ${
          isSuccessful ? styles.success : styles.error
        }`}
      >
        {isSuccessful ? (
          <img src="/happy_smile.svg" alt="" />
        ) : (
          <img src="/set_smile.svg" alt="" />
        )}
      </div>
    </div>
  );
};

export default FileStatus;
