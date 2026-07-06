import { ChevronRight, ChevronLeft } from 'lucide-react';
import { AR } from '../data/constants';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const all = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visible = totalPages <= 5
    ? all
    : all.slice(
        Math.max(0, Math.min(currentPage - 3, totalPages - 5)),
        Math.max(5, Math.min(currentPage + 2, totalPages)),
      );

  return (
    <div className="flex items-center justify-between gap-4 mt-4 px-1 select-none">
      <p className="text-sm text-figma-muted font-bold">
        {AR.page} <span className="text-figma-primary font-black">{currentPage}</span>{' '}
        {AR.of} <span className="text-figma-primary font-black">{totalPages}</span>
      </p>

      <div className="flex items-center gap-1.5">
        <PageBtn
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          title={AR.previous}
        >
          <ChevronRight size={16} />
        </PageBtn>

        {visible.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`
              w-9 h-9 rounded-xl text-sm font-bold transition-all cursor-pointer
              ${p === currentPage
                ? 'bg-figma-primary text-white shadow-md shadow-figma-primary/20'
                : 'text-figma-muted hover:text-figma-text hover:bg-figma-secondary/10'}
            `}
          >
            {p}
          </button>
        ))}

        <PageBtn
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          title={AR.next}
        >
          <ChevronLeft size={16} />
        </PageBtn>
      </div>
    </div>
  );
};

const PageBtn = ({ onClick, disabled, children, title }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    title={title}
    className="w-9 h-9 flex items-center justify-center rounded-xl text-figma-muted
               hover:text-figma-text hover:bg-figma-secondary/10
               disabled:opacity-30 disabled:cursor-not-allowed
               transition-all cursor-pointer"
  >
    {children}
  </button>
);

export default Pagination;
