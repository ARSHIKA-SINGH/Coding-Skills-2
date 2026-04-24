import { BarChart3, Database, GitBranch, PlaneTakeoff, Route } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Route Planner', icon: Route },
  { to: '/multi-city', label: 'Multi-City', icon: PlaneTakeoff },
  { to: '/analysis', label: 'Analysis', icon: BarChart3 },
  { to: '/data', label: 'Data Management', icon: Database },
  { to: '/visualization', label: 'Visualization', icon: GitBranch },
];

export default function Sidebar() {
  return (
    <aside className="w-full md:w-72 bg-gradient-to-b from-[#0F172A] to-[#1E293B] text-white p-5 md:min-h-screen shadow-xl">

      {/* Logo / Title */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold tracking-wide flex items-center gap-2">
          ✈️ Flight Planner
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Smart Route Optimization
        </p>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            {/* Icon */}
            <Icon
              size={18}
              className="transition-transform duration-200 group-hover:scale-110"
            />

            {/* Label */}
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom Section (optional branding) */}
      <div className="mt-12 p-4 rounded-xl bg-white/5 text-xs text-slate-400">
        🚀 Built with React + FastAPI  
      </div>

    </aside>
  );
}