import { ClipboardList, Plus } from 'lucide-react';
import { AR } from '../data/constants';
import { Button } from './ui';

const EmptyState = ({ onAdd, filtered = false }) => (
  <div className="flex flex-col items-center justify-center py-24 gap-6 animate-fade-up">
    {/* Illustration */}
    <div className="relative">
      <div className="w-28 h-28 rounded-3xl bg-figma-primary/10 flex items-center justify-center border border-figma-primary/20">
        <ClipboardList size={52} className="text-figma-primary/80" />
      </div>
      <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-figma-primary/20 blur-sm" />
      <div className="absolute -bottom-3 -right-3 w-10 h-10 rounded-full bg-figma-secondary/15 blur-md" />
    </div>

    {/* Text */}
    <div className="text-center max-w-xs">
      <h3 className="text-xl font-bold text-figma-text mb-2">
        {filtered ? AR.noResults : AR.noTasks}
      </h3>
      <p className="text-figma-muted text-sm leading-relaxed font-semibold">
        {filtered ? AR.noResultsDesc : AR.noTasksDesc}
      </p>
    </div>

    {/* Action */}
    {!filtered && (
      <Button onClick={onAdd} icon={Plus} size="md">
        {AR.addTask}
      </Button>
    )}
  </div>
);

export default EmptyState;
