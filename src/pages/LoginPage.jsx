import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, Zap, ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { AR } from '../data/constants';
import { Button } from '../components/ui';

const LoginPage = () => {
  const navigate   = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { email: '', password: '', remember: false },
  });

  const onSubmit = (data) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-figma-bg flex items-center justify-center p-4 relative overflow-hidden" dir="rtl">
      {/* Figma style background soft glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-figma-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-figma-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md animate-scale-in">
        {/* Card */}
        <div className="bg-figma-card border border-figma-border/40 rounded-3xl shadow-xl shadow-figma-border/10 overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-br from-figma-primary/5 via-figma-card to-figma-secondary/5 px-8 pt-10 pb-8 text-center border-b border-figma-border/20">
            {/* Logo */}
            <div className="flex justify-center mb-5">
              <div className="w-16 h-16 rounded-2xl bg-figma-primary flex items-center justify-center shadow-lg shadow-figma-primary/20">
                <Zap size={30} className="text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-black text-figma-primary mb-1">
              TaskFlow
            </h1>
            <p className="text-figma-muted text-sm font-semibold mt-1">{AR.loginSubtitle}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-8 flex flex-col gap-5" noValidate>
            
            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-figma-text">
                {AR.email} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-figma-muted pointer-events-none">
                  <Mail size={16} />
                </div>
                <input
                  type="email"
                  placeholder={AR.emailPlaceholder}
                  {...register('email', {
                    required: AR.emailRequired,
                    pattern:  { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: AR.emailInvalid },
                  })}
                  className={`
                    w-full bg-figma-card border border-figma-border/40 rounded-xl pr-12 pl-4 py-3 text-figma-text text-sm
                    placeholder:text-figma-muted/40 transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-figma-primary/30 focus:border-figma-primary/50
                    ${errors.email ? 'border-red-500/50' : 'hover:border-figma-border'}
                  `}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500 flex items-center gap-1.5 mt-0.5">⚠ {errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-figma-text">
                {AR.password} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-figma-muted pointer-events-none">
                  <Lock size={16} />
                </div>
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder={AR.passwordPlaceholder}
                  {...register('password', {
                    required:  AR.passwordRequired,
                    minLength: { value: 6, message: AR.passwordMin },
                  })}
                  className={`
                    w-full bg-figma-card border border-figma-border/40 rounded-xl pr-12 pl-12 py-3 text-figma-text text-sm
                    placeholder:text-figma-muted/40 transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-figma-primary/30 focus:border-figma-primary/50
                    ${errors.password ? 'border-red-500/50' : 'hover:border-figma-border'}
                  `}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((p) => !p)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-figma-muted hover:text-figma-text transition-colors cursor-pointer"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 flex items-center gap-1.5 mt-0.5">⚠ {errors.password.message}</p>
              )}
            </div>

            {/* Remember me & forgot password */}
            <div className="flex items-center justify-between text-sm select-none">
              <label className="flex items-center gap-2.5 cursor-pointer text-figma-muted hover:text-figma-text transition-colors font-bold">
                <input
                  type="checkbox"
                  {...register('remember')}
                  className="w-5 h-5 rounded border-figma-border bg-figma-card accent-figma-primary cursor-pointer"
                />
                {AR.rememberMe}
              </label>
              <button
                type="button"
                className="text-figma-primary hover:text-figma-secondary transition-colors cursor-pointer font-bold"
              >
                {AR.forgotPassword}
              </button>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              size="lg"
              loading={loading}
              className="w-full mt-2 text-base py-3"
            >
              {!loading && <ArrowLeft size={18} />}
              {AR.loginBtn}
            </Button>
          </form>

          {/* Footer */}
          <div className="px-8 pb-6 text-center border-t border-figma-border/10 pt-4">
            <p className="text-xs text-figma-muted font-semibold">
              نظام إدارة المهام الذكي © {new Date().getFullYear()} TaskFlow
            </p>
          </div>
        </div>

        {/* Demo Hint */}
        <div className="mt-4 text-center">
          <p className="text-xs text-figma-muted/65 font-bold">
            للتجربة: أدخل أي بريد وكلمة مرور (6+ أحرف)
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
