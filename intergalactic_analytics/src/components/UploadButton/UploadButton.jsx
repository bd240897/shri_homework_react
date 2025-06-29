import React from 'react';
import styles from './UploadButton.module.css';
import classNames from 'classnames';

const UploadButton = ({
  className,
  children,
  type,
  clearHandler,
  ...props
}) => {
  return (
    <div className={styles.container}>
      <button
        data-testid={'submit-upload-button'}
        className={classNames(styles.uploadButton, className, {
          [styles.init]: type === 'init',
          [styles.file]: type === 'file',
          [styles.loading]: type === 'loading',
          [styles.done]: type === 'done',
          [styles.error]: type === 'error',
        })}
        {...props}
      >
        {type === 'loading' ? (
          <img className={styles.img} src="/loading.svg" />
        ) : (
          children
        )}
      </button>

      {['error', 'file', 'done'].includes(type) && (
        <button
          data-testid={'clear-upload-button'}
          onClick={clearHandler}
          className={styles.clearButton}
          {...props}
        >
          <img className={styles.clearButtonImage} src="/clear_button.svg" />
        </button>
      )}
    </div>
  );
};

export default UploadButton;
