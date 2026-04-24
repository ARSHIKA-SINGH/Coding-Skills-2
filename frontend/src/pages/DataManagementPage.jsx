import { useEffect, useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import { fetchAirports, fetchRoutes } from '../services/api';

export default function DataManagementPage() {
  const [airports, setAirports] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([fetchAirports(), fetchRoutes()])
      .then(([airportData, routeData]) => {
        setAirports(airportData);
        setRoutes(routeData);
      })
      .catch(() => setError('Failed to load master data.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-red-600 text-sm">{error}</p>;

  return (
    <div className="space-y-6">
      <section className="rounded-xl bg-white p-5 border border-slate-200 shadow-sm overflow-auto">
        <h2 className="text-xl font-semibold mb-3">Airports</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500 border-b">
              <th className="p-2">Code</th><th className="p-2">City</th><th className="p-2">Airport Name</th>
            </tr>
          </thead>
          <tbody>
            {airports.map((airport) => (
              <tr key={airport.code} className="border-b last:border-none">
                <td className="p-2 font-medium">{airport.code}</td>
                <td className="p-2">{airport.city}</td>
                <td className="p-2">{airport.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="rounded-xl bg-white p-5 border border-slate-200 shadow-sm overflow-auto">
        <h2 className="text-xl font-semibold mb-3">Routes</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500 border-b">
              <th className="p-2">From</th><th className="p-2">To</th><th className="p-2">Distance</th><th className="p-2">Duration</th><th className="p-2">Cost</th>
            </tr>
          </thead>
          <tbody>
            {routes.map((route, idx) => (
              <tr key={idx} className="border-b last:border-none">
                <td className="p-2">{route.source}</td>
                <td className="p-2">{route.destination}</td>
                <td className="p-2">{route.distance} km</td>
                <td className="p-2">{route.duration} hrs</td>
                <td className="p-2">₹{route.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
