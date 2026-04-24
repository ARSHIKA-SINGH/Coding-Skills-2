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

  const codeToIndex = useMemo(() => Object.fromEntries(airports.map((a, i) => [a.code, i])), [airports]);

  const positions = useMemo(() => {
    const map = {};
    const radius = 10;
    airports.forEach((airport, idx) => {
      const angle = (2 * Math.PI * idx) / airports.length;
      map[airport.code] = { x: radius * Math.cos(angle), y: radius * Math.sin(angle) };
    });
    return map;
  }, [airports]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-red-600 text-sm">{error}</p>;

  const highlighted = new Set([`${selectedFrom}-${selectedTo}`, `${selectedTo}-${selectedFrom}`]);

  const edgeTraces = routes.map((route) => {
    const a = positions[route.source];
    const b = positions[route.destination];
    const isHighlight = highlighted.has(`${route.source}-${route.destination}`);
    return {
      x: [a.x, b.x],
      y: [a.y, b.y],
      mode: 'lines',
      type: 'scatter',
      hoverinfo: 'text',
      text: `${route.source} → ${route.destination}<br>${route.distance} km, ₹${route.cost}`,
      line: { color: isHighlight ? '#4f46e5' : '#cbd5e1', width: isHighlight ? 3 : 1 },
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
    marker: { size: airports.map((a) => (a.code === selectedFrom || a.code === selectedTo ? 16 : 12)), color: '#0f172a' },
    hovertext: airports.map((airport) => `${airport.code} - ${airport.city}`),
    hoverinfo: 'text',
    showlegend: false,
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-white p-5 border border-slate-200 shadow-sm">
        <h2 className="text-xl font-semibold">Network Visualization</h2>
        <p className="text-sm text-slate-500">Graph view of airport connectivity. Selected route is highlighted.</p>
        <div className="mt-3 flex gap-2">
          <select className="rounded border p-2" value={selectedFrom} onChange={(e) => setSelectedFrom(e.target.value)}>
            {airports.map((airport) => (<option key={airport.code} value={airport.code}>{airport.code}</option>))}
          </select>
          <select className="rounded border p-2" value={selectedTo} onChange={(e) => setSelectedTo(e.target.value)}>
            {airports.map((airport) => (<option key={airport.code} value={airport.code}>{airport.code}</option>))}
          </select>
        </div>
      </div>

      <div className="rounded-xl bg-white p-2 border border-slate-200 shadow-sm">
        <Plot
          data={[...edgeTraces, nodeTrace]}
          layout={{
            height: 560,
            autosize: true,
            margin: { l: 10, r: 10, b: 10, t: 10 },
            xaxis: { visible: false },
            yaxis: { visible: false },
            paper_bgcolor: '#ffffff',
            plot_bgcolor: '#ffffff',
          }}
          config={{ responsive: true, displaylogo: false }}
          style={{ width: '100%' }}
        />
      </div>
    </div>
  );
}
