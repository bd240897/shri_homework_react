import { generateId } from '../../share/utils';

export const history_mock = [
  {
    id: generateId(),
    filename: '1234.csv',
    isSuccessful: true,
    date: '21-06-25',
    data: {
      total_spend_galactic: 0,
      rows_affected: 130000,
      less_spent_at: 36,
      big_spent_at: 36,
      less_spent_value: 0,
      big_spent_value: 0,
      average_spend_galactic: 0,
      big_spent_civ: 'humans',
      less_spent_civ: 'humans',
    },
  },
];
