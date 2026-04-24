import { Navigate, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import AnalysisPage from './pages/AnalysisPage';
import DataManagementPage from './pages/DataManagementPage';
import MultiCityPage from './pages/MultiCityPage';
import RoutePlannerPage from './pages/RoutePlannerPage';
import VisualizationPage from './pages/VisualizationPage';

export default function App() {
  return (
    <div className="md:flex min-h-screen bg-slate-100">
      <Sidebar />
      <main className="flex-1 p-6">
        <Routes>
          <Route path="/" element={<RoutePlannerPage />} />
          <Route path="/multi-city" element={<MultiCityPage />} />
          <Route path="/analysis" element={<AnalysisPage />} />
          <Route path="/data" element={<DataManagementPage />} />
          <Route path="/visualization" element={<VisualizationPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
