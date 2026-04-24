export default function RouteResultCard({ title = 'Result', data }) {
  if (!data) {
    return null;
  }

  return (
    <div className="rounded-xl bg-white p-5 shadow-md border border-indigo-200">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-indigo-700 font-medium break-words">{data.path.join(' → ')}</p>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
        <div className="rounded-lg bg-indigo-50 p-3 border border-indigo-100">
          <p className="text-slate-500">Total Distance</p>
          <p className="font-semibold">{data.total_distance} km</p>
        </div>
        <div className="rounded-lg bg-indigo-50 p-3 border border-indigo-100">
          <p className="text-slate-500">Total Duration</p>
          <p className="font-semibold">{data.total_duration} hrs</p>
        </div>
        <div className="rounded-lg bg-indigo-50 p-3 border border-indigo-100">
          <p className="text-slate-500">Total Cost</p>
          <p className="font-semibold">₹{data.total_cost}</p>
        </div>
      </div>
    </div>
  );
}
