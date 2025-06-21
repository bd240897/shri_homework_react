/**
 * Вывод даты от 0-365 к виде дата-дент
 */
export function parseDayOfYearToMonthDay(dayOfYear) {
  if (typeof dayOfYear !== 'number' || dayOfYear < 1 || dayOfYear > 365) {
    throw new Error('Введите число от 1 до 365');
  }

  // Берём невисокосный год (например, 2023)
  const year = 2023;
  const date = new Date(year, 0); // 1 января 2023
  date.setDate(dayOfYear);

  const options = { day: 'numeric', month: 'long' };
  return date.toLocaleDateString('ru-RU', options);
}

/**
 * Текушая лаиа в формате день-месяц-год
 */
export function getCurrentDateFormatted() {
  const now = new Date();

  const day = String(now.getDate()).padStart(2, '0'); // Добавляем ведущий 0, если день < 10
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
  const year = now.getFullYear();

  return `${day}-${month}-${year}`;
}

export function generateId() {
  return 'id' + Math.random().toString(16).slice(2);
}
