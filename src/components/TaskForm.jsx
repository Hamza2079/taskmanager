import { useForm } from 'react-hook-form';
import { AR, STATUS_OPTIONS, PRIORITY_OPTIONS, STATUS, PRIORITY } from '../data/constants';
import { Button } from './ui';

const TaskForm = ({ onSubmit, onCancel, initialData, loading = false }) => {
  const isEdit = !!initialData;

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title:       initialData?.title       ?? '',
      description: initialData?.description ?? '',
      status:      initialData?.status      ?? STATUS.PENDING,
      priority:    initialData?.priority    ?? PRIORITY.MEDIUM,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" noValidate>

      {/* Title */}
      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="text-sm font-bold text-figma-text">
          {AR.title} <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          type="text"
          placeholder="أدخل عنوان المهمة..."
          {...register('title', {
            required:  AR.titleRequired,
            minLength: { value: 3, message: AR.titleMin },
          })}
          className={`
            w-full bg-figma-card border rounded-xl px-4 py-3.5 text-figma-text text-sm
            placeholder:text-figma-muted/40 transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-figma-primary/30 focus:border-figma-primary/50
            ${errors.title
              ? 'border-red-500/50 focus:ring-red-500/20'
              : 'border-figma-border/40 hover:border-figma-border'}
          `}
        />
        {errors.title && (
          <p className="text-xs text-red-500 flex items-center gap-1.5 mt-0.5">
            ⚠ {errors.title.message}
          </p>
        )}
      </div>

      {/* Description */}
      <div className="flex flex-col gap-2">
        <label htmlFor="description" className="text-sm font-bold text-figma-text">
          {AR.description} <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          rows={4}
          placeholder="أدخل وصفاً تفصيلياً للمهمة..."
          {...register('description', {
            required:  AR.descRequired,
            minLength: { value: 10, message: AR.descMin },
          })}
          className={`
            w-full bg-figma-card border rounded-xl px-4 py-3.5 text-figma-text text-sm
            placeholder:text-figma-muted/40 transition-all duration-200 resize-none
            focus:outline-none focus:ring-2 focus:ring-figma-primary/30 focus:border-figma-primary/50
            ${errors.description
              ? 'border-red-500/50 focus:ring-red-500/20'
              : 'border-figma-border/40 hover:border-figma-border'}
          `}
        />
        {errors.description && (
          <p className="text-xs text-red-500 flex items-center gap-1.5 mt-0.5">
            ⚠ {errors.description.message}
          </p>
        )}
      </div>

      {/* Status & Priority */}
      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="status" className="text-sm font-bold text-figma-text">
            {AR.status} <span className="text-red-500">*</span>
          </label>
          <select
            id="status"
            {...register('status', { required: true })}
            className="w-full bg-figma-card border border-figma-border/40 rounded-xl px-4 py-3.5
                       text-figma-text text-sm transition-all duration-200 cursor-pointer
                       focus:outline-none focus:ring-2 focus:ring-figma-primary/30 hover:border-figma-border"
          >
            {STATUS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value} className="bg-figma-card">{o.label}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="priority" className="text-sm font-bold text-figma-text">
            {AR.priority} <span className="text-red-500">*</span>
          </label>
          <select
            id="priority"
            {...register('priority', { required: true })}
            className="w-full bg-figma-card border border-figma-border/40 rounded-xl px-4 py-3.5
                       text-figma-text text-sm transition-all duration-200 cursor-pointer
                       focus:outline-none focus:ring-2 focus:ring-figma-primary/30 hover:border-figma-border"
          >
            {PRIORITY_OPTIONS.map((o) => (
              <option key={o.value} value={o.value} className="bg-figma-card">{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 justify-end pt-4 border-t border-figma-border/20">
        <Button variant="ghost" onClick={onCancel} type="button" size="md">
          {AR.cancel}
        </Button>
        <Button type="submit" loading={loading} size="md">
          {isEdit ? AR.save : AR.addTask}
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;
