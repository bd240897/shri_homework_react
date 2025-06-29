import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { vi } from 'vitest';
import ParsingPage from './ParsingPage';
import * as parsingUtils from './utils';

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

describe('ParsingPage', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('страница открывается', () => {
    const { container } = render(<ParsingPage />);

    const element = container.querySelector('.parsingPage');

    expect(element).toBeInTheDocument();
  });
  test('на странице есть заголовок', () => {
    render(<ParsingPage />);
    const description = screen.getByTestId('page-description');
    expect(description.textContent).toContain('о нём за сверхнизкое врем');
  });
  test('на странице есть кнопка загрузки', () => {
    render(<ParsingPage />);

    const uploadButton = screen.getByTestId('submit-button');

    expect(uploadButton).toBeInTheDocument();
  });
  test('после загрузки и отправки файла кнопка отправки становится активной', async () => {
    // Рендерим компонент
    render(<ParsingPage />);

    // Находим кнопку "Отправить"
    const submitButton = screen.getByTestId('submit-button');
    expect(submitButton).toHaveAttribute('disabled'); // изначально disabled

    // Находим скрытое поле загрузки файла
    const fileInput = screen.getByTestId('file-input'); // input#fileInput

    // Подготавливаем CSV-файл
    const file = new File(['col1,col2\nval1,val2'], 'test.csv', {
      type: 'text/csv',
    });

    // Загружаем файл
    await userEvent.upload(fileInput, file);

    // После загрузки ожидаем, что кнопка станет активной
    expect(submitButton).not.toHaveAttribute('disabled');
    expect(submitButton).toBeEnabled();
  });
  test('появляются highlights при наличии результата парсинга', async () => {
    vi.spyOn(parsingUtils, 'isResult').mockImplementation((result) => {
      return true;
    });

    vi.spyOn(React, 'useState').mockImplementationOnce(() => [
      mockResult,
      vi.fn(),
    ]);

    render(<ParsingPage />);

    // Проверяем, что блок с результатами отобразился
    await waitFor(() => {
      const highlightsBlock = screen.getByTestId('highlights');
      expect(highlightsBlock).toBeInTheDocument();
    });
  });
});
