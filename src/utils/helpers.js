import { PRIORITY, STATUS } from '../data/constants';

// ─── ID Generation ────────────────────────────────────────────────────────────
export const generateId = () =>
  `task_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

// ─── Date Formatting (Arabic) ─────────────────────────────────────────────────
export const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('ar-SA', { month: 'short', day: 'numeric', year: 'numeric' });
};

export const formatRelativeDate = (dateStr) => {
  if (!dateStr) return '—';
  const now  = new Date();
  const date = new Date(dateStr);
  const diffMs  = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr  = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr  / 24);

  if (diffSec < 60)  return 'الآن';
  if (diffMin < 60)  return `منذ ${diffMin} دقيقة`;
  if (diffHr  < 24)  return `منذ ${diffHr} ساعة`;
  if (diffDay === 1) return 'أمس';
  if (diffDay < 7)   return `منذ ${diffDay} أيام`;
  return formatDate(dateStr);
};

// ─── Priority Helpers ─────────────────────────────────────────────────────────
export const getPriorityColor = (priority) => {
  const map = {
    [PRIORITY.HIGH]:   { bg: 'bg-rose-50',     text: 'text-rose-700',    border: 'border-rose-200/80',    dot: 'bg-rose-500' },
    [PRIORITY.MEDIUM]: { bg: 'bg-amber-50',    text: 'text-amber-700',   border: 'border-amber-200/80',   dot: 'bg-amber-500' },
    [PRIORITY.LOW]:    { bg: 'bg-emerald-50',  text: 'text-emerald-700', border: 'border-emerald-200/80', dot: 'bg-emerald-500' },
  };
  return map[priority] ?? map[PRIORITY.LOW];
};

export const getPriorityWeight = (priority) => {
  const map = { [PRIORITY.HIGH]: 3, [PRIORITY.MEDIUM]: 2, [PRIORITY.LOW]: 1 };
  return map[priority] ?? 0;
};

// ─── Status Helpers ───────────────────────────────────────────────────────────
export const getStatusColor = (status) => {
  const map = {
    [STATUS.PENDING]:     { bg: 'bg-slate-100',      text: 'text-slate-700',   border: 'border-slate-300/60',   icon: '⏳' },
    [STATUS.IN_PROGRESS]: { bg: 'bg-blue-50',        text: 'text-blue-700',    border: 'border-blue-200/80',    icon: '🔄' },
    [STATUS.COMPLETED]:   { bg: 'bg-emerald-50',     text: 'text-emerald-700', border: 'border-emerald-200/80', icon: '✅' },
  };
  return map[status] ?? map[STATUS.PENDING];
};

// ─── Search & Filter ──────────────────────────────────────────────────────────
export const filterTasks = (tasks, { query, status, priority }) => {
  return tasks.filter((t) => {
    const q = query?.trim().toLowerCase();
    if (q && !t.title.toLowerCase().includes(q) && !t.description.toLowerCase().includes(q)) return false;
    if (status   && t.status   !== status)   return false;
    if (priority && t.priority !== priority) return false;
    return true;
  });
};

export const sortTasks = (tasks, sortBy) => {
  const arr = [...tasks];
  switch (sortBy) {
    case 'oldest':   return arr.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    case 'title':    return arr.sort((a, b) => a.title.localeCompare(b.title, 'ar'));
    case 'priority': return arr.sort((a, b) => getPriorityWeight(b.priority) - getPriorityWeight(a.priority));
    default:         return arr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
};

// ─── Stats ────────────────────────────────────────────────────────────────────
export const computeStats = (tasks) => ({
  total:      tasks.length,
  pending:    tasks.filter((t) => t.status === STATUS.PENDING).length,
  inProgress: tasks.filter((t) => t.status === STATUS.IN_PROGRESS).length,
  completed:  tasks.filter((t) => t.status === STATUS.COMPLETED).length,
  high:       tasks.filter((t) => t.priority === PRIORITY.HIGH).length,
});

// ─── Completion Rate ──────────────────────────────────────────────────────────
export const completionRate = (tasks) => {
  if (!tasks.length) return 0;
  return Math.round((tasks.filter((t) => t.status === STATUS.COMPLETED).length / tasks.length) * 100);
};

// ─── Paginate ─────────────────────────────────────────────────────────────────
export const paginate = (arr, page, perPage) => {
  const start = (page - 1) * perPage;
  return arr.slice(start, start + perPage);
};

// ─── Clamp ────────────────────────────────────────────────────────────────────
export const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

// ─── Total pages ──────────────────────────────────────────────────────────────
export const totalPages = (total, perPage) => Math.max(1, Math.ceil(total / perPage));
