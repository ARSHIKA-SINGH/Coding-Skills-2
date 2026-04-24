export default function StatCard({ title, value, subtitle }) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm border border-slate-200">
      <p className="text-sm text-slate-500">{title}</p>
      <p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p>
      {subtitle ? <p className="mt-1 text-xs text-slate-400">{subtitle}</p> : null}
    </div>
  );
}
