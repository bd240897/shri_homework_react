import React from 'react';
import styles from './FileStatus.module.css';
import classNames from 'classnames';

const FileStatus = ({ fileName, date, isSuccessful, className, onClick }) => {
  return (
    <div className={classNames(styles.container, className)} onClick={onClick}>
      <div className={styles.filenameContainer}>
        <span>
          <img className={styles.fileIcon} src="/file.svg" alt="" />
        </span>
        <span>{fileName}</span>
      </div>

      <div>{date}</div>

      <div
        className={classNames(styles.successBlock, {
          [styles.success]: isSuccessful,
          [styles.error]: !isSuccessful,
        })}
      >
        <div>Обработан успешно</div>
        <img className={styles.happyIcon} src="/happy_smile.svg" alt="" />
      </div>

      <div
        className={classNames(styles.errorBlock, {
          [styles.success]: !isSuccessful,
          [styles.error]: isSuccessful,
        })}
      >
        <div>Не удалось обработать</div>
        <img className={styles.setIcon} src="/set_smile.svg" alt="" />
      </div>
    </div>
  );
};

export default FileStatus;
