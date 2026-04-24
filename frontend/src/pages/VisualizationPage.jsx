import { useEffect, useMemo, useState } from 'react';
import Plot from 'react-plotly.js';
import LoadingSpinner from '../components/LoadingSpinner';
import { fetchAirports, fetchRoutes } from '../services/api';

export default function VisualizationPage() {
  const [airports, setAirports] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [selectedFrom, setSelectedFrom] = useState('DEL');
  const [selectedTo, setSelectedTo] = useState('BLR');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([fetchAirports(), fetchRoutes()])
      .then(([a, r]) => {
        setAirports(a);
        setRoutes(r);
      })
      .catch(() => setError('Failed to load visualization data.'))
      .finally(() => setLoading(false));
  }, []);

  const positions = useMemo(() => {
    const map = {};
    const radius = 10;
    airports.forEach((airport, idx) => {
      const angle = (2 * Math.PI * idx) / airports.length;
      map[airport.code] = {
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle),
      };
    });
    return map;
  }, [airports]);

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

  const highlighted = new Set([
    `${selectedFrom}-${selectedTo}`,
    `${selectedTo}-${selectedFrom}`,
  ]);

  const edgeTraces = routes.map((route) => {
    const a = positions[route.source];
    const b = positions[route.destination];
    const isHighlight = highlighted.has(
      `${route.source}-${route.destination}`
    );

    return {
      x: [a.x, b.x],
      y: [a.y, b.y],
      mode: 'lines',
      type: 'scatter',
      hoverinfo: 'text',
      text: `${route.source} → ${route.destination}<br>${route.distance} km, ₹${route.cost}`,
      line: {
        color: isHighlight ? '#6366F1' : '#E2E8F0',
        width: isHighlight ? 4 : 1.5,
      },
      opacity: isHighlight ? 1 : 0.5,
      showlegend: false,
    };
  });

  const nodeTrace = {
    x: airports.map((airport) => positions[airport.code].x),
    y: airports.map((airport) => positions[airport.code].y),
    mode: 'markers+text',
    type: 'scatter',
    text: airports.map((airport) => airport.code),
    textposition: 'top center',
    marker: {
      size: airports.map((a) =>
        a.code === selectedFrom || a.code === selectedTo ? 18 : 12
      ),
      color: airports.map((a) =>
        a.code === selectedFrom || a.code === selectedTo
          ? '#6366F1'
          : '#0F172A'
      ),
    },
    hovertext: airports.map(
      (airport) => `${airport.code} - ${airport.city}`
    ),
    hoverinfo: 'text',
    showlegend: false,
  };

  return (
    <div className="space-y-8">

      {/* 🔥 Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          🌐 Network Visualization
        </h1>
        <p className="text-gray-500 text-sm">
          Explore airport connectivity and highlighted optimal routes
        </p>
      </div>

      {/* 🎛️ Controls */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-wrap gap-4 items-center">

        <div>
          <label className="text-sm text-gray-500">From</label>
          <select
            className="block mt-1 rounded-xl border border-gray-200 p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            value={selectedFrom}
            onChange={(e) => setSelectedFrom(e.target.value)}
          >
            {airports.map((airport) => (
              <option key={airport.code} value={airport.code}>
                {airport.code}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-500">To</label>
          <select
            className="block mt-1 rounded-xl border border-gray-200 p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            value={selectedTo}
            onChange={(e) => setSelectedTo(e.target.value)}
          >
            {airports.map((airport) => (
              <option key={airport.code} value={airport.code}>
                {airport.code}
              </option>
            ))}
          </select>
        </div>

        <div className="ml-auto text-sm text-gray-500">
          Highlighted route shown in <span className="text-indigo-500 font-semibold">purple</span>
        </div>
      </div>

      {/* 📊 Graph */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 hover:shadow-xl transition-all">

        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          Flight Network Graph ✈️
        </h2>

        <Plot
          data={[...edgeTraces, nodeTrace]}
          layout={{
            height: 580,
            autosize: true,
            margin: { l: 10, r: 10, b: 10, t: 10 },
            xaxis: { visible: false },
            yaxis: { visible: false },
            paper_bgcolor: '#ffffff',
            plot_bgcolor: '#ffffff',
          }}
          config={{
            responsive: true,
            displaylogo: false,
            scrollZoom: true,
          }}
          style={{ width: '100%' }}
        />
      </div>
    </div>
  );
}