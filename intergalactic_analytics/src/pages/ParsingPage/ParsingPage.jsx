import React from "react";
import Button from "../../components/Button/Button";
import styles from './ParsingPage.module.css'; 

const ParsingPage = () => {
  const isGenerate = true
  const isDone = true
  const isError = true
  return (
    <div className={styles.text}>
      <div>Сгенерируйте готовый csv-файл нажатием одной кнопки</div>
      <button>Начать генерацию</button>
      <button>
        <img className={styles.clear_button} src="clear_button.svg"/>
      </button>
      
      {isGenerate && <div>идёт процесс генерации</div>}
      {isDone && <div>файл сгенерирован!</div>}
      {isError && <div>упс, не то...</div>}
    </div>
  );
};

export default ParsingPage;
