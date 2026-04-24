import { useEffect, useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import { fetchAirports, findMultiCity } from '../services/api';

export default function MultiCityPage() {
  const [airports, setAirports] = useState([]);
  const [cities, setCities] = useState(['DEL', 'BOM', 'BLR']);
  const [optimizeBy, setOptimizeBy] = useState('distance');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAirports().then(setAirports).catch(() => setError('Failed to load airports.'));
  }, []);

  const updateCity = (index, value) => {
    setCities((prev) => prev.map((city, i) => (i === index ? value : city)));
  };

  const addCity = () => setCities((prev) => [...prev, 'DEL']);
  const removeCity = (idx) => setCities((prev) => prev.filter((_, i) => i !== idx));

  const handlePlan = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await findMultiCity({ cities, optimize_by: optimizeBy });
      setResult(data);
    } catch (e) {
      setError(e?.response?.data?.detail || 'Multi-city planning failed.');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">

      {/* 🔥 Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">🌍 Multi-City Planner</h1>
        <p className="text-gray-500 text-sm">
          Plan optimized journeys across multiple destinations
        </p>
      </div>

      {/* 🧭 Planner Card */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">

        {/* Cities List */}
        <div className="space-y-4">
          {cities.map((city, index) => (
            <div key={`${city}-${index}`} className="flex items-center gap-3">

              {/* Step Number */}
              <div className="w-7 h-7 flex items-center justify-center rounded-full bg-indigo-500 text-white text-sm font-semibold">
                {index + 1}
              </div>

              {/* Select */}
              <select
                className="flex-1 rounded-xl border border-gray-200 p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
                value={city}
                onChange={(e) => updateCity(index, e.target.value)}
              >
                {airports.map((airport) => (
                  <option key={airport.code} value={airport.code}>
                    {airport.code} - {airport.city}
                  </option>
                ))}
              </select>

              {/* Remove Button */}
              {cities.length > 2 && (
                <button
                  onClick={() => removeCity(index)}
                  className="text-red-500 hover:bg-red-50 px-3 py-2 rounded-lg transition"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="mt-6 flex flex-wrap items-center gap-4">

          <button
            onClick={addCity}
            className="bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl text-sm font-medium transition"
          >
            ➕ Add City
          </button>

          <select
            className="rounded-xl border border-gray-200 p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            value={optimizeBy}
            onChange={(e) => setOptimizeBy(e.target.value)}
          >
            <option value="distance">Distance</option>
            <option value="cost">Cost</option>
            <option value="duration">Duration</option>
          </select>

          <button
            onClick={handlePlan}
            className="ml-auto bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 rounded-xl font-semibold hover:scale-105 transition shadow-md"
          >
            🚀 Plan Journey
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg border border-red-200 text-sm">
          {error}
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="space-y-6">

          {/* Segment Details */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              ✈️ Segment Details
            </h2>

            <div className="space-y-3">
              {result.segments.map((segment, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl p-4"
                >
                  <p className="font-semibold text-gray-800">
                    {segment.from} → {segment.to}
                  </p>
                  <p className="text-sm text-gray-600">
                    Path: {segment.path.join(' → ')}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {segment.total_distance} km • {segment.total_duration} hrs • ₹{segment.total_cost}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              📊 Journey Summary
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">

              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-gray-500">Distance</p>
                <p className="font-semibold">{result.summary.total_distance} km</p>
              </div>

              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-gray-500">Duration</p>
                <p className="font-semibold">{result.summary.total_duration} hrs</p>
              </div>

              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-gray-500">Cost</p>
                <p className="font-semibold">₹{result.summary.total_cost}</p>
              </div>

              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-gray-500">Flights</p>
                <p className="font-semibold">{result.summary.flights_count}</p>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}