import { Navigate, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import AnalysisPage from './pages/AnalysisPage';
import DataManagementPage from './pages/DataManagementPage';
import MultiCityPage from './pages/MultiCityPage';
import RoutePlannerPage from './pages/RoutePlannerPage';
import VisualizationPage from './pages/VisualizationPage';

export default function App() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-200">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        
        {/* Top Navbar */}
        <div className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800">
            ✈️ Indian Flight Planner
          </h1>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">
              Welcome 👋
            </span>
            <div className="w-8 h-8 bg-indigo-500 text-white flex items-center justify-center rounded-full">
              S
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<RoutePlannerPage />} />
              <Route path="/multi-city" element={<MultiCityPage />} />
              <Route path="/analysis" element={<AnalysisPage />} />
              <Route path="/data" element={<DataManagementPage />} />
              <Route path="/visualization" element={<VisualizationPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>

      </main>
    </div>
  );
}