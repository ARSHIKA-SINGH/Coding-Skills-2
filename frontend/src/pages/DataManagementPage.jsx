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
        <h1 className="text-2xl font-bold text-gray-800">📂 Data Management</h1>
        <p className="text-gray-500 text-sm">
          View and manage airport and route datasets
        </p>
      </div>

      {/* ✈️ Airports Table */}
      <section className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 overflow-auto hover:shadow-lg transition">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Airports</h2>
          <span className="text-sm text-gray-500">{airports.length} records</span>
        </div>

        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="p-3">Code</th>
              <th className="p-3">City</th>
              <th className="p-3">Airport Name</th>
            </tr>
          </thead>

          <tbody>
            {airports.map((airport) => (
              <tr
                key={airport.code}
                className="border-b last:border-none hover:bg-slate-50 transition"
              >
                <td className="p-3 font-semibold text-indigo-600">
                  {airport.code}
                </td>
                <td className="p-3">{airport.city}</td>
                <td className="p-3 text-gray-600">{airport.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* 🛫 Routes Table */}
      <section className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 overflow-auto hover:shadow-lg transition">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Routes</h2>
          <span className="text-sm text-gray-500">{routes.length} records</span>
        </div>

        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="p-3">From</th>
              <th className="p-3">To</th>
              <th className="p-3">Distance</th>
              <th className="p-3">Duration</th>
              <th className="p-3">Cost</th>
            </tr>
          </thead>

          <tbody>
            {routes.map((route, idx) => (
              <tr
                key={idx}
                className="border-b last:border-none hover:bg-slate-50 transition"
              >
                <td className="p-3 font-medium">{route.source}</td>
                <td className="p-3 font-medium">{route.destination}</td>
                <td className="p-3 text-gray-600">{route.distance} km</td>
                <td className="p-3 text-gray-600">{route.duration} hrs</td>
                <td className="p-3 text-indigo-600 font-semibold">
                  ₹{route.cost}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}