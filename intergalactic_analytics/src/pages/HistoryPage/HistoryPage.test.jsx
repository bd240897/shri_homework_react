import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { vi } from 'vitest';
import HistoryPage from './HistoryPage';

import { expect } from 'vitest';
const mockResult = {
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

// Мокаем useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('HistoryPage', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test('страница открывается', () => {
    const { container } = render(<HistoryPage />);

    const element = container.querySelector('.historyPage');
    expect(element).toBeInTheDocument();

    // Проверяем что элементы истории отображаются
    expect(screen.getByText('Сгенерировать больше')).toBeInTheDocument();
    expect(screen.getByText('Очистить всё')).toBeInTheDocument();
  });

  test('на странице есть кнопка сгенерировать больше', () => {
    render(
      <MemoryRouter>
        <HistoryPage />
      </MemoryRouter>
    );

    const generateButton = screen.getByTestId('generate-button');

    expect(generateButton).toBeInTheDocument();
  });
  test('на странице есть кнопка очистки при наличии истории', () => {
    // Подготовка моков перед тестом
    const mockNavigate = vi.fn();

    // Мокаем react-router
    vi.mock('react-router', async () => {
      const actual = await vi.importActual('react-router');
      return {
        ...actual,
        useNavigate: () => vi.fn(),
      };
    });

    // Мокаем store
    vi.mock('../../store', () => ({
      useStore: () => ({
        history: [
          {
            id: '1',
            filename: 'data.csv',
            date: '2023-01-01',
            isSuccessful: true,
            data: mockResult,
          },
        ],
        clearHistory: vi.fn(),
        deleteHistoryItem: vi.fn(),
      }),
    }));

    // Рендерим компонент
    render(
      <MemoryRouter>
        <HistoryPage />
      </MemoryRouter>
    );

    // Проверяем наличие кнопки
    const clearButton = screen.getByTestId('clear-button');
    expect(clearButton).toBeInTheDocument();
  });
});
