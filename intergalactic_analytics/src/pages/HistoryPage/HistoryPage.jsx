// src/pages/HistoryPage/HistoryPage.jsx
import React, { useEffect, useState } from 'react';
import HistoryItem from './HistoryItem/HistoryItem';
import styles from './HistoryPage.module.css';
import { useNavigate } from 'react-router';
import { history_mock } from './utils';
import { HISTORY_KEY } from '../ParsingPage/utils';

const HistoryPage = () => {
  const [historyList, setHistoryList] = useState([]);
  const navigate = useNavigate();

  // При монтировании: загружаем историю из localStorage
  useEffect(() => {
    // TODO delete
    // localStorage.setItem(HISTORY_KEY, JSON.stringify(history_mock));

    const savedHistory = JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
    setHistoryList(savedHistory);
  }, []);

  // Удалить одну запись
  const handleDelete = (index) => {
    const updatedHistory = historyList.filter((_, i) => i !== index);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
    setHistoryList(updatedHistory);
  };

  // Очистить всю историю
  const handleClear = () => {
    localStorage.removeItem(HISTORY_KEY);
    setHistoryList([]);
  };

  // Редирект на генерацию
  const handleGenerate = () => {
    navigate('/generation');
  };

  return (
    <div className={styles.container}>
      <h2>История загрузок</h2>

      {historyList.length === 0 ? (
        <p>Нет записей в истории</p>
      ) : (
        historyList.map((record, index) => (
          <HistoryItem
            key={index}
            record={record}
            onDelete={() => handleDelete(index)}
          />
        ))
      )}

      <div className={styles.controls}>
        <button className={styles.generateButton} onClick={handleGenerate}>
          Сгенерировать больше
        </button>
        {historyList.length > 0 && (
          <button className={styles.clearButton} onClick={handleClear}>
            Очистить всё
          </button>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
