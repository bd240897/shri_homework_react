import React, { useState } from 'react';
import styles from './GenerationPage.module.css';
import { URLS } from '../../api/urls';
import { generateParams } from './utils';
import classNames from 'classnames';

const GenerationPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setDone(false);

    const url = new URL(URLS.generate);

    url.searchParams.append('size', generateParams.size);
    url.searchParams.append('withErrors', generateParams.withErrors);
    url.searchParams.append('maxSpend', generateParams.maxSpend);

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
      <p className={styles.description}>
        Сгенерируйте готовый CSV-файл нажатием одной кнопки
      </p>

      <div className={styles.submitButtonContainer}>
        <button
          className={classNames(styles.submitButton, {
            [styles.submitButtonError]: error,
            [styles.submitButtonLoading]: loading,
          })}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <div>
              <img className={styles.img} src="/loading.svg" />
            </div>
          ) : (
            'Начать генерацию'
          )}
        </button>
      </div>
      <div className={styles.massegeContainer}>
        {loading && <div>Идёт процесс генерации...</div>}
        {done && <div>Файл сгенерирован и загружен!</div>}
        {error && <div className={styles.error}>{error}</div>}
      </div>
    </div>
  );
};

export default GenerationPage;
