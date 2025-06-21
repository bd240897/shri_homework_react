// src/pages/HistoryPage/HistoryItem/HistoryItem.jsx
import React, { useState } from 'react';
import styles from './HistoryItem.module.css';
import FileStatus from './FileStatus/FileStatus';
import Modal from '../../../components/Modal/Modal';
import CardsVertical from '../../../components/CardsVertical/CardsVertical';
import { mock_values } from '../../ParsingPage/utils';

const HistoryItem = ({ record, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  console.log(record);

  const openModal = () => {
    if (record.data) {
      setIsOpen(true);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.list_item}>
      <FileStatus
        fileName={record.filename}
        date={record.date}
        isSuccessful={record.isSuccessful}
        className={styles.list_item_left}
        onClick={openModal}
      />

      <button
        className={styles.trash_button}
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        aria-label="Удалить"
      >
        <img src="trash.svg" alt="Удалить" />
      </button>

      <Modal isOpen={isOpen} onClose={closeModal}>
        <CardsVertical values={record.data} />
      </Modal>
    </div>
  );
};

export default HistoryItem;
