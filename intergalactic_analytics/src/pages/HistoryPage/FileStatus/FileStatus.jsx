import React from 'react';
import styles from './FileStatus.module.css';

const FileStatus = ({ fileName, date, status, isSuccessful }) => {
  return (
    <div className={styles.fileStatus}>
      <div className={styles.leftSection}>
        <span className={styles.icon}>
            <img src="/file.svg" alt="" />
        </span>
        <span className={styles.fileName}>{fileName}</span>
      </div>
      <div className={styles.date}>{date}</div>
      <div className={`${styles.status} ${isSuccessful ? styles.success : styles.error}`}>
        {status}
        {isSuccessful ? <img src="/happy_smile.svg" alt="" /> : <img src="/set_smile.svg" alt="" />}
      </div>
    </div>
  );
};

export default FileStatus;