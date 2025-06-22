import React from 'react';
import { useNavigate } from 'react-router';
import Button from '../../components/Button/Button';
import { useStore } from '../../store';
import HistoryItem from './HistoryItem/HistoryItem';
import styles from './HistoryPage.module.css';

const HistoryPage = () => {
  const navigate = useNavigate();

  const { history, clearHistory, deleteHisteryItem } = useStore();

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
  const generateHandler = () => {
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
        <Button type="green" onClick={generateHandler}>
          Сгенерировать больше
        </Button>
        {history.length > 0 && (
          <Button type="black" onClick={clearHandler}>
            Очистить всё
          </Button>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
