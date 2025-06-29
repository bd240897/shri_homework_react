import React from 'react';
import { useNavigate } from 'react-router';
import Button from '../../components/Button/Button';
import { useStore } from '../../store';
import HistoryItem from './HistoryItem/HistoryItem';
import styles from './HistoryPage.module.css';

const HistoryPage = () => {
  const navigate = useNavigate();

  const { history, clearHistory, deleteHistoryItem } = useStore();

  /**
   * Удалить одну запись
   **/
  const deleteHandler = (id) => {
    deleteHistoryItem(id);
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
    <div className={'historyPage'}>
      {history.length === 0 ? (
        <p>Нет записей в истории</p>
      ) : (
        history.map((record) => (
          <HistoryItem
            data-testid="history-item"
            key={record.id}
            record={record}
            onDelete={() => deleteHandler(record.id)}
            className={styles.historyItem}
          />
        ))
      )}

      <div className={styles.buttonsContainer}>
        <Button
          type="green"
          onClick={generateHandler}
          data-testid="generate-button"
        >
          Сгенерировать больше
        </Button>
        {history.length > 0 && (
          <Button
            type="black"
            onClick={clearHandler}
            data-testid="clear-button"
          >
            Очистить всё
          </Button>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
