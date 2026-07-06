import { Calendar, Edit2, Trash2 } from 'lucide-react';
import { AR, PRIORITY_LABELS, STATUS_LABELS } from '../data/constants';
import { getPriorityColor, getStatusColor, formatDate } from '../utils/helpers';

const TaskCard = ({ task, onEdit, onDelete }) => {
  const pColor = getPriorityColor(task.priority);
  const sColor = getStatusColor(task.status);

  return (
    <article className="
      group relative bg-figma-card border border-figma-border/30 rounded-2xl
      p-6 flex flex-col gap-4
      hover:border-figma-border/80 hover:shadow-lg hover:shadow-figma-border/10
      transition-all duration-200 hover:-translate-y-0.5
    ">
      {/* ── Header ── */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-extrabold text-figma-text leading-snug line-clamp-2 flex-1 min-w-0">
          {task.title}
        </h3>
        {/* Hover Actions */}
        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
          <button
            onClick={() => onEdit(task)}
            className="p-2 rounded-xl text-figma-muted hover:text-figma-primary hover:bg-figma-secondary/15
                       transition-all cursor-pointer"
            title={AR.edit}
          >
            <Edit2 size={15} />
          </button>
          <button
            onClick={() => onDelete(task)}
            className="p-2 rounded-xl text-figma-muted hover:text-red-500 hover:bg-red-500/10
                       transition-all cursor-pointer"
            title={AR.delete}
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      {/* ── Description ── */}
      <p className="text-sm text-figma-muted leading-relaxed line-clamp-3 flex-1 font-medium">
        {task.description}
      </p>

      {/* ── Badges ── */}
      <div className="flex items-center flex-wrap gap-2.5">
        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold border ${sColor.bg} ${sColor.text} ${sColor.border}`}>
          {STATUS_LABELS[task.status]}
        </span>
        <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border ${pColor.bg} ${pColor.text} ${pColor.border}`}>
          <span className={`w-2 h-2 rounded-full shrink-0 ${pColor.dot}`} />
          {PRIORITY_LABELS[task.priority]}
        </span>
      </div>

      {/* ── Footer ── */}
      <div className="flex items-center gap-2 pt-3 border-t border-figma-border/20">
        <Calendar size={13} className="text-figma-muted shrink-0" />
        <span className="text-xs text-figma-muted font-bold">{formatDate(task.createdAt)}</span>
      </div>
    </article>
  );
};

export default TaskCard;
