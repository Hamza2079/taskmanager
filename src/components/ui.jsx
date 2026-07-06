// ─── Button ───────────────────────────────────────────────────────────────────
export const Button = ({
  children, onClick, type = 'button', variant = 'primary',
  size = 'md', disabled = false, loading = false, className = '', icon: Icon,
}) => {
  const base = 'inline-flex items-center justify-center gap-2 font-bold rounded-xl transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const variants = {
    primary:   'bg-figma-primary hover:bg-figma-secondary text-white shadow-md shadow-figma-primary/20',
    secondary: 'bg-figma-panel hover:bg-figma-secondary/15 text-figma-text border border-figma-border/40',
    danger:    'bg-red-500/10 hover:bg-red-500/20 text-red-600 border border-red-500/20',
    ghost:     'text-figma-muted hover:text-figma-primary hover:bg-figma-secondary/10',
    success:   'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 border border-emerald-500/20',
  };

  const sizes = {
    sm: 'text-xs px-4 py-2',
    md: 'text-sm px-5 py-3',
    lg: 'text-base px-6 py-3.5',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {loading ? <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin-cw" /> : Icon && <Icon size={size === 'sm' ? 15 : size === 'lg' ? 20 : 18} />}
      {children}
    </button>
  );
};

// ─── Input ────────────────────────────────────────────────────────────────────
export const Input = ({
  label, name, type = 'text', placeholder, value, onChange,
  error, required = false, icon: Icon, className = '', rows,
  register, disabled = false,
  ...rest
}) => {
  const inputClass = `
    w-full bg-figma-card border rounded-xl px-4 py-3 text-figma-text text-sm
    placeholder:text-figma-muted/40 transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-figma-primary/30 focus:border-figma-primary/50
    ${error ? 'border-red-500/50 focus:ring-red-500/20' : 'border-figma-border/40 hover:border-figma-border'}
    ${Icon ? 'pr-12' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
  `;

  const inputProps = register ? register(name, rest) : { name, value, onChange, ...rest };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label htmlFor={name} className="text-sm font-bold text-figma-text">
          {label}{required && <span className="text-red-500 mr-1">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-figma-muted pointer-events-none">
            <Icon size={16} />
          </div>
        )}
        {rows ? (
          <textarea
            id={name}
            placeholder={placeholder}
            rows={rows}
            disabled={disabled}
            className={`${inputClass} resize-none`}
            {...inputProps}
          />
        ) : (
          <input
            id={name}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            className={inputClass}
            {...inputProps}
          />
        )}
      </div>
      {error && <p className="text-xs text-red-500 flex items-center gap-1.5 mt-0.5">⚠ {error}</p>}
    </div>
  );
};

// ─── Select ───────────────────────────────────────────────────────────────────
export const Select = ({
  label, name, options, value, onChange, error,
  required = false, className = '', register, placeholder,
  ...rest
}) => {
  const selectClass = `
    w-full bg-figma-card border rounded-xl px-4 py-3 text-figma-text text-sm
    transition-all duration-200 cursor-pointer
    focus:outline-none focus:ring-2 focus:ring-figma-primary/30 focus:border-figma-primary/50
    ${error ? 'border-red-500/50' : 'border-figma-border/40 hover:border-figma-border'}
  `;

  const selectProps = register ? register(name, rest) : { name, value, onChange, ...rest };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label htmlFor={name} className="text-sm font-bold text-figma-text">
          {label}{required && <span className="text-red-500 mr-1">*</span>}
        </label>
      )}
      <select id={name} className={selectClass} {...selectProps}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-figma-card">
            {o.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-500 flex items-center gap-1.5 mt-0.5">⚠ {error}</p>}
    </div>
  );
};

// ─── Badge ────────────────────────────────────────────────────────────────────
export const Badge = ({ children, className = '' }) => (
  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${className}`}>
    {children}
  </span>
);
export default Button;
