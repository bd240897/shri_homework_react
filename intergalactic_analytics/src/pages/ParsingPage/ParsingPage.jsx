import React, { useRef, useState } from 'react';
import CardsHorizontal from '../../components/CardsHorizontal/CardsHorizontal';
import { generateId, getCurrentDateFormatted } from '../../share/utils';
import { useStore } from '../../store';
import styles from './ParsingPage.module.css'; // Твои CSS Module стили
import { URLS } from '../../api/urls';
import { isResult } from './utils';
import classNames from 'classnames';

const ParsingPage = () => {
  const [file, setFile] = useState(null); // Загруженный файл
  const [loading, setLoading] = useState(false); // Состояние загрузки
  const [error, setError] = useState(''); // Ошибки
  const [result, setResult] = useState(null); // Результат агрегации (поэтапный)
  const [isDragging, setIsDragging] = useState(false); // Новое состояние
  const fileInputRef = useRef(null);

  const { updateHistory } = useStore();

  /**
   * Обработчик выбора файла через кнопку
   */
  const fileChangeHandler = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError('');
      setResult(null);
    }
  };

  const updateStorage = (isSuccessful = true) => {
    const newHistoryElement = {
      id: generateId(),
      filename: file.name,
      date: getCurrentDateFormatted(),
      isSuccessful,
      data: isSuccessful ? result : null,
    };

    updateHistory(newHistoryElement);
  };

  /**
   * Обработчик отправки формы
   */
  const submitHandler = async () => {
    if (!file) {
      setError('Пожалуйста, выберите файл');
      return;
    }

    if (file.name.split('.').pop() !== 'csv') {
      setError(`упс, не то...`);
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    const rows = 10000;
    const url = `${URLS.agregate}?rows=${rows}`;

    const formData = new FormData();
    formData.append('file', file);

    try {
      // отправка запроса
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      // чтение ответов в потоке
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let accumulatedData = {};

      // ждет пока сервер отдаст все (1)
      while (true) {
        const { done, value } = await reader.read();

        // условие выхода из (1)
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');

        for (let line of lines) {
          if (line.trim() === '') continue;

          try {
            const chunk = JSON.parse(line);

            // Если сервер вернул ошибку
            if (chunk.error) {
              throw new Error(chunk.error);
            }

            // Обновляем накопленные данные
            accumulatedData = { ...accumulatedData, ...chunk };

            // пишем в стейт
            setResult({ ...accumulatedData });
          } catch (err) {
            console.warn('Не удалось разобрать строку:', line);
          }
        }

        buffer = lines[lines.length - 1]; // Сохраняем остаток строки
      }
    } catch (err) {
      setError(`Ошибка при обработке файла: ${err.message}`);
    } finally {
      updateStorage(error.length > 0 ? true : false);
      setLoading(false);
    }
  };

  /**
   * Обработчик перетаскивания файла
   */
  const dropHandler = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'text/csv') {
      setFile(droppedFile);
      setError('');
      setResult(null);
    } else {
      setError('Пожалуйста, загрузите CSV-файл');
    }
    setIsDragging(false); // Завершаем drag
  };

  const dragOverHandler = (e) => {
    e.preventDefault();
    setIsDragging(true); // Начинаем drag
  };

  const dragLeaveHandler = (e) => {
    e.preventDefault();
    setIsDragging(false); // Вышли за пределы
  };

  /**
   * Сброс состояния файла
   */
  const clearHandler = () => {
    setFile(null);
    setResult(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // безопасно очищаем input
    }
  };

  return (
    <>
      <div className={styles.container}>
        <p className={styles.description}>
          Загрузите <strong>csv</strong> файл и получите{' '}
          <strong>полную информацию</strong> о нём за сверхнизкое время
        </p>

        {/* Область для загрузки файла */}
        <div
          className={classNames(styles.dropZone, {
            [styles.dropZoneActive]: isDragging,
          })}
          onDrop={dropHandler}
          onDragOver={dragOverHandler}
          onDragLeave={dragLeaveHandler}
        >
          <div className={styles.dropZoneInside}>
            <div className={styles.submitButtonContainer}>
              <input
                type="file"
                id="fileInput"
                accept=".csv"
                onChange={fileChangeHandler}
                ref={fileInputRef} // <-- добавили ref
                hidden
              />
              <button
                className={styles.uploadButton}
                onClick={() => document.getElementById('fileInput').click()}
              >
                {file ? `Файл: ${file.name}` : 'Загрузить файл'}
              </button>
              {file && (
                <button onClick={clearHandler} className={styles.buttonReset}>
                  <img className={styles.clearButton} src="/clear_button.svg" />
                </button>
              )}
            </div>
            <div>
              <span>или перетащите сюда</span>{' '}
            </div>
          </div>
        </div>

        {/* Кнопка отправки */}
        <div className={styles.submitButtonContainer}>
          <button
            className={classNames(styles.submitButton)}
            onClick={submitHandler}
            disabled={!file || loading}
          >
            {loading ? 'Обработка...' : 'Отправить'}
          </button>
        </div>

        {/* Индикатор загрузки */}
        {loading && (
          <p className={styles.loading}>Идет обработка файла... Подождите.</p>
        )}

        {/* Ошибка */}
        {error && <p className={styles.error}>{error}</p>}

        {/* Подсказка */}
        <div className={styles.hint}>
          <p>Здесь появятся хайлайты</p>
        </div>
      </div>

      {/* Результат */}
      {isResult(result) && (
        <div>
          <CardsHorizontal values={result} />
        </div>
      )}
    </>
  );
};

export default ParsingPage;
