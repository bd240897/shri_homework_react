// моковые данные с бека
export const mock_values = {
  total_spend_galactic: 0,
  rows_affected: 130000,
  less_spent_at: 36,
  big_spent_at: 36,
  less_spent_value: 0,
  big_spent_value: 0,
  average_spend_galactic: 0,
  big_spent_civ: 'humans',
  less_spent_civ: 'humans',
};

/**
 * TypeGuard
 */
export const isResult = (result) => {
  const flag =
    result &&
    typeof result === 'object' &&
    'total_spend_galactic' in result &&
    typeof result.total_spend_galactic === 'number';
  return Boolean(flag);
};
