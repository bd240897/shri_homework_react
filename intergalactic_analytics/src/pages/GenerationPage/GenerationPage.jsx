import React, { useState } from 'react';
import { URLS } from '../../api/urls';
import Button from '../../components/Button/Button';
import UploadButton from '../../components/UploadButton/UploadButton';
import styles from './GenerationPage.module.css';
import { generateParams } from './utils';

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

  /**
   * Сброс состояния файла
   */
  const clearHandler = () => {
    setLoading(false);
    setError('');
    setDone(false);
  };

  /**
   * Сгенерить статус для кнопки загрузки
   */
  const getUploadButtonType = () => {
    if (error) {
      return 'error';
    } else if (loading) {
      return 'loading';
    } else if (done) {
      return 'done';
    }
    return 'init';
  };

  return (
    <div className={styles.container}>
      <p className={styles.description}>
        Сгенерируйте готовый CSV-файл нажатием одной кнопки
      </p>

      <div className={styles.submitButtonContainer}>
        {!(loading || error || done) ? (
          <Button type={'green'} onClick={handleSubmit} disabled={loading}>
            Начать генерацию
          </Button>
        ) : (
          <UploadButton
            type={getUploadButtonType()}
            onClick={handleSubmit}
            disabled={loading | done}
            clearHandler={clearHandler}
          >
            {done ? 'Done' : error ? 'Ошибка' : 'Начать генерацию'}
          </UploadButton>
        )}
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
