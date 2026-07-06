import { Loader2 } from 'lucide-react';
import { AR } from '../data/constants';

const Loader = ({ message = AR.loading, fullscreen = false }) => {
  if (fullscreen) {
    return (
      <div className="fixed inset-0 bg-figma-bg flex flex-col items-center justify-center z-50 gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-figma-border/20" />
          <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-t-figma-primary border-r-transparent border-b-transparent border-l-transparent animate-spin-cw" />
        </div>
        <div className="text-center select-none">
          <p className="text-figma-text font-black text-lg">{message}</p>
          <p className="text-figma-muted text-sm font-semibold mt-1.5">يرجى الانتظار...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 select-none">
      <Loader2 size={36} className="text-figma-primary animate-spin-cw" />
      <p className="text-figma-muted font-bold text-sm">{message}</p>
    </div>
  );
};

export default Loader;
