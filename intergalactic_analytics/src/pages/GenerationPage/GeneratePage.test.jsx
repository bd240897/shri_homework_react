import { render, screen } from '@testing-library/react';
import GenerationPage from './GenerationPage';

describe('GenerationPage', () => {
  test('страница открывается', () => {
    const { container } = render(<GenerationPage />);

    const element = container.querySelector('.generationPage');

    expect(element).toBeInTheDocument();
  });
  test('на странице есть заголовок', () => {
    render(<GenerationPage />);
    const description = screen.getByTestId('page-description');
    expect(description.textContent).toContain(
      'Сгенерируйте готовый CSV-файл нажатием одной кнопки'
    );
  });
  test('на странице есть кнопка загрузки', () => {
    render(<GenerationPage />);

    const uploadButton = screen.getByTestId('upload-button');

    expect(uploadButton).toBeInTheDocument();
  });
});
