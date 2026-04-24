export default function StatCard({ title, value, subtitle, icon }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100 p-5">

      <div className="flex items-center justify-between">
        
        {/* Text Section */}
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h2 className="text-2xl font-bold text-gray-800 mt-1">
            {value}
          </h2>

          {subtitle && (
            <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
          )}
        </div>

        {/* Icon Section */}
        {icon && (
          <div className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-600 p-3 rounded-xl text-lg shadow-sm">
            {icon}
          </div>
        )}

      </div>
    </div>
  );
}