import React, { useState } from 'react';
import Button from '../../components/Button/Button';
import styles from './GenerationPage.module.css';

const GenerationPage = () => {
  const [size, setSize] = useState(0.1); // ГБ
  const [withErrors, setWithErrors] = useState('off');
  const [maxSpend, setMaxSpend] = useState('1000');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setDone(false);

    const url = new URL('http://localhost:3000/report');
    url.searchParams.append('size', size);
    url.searchParams.append('withErrors', withErrors);
    url.searchParams.append('maxSpend', maxSpend);

    try {
      const response = await fetch(url);

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Ошибка при генерации отчета');
      }

      // Получаем CSV как blob
      const blob = await response.blob();

      // Создаем ссылку для скачивания
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = 'report.csv';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(downloadUrl);

      setDone(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Сгенерируйте готовый CSV-файл нажатием одной кнопки</h2>

      <div className={styles.settings}>
        <label>
          Размер отчета в ГБ:
          <input
            type="number"
            step="any" // позволяет вводить дробные значения
            min="0.1"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
        </label>

        <label>
          Включать ошибки:
          <select
            value={withErrors}
            onChange={(e) => setWithErrors(e.target.value)}
          >
            <option value="off">Нет</option>
            <option value="on">Да</option>
          </select>
        </label>

        <label>
          Максимальная сумма расходов:
          <input
            type="text"
            value={maxSpend}
            onChange={(e) => setMaxSpend(e.target.value)}
          />
        </label>
      </div>

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Идёт генерация...' : 'Начать генерацию'}
      </button>

      {loading && <div>Идёт процесс генерации...</div>}
      {done && <div>Файл сгенерирован и загружен!</div>}
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default GenerationPage;
