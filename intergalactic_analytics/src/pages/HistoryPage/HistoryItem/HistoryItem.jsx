import React, { useState } from 'react';
import CardsVertical from '../../../components/CardsVertical/CardsVertical';
import Modal from '../../../components/Modal/Modal';
import FileStatus from './FileStatus/FileStatus';
import styles from './HistoryItem.module.css';
import classNames from 'classnames';

const HistoryItem = ({ record, onDelete, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    if (record.data) {
      setIsOpen(true);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className={classNames(styles.item, className)}>
      <FileStatus
        fileName={record.filename}
        date={record.date}
        isSuccessful={record.isSuccessful}
        className={styles.fileStatus}
        onClick={openModal}
      />

      <button
        className={styles.trashButton}
        onClick={(e) => {
          e.stopPropagation();
          onDelete(record.id);
        }}
        aria-label="Удалить"
      >
        <img className={styles.trashButtonIcon} src="trash.svg" alt="Удалить" />
      </button>

      <Modal isOpen={isOpen} onClose={closeModal}>
        <CardsVertical values={record.data} />
      </Modal>
    </div>
  );
};

export default HistoryItem;
