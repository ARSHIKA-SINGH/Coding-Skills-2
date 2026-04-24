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
    if (source === destination) {
      return;
    }
    setLoading(true);
    setError('');
    setComparison(null);
    try {
      const data = await findRoute({ source, destination, optimize_by: optimizeBy });
      setResult(data.shortest || null);
      setComparison({
        distanceResult: data.shortest,
        durationResult: data.fastest,
        costResult: data.cheapest,
      });
    } catch (e) {
      setError(e?.response?.data?.detail || 'Route search failed.');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSwap = () => {
    setSource(destination);
    setDestination(source);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-white p-5 border border-slate-200 shadow-sm">
        <h2 className="text-xl font-semibold">Route Planner</h2>
        <p className="text-sm text-slate-500 mt-1">Find shortest route using Floyd-Warshall optimization.</p>

        <div className="mt-4 grid md:grid-cols-5 gap-3">
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
          <button onClick={handleSwap} className="rounded-lg border border-indigo-200 bg-indigo-50 text-indigo-700 px-4 py-2 hover:bg-indigo-100">
            Swap ↔
          </button>
          <select className="rounded-lg border p-2" value={optimizeBy} onChange={(e) => setOptimizeBy(e.target.value)}>
            {optimizeOptions.map((metric) => (
              <option key={metric} value={metric}>{metric.toUpperCase()}</option>
            ))}
          </select>
          <button
            onClick={handleFindRoute}
            disabled={source === destination || loading}
            className="rounded-lg bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed"
          >
            {loading ? 'Finding...' : 'Find Route'}
          </button>
        </div>

        {source === destination ? <p className="mt-2 text-xs text-amber-600">Source and destination cannot be the same.</p> : null}
      </div>

      {loading ? <LoadingSpinner /> : null}
      {error ? <p className="text-red-600 text-sm">{error}</p> : null}
      {!comparison && result ? <RouteResultCard title="Shortest Route" data={result} /> : null}

      {comparison ? (
        <div className="grid md:grid-cols-3 gap-4">
          <RouteResultCard title="Shortest Route" data={comparison.distanceResult} />
          <RouteResultCard title="Fastest Route" data={comparison.durationResult} />
          <RouteResultCard title="Cheapest Route" data={comparison.costResult} />
        </div>
      ) : null}
    </div>
  );
}
