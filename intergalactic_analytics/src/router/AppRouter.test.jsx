import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { AppRoutes } from './AppRouter';

const pages = [
  { path: '/parsing', className: '.parsingPage', name: 'ParsingPage' },
  { path: '/history', className: '.historyPage', name: 'HistoryPage' },
  { path: '/generation', className: '.generationPage', name: 'GenerationPage' },
];

describe('AppRouter', () => {
  it.each(pages)(
    'должен рендерить $name по пути $path',
    ({ path, className }) => {
      const { container } = render(
        <MemoryRouter initialEntries={[path]}>
          <AppRoutes />
        </MemoryRouter>
      );

      const element = container.querySelector(className);
      expect(element).toBeInTheDocument();
    }
  );
});
