import React from "react";
import { createPortal } from "react-dom";
import Modal from "../../components/Modal/Modal";
import styles from './HistoryPage.module.css'; // Твои CSS Module стили
import FileStatus from "./FileStatus/FileStatus";
import CardsVertical from "../GenerationPage/CardsVertical/CardsVertical";


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


const HistoryPage = () => {
  const handleGenerate = () => {}
  const handleClear = () => {}


  return (
    <div>

      <div>
        {/* Пример успешной обработки */}
        <div>
          <FileStatus
            fileName="file_uploaded_1.csv"
            date="22.05.2025"
            status="Обработан успешно"
            isSuccessful={true}
          />
          <button className={styles.trash_button}><img src="trash.svg" alt="" /></button>
        </div>

        {/* Пример неудачной обработки */}
        <div>
        <FileStatus
          fileName="file_uploaded_2.csv"
          date="23.05.2025"
          status="Не удалось обработать"
          isSuccessful={false}
        />
        <button className={styles.trash_button}><img src="trash.svg" alt="" /></button>
        </div>
      </div>

      <button className={styles.clearButton} onClick={handleGenerate}>
        Сгенерировать больше
      </button>
      <button className={styles.clearButton} onClick={handleClear}>
        Очистить всё
      </button>
      
      {createPortal(
        <CardsVertical cardsData={cardsData}/>,
        document.body
      )}
    </div>
  );
};

export default HistoryPage;
