import React, { useState } from 'react';
import styles from './GenerationPage.module.css'; // Твои CSS Module стили
import Card from '../../components/Card/Card';
import CardsHorizontal from './CardsHorizontal/CardsHorizontal';

const cardsData = [
  { title: "1000", subtitle: "общие расходы в галактических кредитах" },
  { title: "blobs", subtitle: "цивилизация с минимальными расходами" },
  { title: "45056", subtitle: "количество обработанных записей" },
  { title: "2 апреля", subtitle: "день года с максимальными расходами" },
  { title: "1 апреля", subtitle: "день года с минимальными расходами" },
  { title: "678899", subtitle: "максимальная сумма расходов за день" },
  { title: "humans", subtitle: "цивилизация с максимальными расходами" },
  { title: "876", subtitle: "средние расходы в галактических кредитах" },
];

const GenerationPage = () => {
  const [file, setFile] = useState(null); // Загруженный файл
  const [loading, setLoading] = useState(false); // Состояние загрузки
  const [error, setError] = useState(''); // Ошибки
  const [result, setResult] = useState(null); // Результат агрегации
  const [highlights, setHighlights] = useState([]); // Подсветка изменений

  /**
   * Обработчик выбора файла через кнопку
   */
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError('');
      setResult(null);
      setHighlights([]);
    }
  };

  /**
   * Обработчик отправки формы
   */
  const handleSubmit = async () => {
    if (!file) {
      setError('Пожалуйста, выберите файл');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('rows', 100); // Можно сделать полем ввода

    try {
      const response = await fetch('/aggregate', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Ошибка сети: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let accumulatedData = {};

      while (true) {
        const { done, value } = await reader.read();

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
            setResult({ ...accumulatedData });
            setHighlights((prev) => [...prev, ...Object.keys(chunk)]);
          } catch (err) {
            console.warn('Не удалось разобрать строку:', line);
          }
        }

        buffer = lines[lines.length - 1]; // Сохраняем остаток строки
      }

      // Сохранение истории в localStorage
      const history = JSON.parse(localStorage.getItem('history') || '[]');
      history.push({
        timestamp: new Date().toISOString(),
        filename: file.name,
        result: accumulatedData,
      });
      localStorage.setItem('history', JSON.stringify(history));
    } catch (err) {
      setError(`Ошибка при обработке файла: ${err.message}`);
    } finally {
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
      setHighlights([]);
    } else {
      setError('Пожалуйста, загрузите CSV-файл');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  /**
   * Сброс состояния
   */
  const handleClear = () => {
    setFile(null);
    setResult(null);
    setError('');
    setHighlights([]);
    document.getElementById('fileInput').value = '';
  };

  return (
    <>
    <div className={styles.container}>
      {/* Текстовое описание */}
      <p className={styles.description}>
        Загрузите csv файл и получите полную информацию о нём за сверхнизкое время
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
      <button className={styles.submitButton} onClick={handleSubmit} disabled={!file || loading}>
        {loading ? 'Обработка...' : 'Отправить'}
      </button>

      {/* Индикатор загрузки */}
      {loading && <p className={styles.loading}>Идет обработка файла... Подождите.</p>}

      {/* Ошибка */}
      {error && <p className={styles.error}>{error}</p>}

      {/* Результат */}
      {result && (
        <div className={styles.resultBox}>
          <h3>Результат агрегации:</h3>
          <ul>
            {Object.entries(result).map(([key, value]) => (
              <li key={key} className={highlights.includes(key) ? styles.highlight : ''}>
                <strong>{key.replace(/_/g, ' ')}</strong>: {value}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Кнопка очистки */}
      <button className={styles.clearButton} onClick={handleClear}>
        Очистить
      </button>

      {/* Подсказка */}
      <div className={styles.hint}>
        <p>Здесь появятся хайлайты</p>
      </div>
    </div>
    <div>
      <CardsHorizontal cardsData={cardsData}></CardsHorizontal>
    </div>
    </>
  );
};

// const GenerationPage = () => {
//   return (
//     <div className={styles.container}>
//       {/* Текстовое описание */}
//       <p className={styles.description}>
//         Загрузите csv файл и получите полную информацию о нём за сверхнизкое время
//       </p>
//       <p className={styles.dropHint}>или перетащите сюда</p>

//       {/* Область для загрузки файла */}
//       <div className={styles.dropZone}>
//         <button className={styles.uploadButton}>Загрузить файл</button>
//       </div>

//       {/* Кнопка отправки */}
//       <button className={styles.submitButton}>Отправить</button>

//       {/* Подсказка */}
//       <div className={styles.hint}>
//         <p>Здесь появятся хайлайты</p>
//       </div>
//     </div>
//   );
// };

export default GenerationPage;

