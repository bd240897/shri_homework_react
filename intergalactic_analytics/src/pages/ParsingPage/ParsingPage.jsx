import React, { useState } from 'react';
import CardsHorizontal from '../../components/CardsHorizontal/CardsHorizontal';
import { getCurrentDateFormatted } from '../../share/utils';
import styles from './ParsingPage.module.css'; // Твои CSS Module стили
import { HISTORY_KEY, mock_values } from './utils';

const ParsingPage = () => {
  const [file, setFile] = useState(null); // Загруженный файл
  const [loading, setLoading] = useState(false); // Состояние загрузки
  const [error, setError] = useState(''); // Ошибки
  // TODO delete mock_values
  const [result, setResult] = useState(null); // Результат агрегации (поэтапный)

  console.log(result);

  /**
   * Обработчик выбора файла через кнопку
   */
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError('');
      setResult(null);
    }
  };

  const updateStorage = (isSuccessful = true) => {
    const storageHistory = JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];

    const newHistoryElement = {
      filename: file.name,
      date: getCurrentDateFormatted(),
      isSuccessful,
      data: isSuccessful ? result : null,
    };

    console.log('new el', newHistoryElement);

    storageHistory.push(newHistoryElement);

    localStorage.setItem(HISTORY_KEY, JSON.stringify(storageHistory));
  };

  /**
   * Обработчик отправки формы
   */
  const handleSubmit = async () => {
    if (!file) {
      setError('Пожалуйста, выберите файл');
      return;
    }

    const rows = 10000;

    const url = `http://localhost:3000/aggregate?rows=${rows}`;

    setLoading(true);
    setError('');
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      // отправка запроса
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      // чтение всех ответов сразу
      // TODO delete
      // const data = await response.text()
      // console.log(data)

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

      // Сохранение истории в localStorage
      // const history = JSON.parse(localStorage.getItem('history') || '[]');
      // history.push({
      //   timestamp: new Date().toISOString(),
      //   filename: file.name,
      //   result: accumulatedData,
      // });
      // localStorage.setItem('history', JSON.stringify(history));
    } catch (err) {
      setError(`Ошибка при обработке файла: ${err.message}`);
    } finally {
      if (!isResult(result)) {
        setError(`упс, не то...`);
      }
      updateStorage(error.length > 0 ? true : false);
      setLoading(false);
    }
  };

  /**
   * Обработчик перетаскивания файла
   */
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'text/csv') {
      setFile(droppedFile);
      setError('');
      setResult(null);
    } else {
      setError('Пожалуйста, загрузите CSV-файл');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  /**
   * Сброс состояния файла
   */
  const handleClear = () => {
    setFile(null);
    setResult(null);
    setError('');
    setHighlights([]);
    document.getElementById('fileInput').value = '';
  };

  console.log(result);

  const isResult = (result) => {
    const flag =
      result &&
      typeof result === 'object' &&
      'total_spend_galactic' in result &&
      typeof result.total_spend_galactic === 'number';

    return Boolean(flag);
  };

  return (
    <>
      <div className={styles.container}>
        {/* Текстовое описание */}
        <p className={styles.description}>
          Загрузите csv файл и получите полную информацию о нём за сверхнизкое
          время
        </p>
        <p className={styles.dropHint}>или перетащите сюда</p>

        {/* Область для загрузки файла */}
        <div
          className={styles.dropZone}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <input
            type="file"
            id="fileInput"
            accept=".csv"
            onChange={handleFileChange}
            hidden
          />
          <button
            className={styles.uploadButton}
            onClick={() => document.getElementById('fileInput').click()}
          >
            {file ? `Файл: ${file.name}` : 'Загрузить файл'}
          </button>
        </div>

        {/* Кнопка отправки */}
        <button
          className={styles.submitButton}
          onClick={handleSubmit}
          disabled={!file || loading}
        >
          {loading ? 'Обработка...' : 'Отправить'}
        </button>

        {/* Индикатор загрузки */}
        {loading && (
          <p className={styles.loading}>Идет обработка файла... Подождите.</p>
        )}

        {/* Ошибка */}
        {error && <p className={styles.error}>{error}</p>}

        {/* Кнопка очистки */}
        <button className={styles.clearButton} onClick={handleClear}>
          Очистить
        </button>

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
