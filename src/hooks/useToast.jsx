import { createContext, useCallback, useContext, useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

let toastId = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success', duration = 3500) => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type, exiting: false }]);
    setTimeout(() => {
      setToasts((prev) => prev.map((t) => t.id === id ? { ...t, exiting: true } : t));
      setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 350);
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.map((t) => t.id === id ? { ...t, exiting: true } : t));
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 350);
  }, []);

  const toast = {
    success: (msg, dur) => addToast(msg, 'success', dur),
    error:   (msg, dur) => addToast(msg, 'error',   dur),
    warning: (msg, dur) => addToast(msg, 'warning', dur),
    info:    (msg, dur) => addToast(msg, 'info',    dur),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside ToastProvider');
  return ctx;
};

// ─── Toast Container ──────────────────────────────────────────────────────────
const ToastContainer = ({ toasts, onRemove }) => (
  <div className="fixed bottom-5 left-5 z-[9999] flex flex-col gap-3 pointer-events-none" dir="rtl">
    {toasts.map((t) => (
      <ToastItem key={t.id} toast={t} onRemove={onRemove} />
    ))}
  </div>
);

// ─── Toast Item (Figma Light Theme) ───────────────────────────────────────────
const TOAST_STYLES = {
  success: { icon: CheckCircle,    bg: 'bg-emerald-50 border-emerald-200/80',  text: 'text-emerald-900',  iconColor: 'text-emerald-600' },
  error:   { icon: XCircle,        bg: 'bg-rose-50 border-rose-200/80',        text: 'text-rose-900',     iconColor: 'text-rose-600' },
  warning: { icon: AlertTriangle,  bg: 'bg-amber-50 border-amber-200/80',      text: 'text-amber-900',    iconColor: 'text-amber-600' },
  info:    { icon: Info,           bg: 'bg-blue-50 border-blue-200/80',        text: 'text-blue-900',     iconColor: 'text-blue-600' },
};

const ToastItem = ({ toast, onRemove }) => {
  const style = TOAST_STYLES[toast.type] ?? TOAST_STYLES.info;
  const Icon  = style.icon;

  return (
    <div
      className={`
        pointer-events-auto flex items-center gap-3 min-w-[320px] max-w-sm px-4 py-3.5 rounded-2xl
        border shadow-xl shadow-figma-text/5 bg-white
        ${style.bg} ${style.text}
        ${toast.exiting ? 'animate-toast-out' : 'animate-toast-in'}
      `}
    >
      <Icon size={18} className={`shrink-0 ${style.iconColor}`} />
      <span className="flex-1 text-sm font-bold text-figma-text">{toast.message}</span>
      <button
        onClick={() => onRemove(toast.id)}
        className="shrink-0 text-figma-muted hover:text-figma-text transition-colors cursor-pointer"
      >
        <X size={15} />
      </button>
    </div>
  );
};
