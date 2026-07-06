import { TrendingUp, ClipboardList, Clock, Loader, CheckCircle2, Flame } from 'lucide-react';
import { AR } from '../data/constants';
import { completionRate } from '../utils/helpers';

const CARDS = [
  { key: 'total',      label: AR.totalTasks,      icon: ClipboardList, color: 'text-figma-primary',   iconBg: 'bg-figma-primary/10',   border: 'border-figma-primary/20',    bg: 'bg-figma-primary/5'   },
  { key: 'pending',    label: AR.pendingTasks,    icon: Clock,         color: 'text-amber-600',       iconBg: 'bg-amber-500/10',       border: 'border-amber-500/20',        bg: 'bg-amber-500/5'       },
  { key: 'inProgress', label: AR.inProgressTasks, icon: Loader,        color: 'text-indigo-600',      iconBg: 'bg-indigo-500/10',      border: 'border-indigo-500/20',       bg: 'bg-indigo-500/5'      },
  { key: 'completed',  label: AR.completedTasks,  icon: CheckCircle2,  color: 'text-emerald-600',     iconBg: 'bg-emerald-500/10',     border: 'border-emerald-500/20',      bg: 'bg-emerald-500/5'     },
  { key: 'high',       label: AR.highPriority,    icon: Flame,         color: 'text-rose-600',        iconBg: 'bg-rose-500/10',        border: 'border-rose-500/20',         bg: 'bg-rose-500/5'        },
];

const StatsCards = ({ stats, tasks }) => {
  const rate = completionRate(tasks);

  return (
    <div className="flex flex-col gap-6">

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5">
        {CARDS.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={card.key}
              className={`${card.bg} border ${card.border} rounded-2xl p-6 flex flex-col gap-4 
                          transition-all duration-200 hover:-translate-y-0.5 
                          hover:shadow-lg hover:shadow-figma-primary/5`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {/* Icon Circle */}
              <div className={`w-12 h-12 rounded-2xl ${card.iconBg} flex items-center justify-center shrink-0`}>
                <Icon size={22} className={card.color} />
              </div>
              {/* Number & Label */}
              <div>
                <p className={`text-4xl font-black leading-none tabular-nums ${card.color}`}>
                  {stats[card.key]}
                </p>
                <p className="text-sm text-figma-muted font-bold mt-2 leading-tight">
                  {card.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Completion Rate Card ── */}
      <div className="bg-figma-panel border border-figma-border/20 rounded-2xl p-6 shadow-sm shadow-figma-border/5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <TrendingUp size={16} className="text-emerald-600" />
            </div>
            <span className="text-sm font-bold text-figma-text">{AR.completionRate}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-figma-muted font-semibold">{stats.completed} / {stats.total} مهمة</span>
            <span className="text-2xl font-black text-emerald-600">{rate}%</span>
          </div>
        </div>
        <div className="w-full h-3 bg-figma-border/20 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000 ease-out"
            style={{
              width: `${rate}%`,
              background: 'linear-gradient(90deg, #10b981, #3b82f6)',
            }}
          />
        </div>
      </div>

    </div>
  );
};

export default StatsCards;
