import { useEffect, useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import RouteResultCard from '../components/RouteResultCard';
import { fetchAirports, findRoute } from '../services/api';

const optimizeOptions = ['distance', 'cost', 'duration'];

export default function RoutePlannerPage() {
  const [airports, setAirports] = useState([]);
  const [source, setSource] = useState('DEL');
  const [destination, setDestination] = useState('BLR');
  const [optimizeBy, setOptimizeBy] = useState('distance');
  const [result, setResult] = useState(null);
  const [comparison, setComparison] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAirports().then(setAirports).catch(() => setError('Failed to load airports.'));
  }, []);

  const handleFindRoute = async () => {
    setLoading(true);
    setError('');
    setComparison(null);
    try {
      const data = await findRoute({ source, destination, optimize_by: optimizeBy });
      setResult(data);

      // Bonus: compare routes for all metrics.
      const [distanceResult, costResult, durationResult] = await Promise.all(
        optimizeOptions.map((metric) => findRoute({ source, destination, optimize_by: metric })),
      );
      setComparison({ distanceResult, costResult, durationResult });
    } catch (e) {
      setError(e?.response?.data?.detail || 'Route search failed.');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-white p-5 border border-slate-200 shadow-sm">
        <h2 className="text-xl font-semibold">Route Planner</h2>
        <p className="text-sm text-slate-500 mt-1">Find shortest route using Floyd-Warshall optimization.</p>

        <div className="mt-4 grid md:grid-cols-4 gap-3">
          <select className="rounded-lg border p-2" value={source} onChange={(e) => setSource(e.target.value)}>
            {airports.map((airport) => (
              <option key={airport.code} value={airport.code}>{airport.code} - {airport.city}</option>
            ))}
          </select>
          <select className="rounded-lg border p-2" value={destination} onChange={(e) => setDestination(e.target.value)}>
            {airports.map((airport) => (
              <option key={airport.code} value={airport.code}>{airport.code} - {airport.city}</option>
            ))}
          </select>
          <select className="rounded-lg border p-2" value={optimizeBy} onChange={(e) => setOptimizeBy(e.target.value)}>
            {optimizeOptions.map((metric) => (
              <option key={metric} value={metric}>{metric.toUpperCase()}</option>
            ))}
          </select>
          <button onClick={handleFindRoute} className="rounded-lg bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-700">
            Find Route
          </button>
        </div>
      </div>

      {loading ? <LoadingSpinner /> : null}
      {error ? <p className="text-red-600 text-sm">{error}</p> : null}
      {result ? <RouteResultCard title="Best Route" data={result} /> : null}

      {comparison ? (
        <div className="grid md:grid-cols-3 gap-4">
          <RouteResultCard title="Optimized by Distance" data={comparison.distanceResult} />
          <RouteResultCard title="Optimized by Cost" data={comparison.costResult} />
          <RouteResultCard title="Optimized by Duration" data={comparison.durationResult} />
        </div>
      ) : null}
    </div>
  );
}
