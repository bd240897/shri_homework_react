import { BrowserRouter, Route, Routes } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import GenerationPage from '../pages/GenerationPage/GenerationPage';
import HistoryPage from '../pages/HistoryPage/HistoryPage';
import ParsingPage from '../pages/ParsingPage/ParsingPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/parsing" element={<ParsingPage />} />
        <Route path="/generation" element={<GenerationPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Route>
    </Routes>
  );
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default AppRouter;
export { AppRoutes, AppRouter };
