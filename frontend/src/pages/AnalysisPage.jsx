import { useEffect, useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import StatCard from '../components/StatCard';
import { fetchAnalysis } from '../services/api';

export default function AnalysisPage() {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAnalysis()
      .then(setAnalysis)
      .catch(() => setError('Failed to load network analytics.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex justify-center mt-10">
        <LoadingSpinner />
      </div>
    );

  if (error)
    return (
      <div className="bg-red-50 text-red-600 p-3 rounded-lg border border-red-200 text-sm">
        {error}
      </div>
    );

  return (
    <div className="space-y-8">

      {/* 🔥 Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          📊 Network Analysis Dashboard
        </h1>
        <p className="text-gray-500 text-sm">
          Insights and performance metrics of the flight network
        </p>
      </div>

      {/* 📈 Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

        <StatCard
          title="Connected Routes"
          value={analysis.total_connected_routes}
          icon="✈️"
        />

        <StatCard
          title="Average Distance"
          value={`${analysis.average_distance} km`}
          icon="📏"
        />

        <StatCard
          title="Average Duration"
          value={`${analysis.average_duration} hrs`}
          icon="⏱️"
        />

        <StatCard
          title="Average Cost"
          value={`₹${analysis.average_cost}`}
          icon="💰"
        />

      </div>

      {/* 🧠 Insights Section */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">

        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          🧠 Key Insights
        </h2>

        <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5">
          <li>
            The network consists of <span className="font-semibold">{analysis.total_connected_routes}</span> active routes.
          </li>
          <li>
            Average travel distance is <span className="font-semibold">{analysis.average_distance} km</span>.
          </li>
          <li>
            Typical journey duration is around <span className="font-semibold">{analysis.average_duration} hours</span>.
          </li>
          <li>
            Average travel cost is approximately <span className="font-semibold">₹{analysis.average_cost}</span>.
          </li>
        </ul>

      </div>
    </div>
  );
}