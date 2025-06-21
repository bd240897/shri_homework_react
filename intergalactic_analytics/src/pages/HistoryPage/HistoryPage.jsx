import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useStore } from '../../store';
import HistoryItem from './HistoryItem/HistoryItem';
import styles from './HistoryPage.module.css';
import { history_mock } from './utils';

const HistoryPage = () => {
  const navigate = useNavigate();

  const { history, updateHistory, clearHistory, deleteHisteryItem } =
    useStore();

  // TODO delete
  // useEffect(() => {
  //   updateHistory(history_mock[0]);
  // }, []);

  /**
   * Удалить одну запись
   **/
  const deleteHandler = (id) => {
    deleteHisteryItem(id);
  };

  /**
   * Очистить всю историю
   */
  const clearHandler = () => {
    clearHistory();
  };

  /**
   * Редирект на генерацию
   */
  const handleGenerate = () => {
    navigate('/generation');
  };

  return (
    <div>
      {history.length === 0 ? (
        <p>Нет записей в истории</p>
      ) : (
        history.map((record) => (
          <HistoryItem
            key={record.id}
            record={record}
            onDelete={() => deleteHandler(record.id)}
            className={styles.historyItem}
          />
        ))
      )}

      <div className={styles.buttonsContainer}>
        <button className={styles.generateButton} onClick={handleGenerate}>
          Сгенерировать больше
        </button>
        {history.length > 0 && (
          <button className={styles.clearButton} onClick={clearHandler}>
            Очистить всё
          </button>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
