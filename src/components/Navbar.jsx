import { Bell, Menu, RefreshCw } from 'lucide-react';
import { AR } from '../data/constants';
import { useTasks } from '../hooks/useTasks';

const Navbar = ({ onMenuClick, pageTitle }) => {
  const { resetTasks, loading } = useTasks();

  return (
    <header
      className="h-20 bg-figma-bg border-b border-figma-border/20 backdrop-blur-sm
                 flex items-center justify-between px-6 md:px-8
                 shrink-0 sticky top-0 z-30"
      dir="rtl"
    >
      {/* ── Right: Menu (mobile) + Title ── */}
      <div className="flex items-center gap-4 min-w-0">
        <button
          onClick={onMenuClick}
          className="p-2.5 rounded-xl text-figma-muted hover:text-figma-primary hover:bg-figma-secondary/10
                     transition-all cursor-pointer md:hidden shrink-0"
        >
          <Menu size={22} />
        </button>
        <div className="min-w-0">
          <h1 className="text-lg font-black text-figma-text leading-tight truncate">{pageTitle}</h1>
          <p className="text-xs text-figma-muted font-medium mt-0.5 hidden sm:block">{AR.appTagline}</p>
        </div>
      </div>

      {/* ── Left: Actions + User Profile ── */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Refresh */}
        <button
          onClick={resetTasks}
          disabled={loading}
          className="p-2.5 rounded-xl text-figma-muted hover:text-figma-primary hover:bg-figma-secondary/10
                     transition-all cursor-pointer disabled:opacity-40"
          title={AR.resetData}
        >
          <RefreshCw size={18} className={loading ? 'animate-spin-cw' : ''} />
        </button>

        {/* Notifications */}
        <button className="relative p-2.5 rounded-xl text-figma-muted hover:text-figma-primary
                           hover:bg-figma-secondary/10 transition-all cursor-pointer">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-figma-primary
                           border-2 border-figma-bg" />
        </button>

        {/* User Avatar Card (Figma Style) */}
        <div className="flex items-center gap-3 bg-figma-card border border-figma-border/20
                        rounded-2xl px-4 py-2 cursor-pointer hover:border-figma-border transition-all
                        shadow-sm shadow-figma-border/5">
          <div className="w-8 h-8 rounded-xl bg-figma-primary flex items-center justify-center text-white text-sm font-bold shadow shrink-0">
            أ
          </div>
          <div className="hidden sm:block text-right">
            <p className="text-sm font-bold text-figma-text leading-tight">أحمد محمد</p>
            <p className="text-xs text-figma-muted font-semibold mt-0.5">مدير</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
