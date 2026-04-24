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
    <div className="space-y-5">
      <div className="rounded-xl bg-white p-5 border border-slate-200 shadow-sm">
        <h2 className="text-xl font-semibold">Multi-City Journey Planner</h2>

        <div className="mt-4 space-y-3">
          {cities.map((city, index) => (
            <div key={`${city}-${index}`} className="flex gap-2">
              <select className="rounded-lg border p-2 flex-1" value={city} onChange={(e) => updateCity(index, e.target.value)}>
                {airports.map((airport) => (
                  <option key={airport.code} value={airport.code}>{airport.code} - {airport.city}</option>
                ))}
              </select>
              {cities.length > 2 ? (
                <button onClick={() => removeCity(index)} className="rounded-lg border px-3">Remove</button>
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <button onClick={addCity} className="rounded-lg border px-4 py-2">Add City</button>
          <select className="rounded-lg border p-2" value={optimizeBy} onChange={(e) => setOptimizeBy(e.target.value)}>
            <option value="distance">Distance</option>
            <option value="cost">Cost</option>
            <option value="duration">Duration</option>
          </select>
          <button onClick={handlePlan} className="rounded-lg bg-indigo-600 text-white px-4 py-2">Plan Journey</button>
        </div>
      </div>

      {loading ? <LoadingSpinner /> : null}
      {error ? <p className="text-red-600 text-sm">{error}</p> : null}

      {result ? (
        <div className="space-y-4">
          <div className="rounded-xl bg-white p-5 border border-slate-200 shadow-sm">
            <h3 className="font-semibold">Segment Details</h3>
            <div className="mt-3 space-y-2 text-sm">
              {result.segments.map((segment, idx) => (
                <div key={idx} className="rounded-md bg-slate-50 p-3">
                  <p className="font-medium">{segment.from} → {segment.to}</p>
                  <p className="text-slate-600">Path: {segment.path.join(' → ')}</p>
                  <p className="text-slate-600">Distance: {segment.total_distance} km | Duration: {segment.total_duration} hrs | Cost: ₹{segment.total_cost}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-white p-5 border border-slate-200 shadow-sm">
            <h3 className="font-semibold">Combined Summary</h3>
            <p className="mt-2 text-sm text-slate-700">Distance: {result.summary.total_distance} km</p>
            <p className="text-sm text-slate-700">Duration: {result.summary.total_duration} hrs</p>
            <p className="text-sm text-slate-700">Cost: ₹{result.summary.total_cost}</p>
            <p className="text-sm text-slate-700">Flights: {result.summary.flights_count}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
