import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, LogOut, Zap, ChevronLeft } from 'lucide-react';
import { AR } from '../data/constants';
import { useTasks }     from '../hooks/useTasks';
import { computeStats } from '../utils/helpers';

const NAV_ITEMS = [
  { to: '/dashboard',       icon: LayoutDashboard, label: AR.dashboard, end: true },
];

const Sidebar = ({ collapsed, onToggle }) => {
  const { tasks } = useTasks();
  const stats     = computeStats(tasks);
  const navigate  = useNavigate();

  return (
    <aside className="h-full w-full flex flex-col bg-figma-panel border-l border-figma-border/30 overflow-hidden select-none">

      {/* ── Logo Area ────────────────────────── */}
      <div className={`flex items-center h-20 px-5 border-b border-figma-border/20 shrink-0 ${collapsed ? 'justify-center' : 'gap-4'}`}>
        <div className="w-10 h-10 rounded-2xl bg-figma-primary flex items-center justify-center shrink-0 shadow-md shadow-figma-primary/20">
          <Zap size={20} className="text-white" />
        </div>
        {!collapsed && (
          <div>
            <p className="text-base font-black text-figma-primary leading-none tracking-tight">TaskFlow</p>
            <p className="text-xs text-figma-muted mt-1 font-medium">{AR.appTagline}</p>
          </div>
        )}
      </div>

      {/* ── Nav Links ────────────────────────── */}
      <nav className="flex-1 py-6 px-3 flex flex-col gap-1.5 overflow-y-auto">
        {NAV_ITEMS.map(({ to, icon: Icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) => `
              flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-150 cursor-pointer
              ${collapsed ? 'justify-center' : ''}
              ${isActive
                ? 'bg-figma-secondary/10 border-r-[3px] border-figma-primary text-figma-primary'
                : 'text-figma-muted hover:text-figma-primary hover:bg-figma-secondary/5'}
            `}
            title={collapsed ? label : undefined}
          >
            <Icon size={19} className="shrink-0" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}

        {/* ── Mini Stats Panel ────────────────── */}
        {!collapsed && (
          <div className="mt-6 mx-1 p-5 rounded-2xl bg-figma-card border border-figma-border/20 shadow-sm shadow-figma-border/5">
            <p className="text-[11px] font-extrabold text-figma-muted uppercase tracking-wider mb-4 border-b border-figma-border/10 pb-2">
              {AR.overview}
            </p>
            <div className="flex flex-col gap-3">
              <MiniStat label={AR.totalTasks}      value={stats.total}      color="text-figma-primary" />
              <MiniStat label={AR.pendingTasks}    value={stats.pending}    color="text-amber-600" />
              <MiniStat label={AR.inProgressTasks} value={stats.inProgress} color="text-indigo-600" />
              <MiniStat label={AR.completedTasks}  value={stats.completed}  color="text-emerald-600" />
            </div>
          </div>
        )}
      </nav>

      {/* ── Bottom Section ────────────────────── */}
      <div className="border-t border-figma-border/20 p-3 flex flex-col gap-1 shrink-0">
        <button
          onClick={() => navigate('/login')}
          className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-bold
            text-figma-muted hover:text-red-500 hover:bg-red-500/10 transition-all cursor-pointer
            ${collapsed ? 'justify-center' : ''}`}
          title={collapsed ? AR.logout : undefined}
        >
          <LogOut size={18} className="shrink-0" />
          {!collapsed && <span>{AR.logout}</span>}
        </button>

        <button
          onClick={onToggle}
          className={`flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-xs font-semibold
            text-figma-muted hover:text-figma-primary hover:bg-figma-secondary/5 transition-all cursor-pointer
            ${collapsed ? 'justify-center' : ''}`}
        >
          <ChevronLeft
            size={15}
            className={`shrink-0 transition-transform duration-200 ${collapsed ? 'rotate-180' : ''}`}
          />
          {!collapsed && <span>طيّ القائمة</span>}
        </button>
      </div>
    </aside>
  );
};

const MiniStat = ({ label, value, color }) => (
  <div className="flex items-center justify-between">
    <span className="text-xs text-figma-muted font-semibold leading-none">{label}</span>
    <span className={`text-sm font-black tabular-nums ${color}`}>{value}</span>
  </div>
);

export default Sidebar;
