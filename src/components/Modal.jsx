import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children, size = 'md', showClose = true }) => {
  const overlayRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizes = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' };

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4
                 bg-figma-text/30 backdrop-blur-sm animate-overlay-in"
      dir="rtl"
    >
      <div className={`w-full ${sizes[size]} bg-figma-card border border-figma-border/40
                       rounded-2xl shadow-xl shadow-figma-text/5 animate-modal-in overflow-hidden`}>
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-figma-border/20">
          <h2 className="text-lg font-black text-figma-text">{title}</h2>
          {showClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-figma-muted hover:text-figma-primary hover:bg-figma-secondary/10
                         transition-all cursor-pointer"
            >
              <X size={18} />
            </button>
          )}
        </div>
        {/* Body */}
        <div className="px-7 py-6">{children}</div>
      </div>
    </div>
  );
};

export const ConfirmModal = ({ isOpen, onClose, onConfirm, title, description, confirmLabel = 'تأكيد', loading = false }) => (
  <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
    <div className="flex flex-col gap-6">
      <p className="text-sm text-figma-muted leading-relaxed font-semibold">{description}</p>
      <div className="flex items-center gap-3 justify-end">
        <button
          onClick={onClose}
          disabled={loading}
          className="px-5 py-2.5 rounded-xl text-sm font-bold text-figma-muted
                     hover:text-figma-primary hover:bg-figma-secondary/10 transition-all cursor-pointer
                     disabled:opacity-50"
        >
          إلغاء
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className="px-5 py-2.5 rounded-xl text-sm font-bold bg-red-500/10 text-red-600
                     border border-red-500/20 hover:bg-red-500/20 transition-all cursor-pointer
                     disabled:opacity-50 flex items-center gap-2"
        >
          {loading && <span className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin-cw" />}
          {confirmLabel}
        </button>
      </div>
    </div>
  </Modal>
);

export default Modal;
