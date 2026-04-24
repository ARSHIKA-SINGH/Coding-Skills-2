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
    <aside className="w-full md:w-72 bg-slate-900 text-white p-5 md:min-h-screen">
      <h1 className="text-xl font-bold">Indian Flight Planner</h1>
      <p className="text-xs text-slate-300 mt-1">Domestic Route Optimization</p>

      <nav className="mt-8 space-y-2">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                isActive ? 'bg-indigo-500 text-white' : 'text-slate-200 hover:bg-slate-800'
              }`
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
