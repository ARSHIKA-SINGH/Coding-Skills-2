export default function RouteResultCard({ title = 'Result', data }) {
  if (!data) return null;

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100 p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full">
          Route
        </span>
      </div>

      {/* Route Path */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl p-4 text-sm text-indigo-700 font-medium">
        ✈️ {data.path.join(' → ')}
      </div>

      {/* Metrics */}
      <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">

        {/* Distance */}
        <div className="rounded-xl bg-slate-50 p-4 text-center hover:bg-indigo-50 transition">
          <p className="text-gray-500 text-xs">Distance</p>
          <p className="font-semibold text-gray-800">{data.total_distance} km</p>
        </div>

        {/* Duration */}
        <div className="rounded-xl bg-slate-50 p-4 text-center hover:bg-indigo-50 transition">
          <p className="text-gray-500 text-xs">Duration</p>
          <p className="font-semibold text-gray-800">{data.total_duration} hrs</p>
        </div>

        {/* Cost */}
        <div className="rounded-xl bg-slate-50 p-4 text-center hover:bg-indigo-50 transition">
          <p className="text-gray-500 text-xs">Cost</p>
          <p className="font-semibold text-gray-800">₹{data.total_cost}</p>
        </div>

        {/* Flights */}
        <div className="rounded-xl bg-slate-50 p-4 text-center hover:bg-indigo-50 transition">
          <p className="text-gray-500 text-xs">Flights</p>
          <p className="font-semibold text-gray-800">{data.flights_count}</p>
        </div>

      </div>
    </div>
  );
}