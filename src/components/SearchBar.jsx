import { Search, X } from 'lucide-react';
import { AR } from '../data/constants';

const SearchBar = ({ value, onChange }) => (
  <div className="relative flex-1 min-w-0">
    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-figma-muted pointer-events-none">
      <Search size={17} />
    </div>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={AR.search}
      className="
        w-full bg-figma-card border border-figma-border/40 rounded-xl
        pr-11 pl-11 py-3 text-sm text-figma-text placeholder:text-figma-muted/50
        focus:outline-none focus:ring-2 focus:ring-figma-primary/40 focus:border-figma-primary/40
        hover:border-figma-border transition-all duration-200 shadow-sm shadow-figma-border/5
      "
    />
    {value && (
      <button
        onClick={() => onChange('')}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-figma-muted
                   hover:text-figma-text transition-colors cursor-pointer"
      >
        <X size={15} />
      </button>
    )}
  </div>
);

export default SearchBar;
