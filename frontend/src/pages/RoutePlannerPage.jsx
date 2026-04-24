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

      const [distanceResult, costResult, durationResult] = await Promise.all(
        optimizeOptions.map((metric) =>
          findRoute({ source, destination, optimize_by: metric })
        )
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
    <div className="space-y-8">

      {/* 🔥 Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">✈️ Route Planner</h1>
        <p className="text-gray-500 text-sm">
          Find the most efficient flight route using intelligent optimization
        </p>
      </div>

      {/* 🔥 Input Card */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-xl transition-all">

        <div className="grid md:grid-cols-4 gap-4 items-end">

          {/* Source */}
          <div>
            <label className="text-sm text-gray-500">From</label>
            <select
              className="w-full mt-1 rounded-xl border border-gray-200 p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              value={source}
              onChange={(e) => setSource(e.target.value)}
            >
              {airports.map((airport) => (
                <option key={airport.code} value={airport.code}>
                  {airport.code} - {airport.city}
                </option>
              ))}
            </select>
          </div>

          {/* Destination */}
          <div>
            <label className="text-sm text-gray-500">To</label>
            <select
              className="w-full mt-1 rounded-xl border border-gray-200 p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            >
              {airports.map((airport) => (
                <option key={airport.code} value={airport.code}>
                  {airport.code} - {airport.city}
                </option>
              ))}
            </select>
          </div>

          {/* Optimize */}
          <div>
            <label className="text-sm text-gray-500">Optimize By</label>
            <select
              className="w-full mt-1 rounded-xl border border-gray-200 p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              value={optimizeBy}
              onChange={(e) => setOptimizeBy(e.target.value)}
            >
              {optimizeOptions.map((metric) => (
                <option key={metric} value={metric}>
                  {metric.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          {/* Button */}
          <button
            onClick={handleFindRoute}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-xl font-semibold hover:scale-105 transition-all shadow-md"
          >
            🚀 Find Route
          </button>
        </div>
      </div>

      {/* 🔄 Loading */}
      {loading && (
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      )}

      {/* ❌ Error */}
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-200">
          {error}
        </div>
      )}

      {/* ✅ Best Route */}
      {result && (
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-gray-800">Best Route</h2>
            <span className="bg-indigo-500 text-white px-3 py-1 rounded-full text-xs">
              OPTIMAL
            </span>
          </div>

          <RouteResultCard data={result} />
        </div>
      )}

      {/* 📊 Comparison */}
      {comparison && (
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Compare Optimization Strategies
          </h2>

          <div className="grid md:grid-cols-3 gap-5">
            <RouteResultCard title="Distance" data={comparison.distanceResult} />
            <RouteResultCard title="Cost" data={comparison.costResult} />
            <RouteResultCard title="Duration" data={comparison.durationResult} />
          </div>
        </div>
      )}
    </div>
  );
}