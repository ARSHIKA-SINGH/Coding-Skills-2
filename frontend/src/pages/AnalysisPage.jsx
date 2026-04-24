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

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-red-600 text-sm">{error}</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Network Analysis Dashboard</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Connected Routes" value={analysis.total_connected_routes} />
        <StatCard title="Average Distance" value={`${analysis.average_distance} km`} />
        <StatCard title="Average Duration" value={`${analysis.average_duration} hrs`} />
        <StatCard title="Average Cost" value={`₹${analysis.average_cost}`} />
      </div>
    </div>
  );
}
