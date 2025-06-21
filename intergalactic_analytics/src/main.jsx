import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import MainLayout from './layouts/MainLayout';
import GenerationPage from './pages/GenerationPage/GenerationPage';
import HistoryPage from './pages/HistoryPage/HistoryPage';
import ParsingPage from './pages/ParsingPage/ParsingPage';

const root = document.getElementById('root');

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/parsing" element={<ParsingPage />} />
        <Route path="/generation" element={<GenerationPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
