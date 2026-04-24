export default function RouteResultCard({ title = 'Result', data }) {
  if (!data) {
    return null;
  }

  return (
    <div className="rounded-xl bg-white p-5 shadow-sm border border-slate-200">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-indigo-700 font-medium">{data.path.join(' → ')}</p>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
        <div className="rounded-md bg-slate-50 p-3">
          <p className="text-slate-500">Distance</p>
          <p className="font-semibold">{data.total_distance} km</p>
        </div>
        <div className="rounded-md bg-slate-50 p-3">
          <p className="text-slate-500">Duration</p>
          <p className="font-semibold">{data.total_duration} hrs</p>
        </div>
        <div className="rounded-md bg-slate-50 p-3">
          <p className="text-slate-500">Cost</p>
          <p className="font-semibold">₹{data.total_cost}</p>
        </div>
        <div className="rounded-md bg-slate-50 p-3">
          <p className="text-slate-500">Flights</p>
          <p className="font-semibold">{data.flights_count}</p>
        </div>
      </div>
    </div>
  );
}
