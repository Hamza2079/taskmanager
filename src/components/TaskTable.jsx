import { Edit2, Trash2 } from 'lucide-react';
import { AR, PRIORITY_LABELS, STATUS_LABELS } from '../data/constants';
import { getPriorityColor, getStatusColor, formatDate } from '../utils/helpers';

const TaskTable = ({ tasks, onEdit, onDelete }) => {
  if (!tasks.length) return null;

  return (
    <div className="overflow-x-auto rounded-2xl border border-figma-border/40 shadow-sm shadow-figma-border/5">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-figma-panel border-b border-figma-border/30">
            {[AR.title, AR.status, AR.priority, AR.createdAt, AR.actions].map((h) => (
              <th
                key={h}
                className="px-6 py-4 text-right text-xs font-black text-figma-muted uppercase tracking-wider"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-figma-border/20">
          {tasks.map((task) => {
            const pColor = getPriorityColor(task.priority);
            const sColor = getStatusColor(task.status);
            return (
              <tr
                key={task.id}
                className="bg-figma-card hover:bg-figma-panel/40 transition-colors duration-150 group"
              >
                {/* Title & Desc */}
                <td className="px-6 py-5 max-w-xs">
                  <p className="font-bold text-figma-text line-clamp-1 text-sm">{task.title}</p>
                  <p className="text-xs text-figma-muted font-semibold mt-1.5 line-clamp-1">{task.description}</p>
                </td>

                {/* Status */}
                <td className="px-6 py-5">
                  <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold border ${sColor.bg} ${sColor.text} ${sColor.border}`}>
                    {STATUS_LABELS[task.status]}
                  </span>
                </td>

                {/* Priority */}
                <td className="px-6 py-5">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${pColor.bg} ${pColor.text} ${pColor.border}`}>
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${pColor.dot}`} />
                    {PRIORITY_LABELS[task.priority]}
                  </span>
                </td>

                {/* Created Date */}
                <td className="px-6 py-5 text-figma-muted font-bold text-xs whitespace-nowrap">
                  {formatDate(task.createdAt)}
                </td>

                {/* Actions */}
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onEdit(task)}
                      className="p-2 rounded-xl text-figma-muted hover:text-figma-primary hover:bg-figma-secondary/15 transition-all cursor-pointer"
                      title={AR.edit}
                    >
                      <Edit2 size={15} />
                    </button>
                    <button
                      onClick={() => onDelete(task)}
                      className="p-2 rounded-xl text-figma-muted hover:text-red-500 hover:bg-red-500/10 transition-all cursor-pointer"
                      title={AR.delete}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
