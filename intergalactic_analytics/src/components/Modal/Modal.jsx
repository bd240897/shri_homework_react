import React from "react";
import Item from "./Item/Item";

const mapText = {
  total_spend_galactic: "Общие расходы в галактических кредитах",
  rows_affected: "Количество обработанных записей",
  less_spent_at: "День с минимальными расходами",
  big_spent_at: "День с максимальными расходами",
  big_spent_value: "Максимальные расходы за день",
  average_spend_galactic: "Средние расходы в галактических кредитах",
  big_spent_civ: "Цивилизация с минимальными расходами",
  less_spent_civ: "Цивилизация с максимальными расходами",
  less_spent_value: "1234",
};

const data = {
  total_spend_galactic: "1000",
  rows_affected: "1",
  less_spent_at: "11-11",
  big_spent_at: "11-11",
  big_spent_value: "1",
  average_spend_galactic: "1",
  big_spent_civ: "dima",
  less_spent_civ: "dima",
  less_spent_value: "1234",
};

const Modal = (props) => {
  props = { ...props, ...data };

  return (
    <div>
      <Item
        text={mapText.total_spend_galactic}
        value={props.total_spend_galactic}
      />
      <Item text={mapText.rows_affected} value={props.rows_affected} />
      <Item text={mapText.less_spent_at} value={props.less_spent_at} />
      <Item text={mapText.big_spent_at} value={props.big_spent_at} />
      <Item
        text={mapText.average_spend_galactic}
        value={props.average_spend_galactic}
      />
      <Item text={mapText.big_spent_civ} value={props.big_spent_civ} />
      <Item text={mapText.less_spent_civ} value={props.less_spent_civ} />
n    </div>
  );
};

export default Modal;
