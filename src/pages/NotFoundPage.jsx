import { Navigate } from 'react-router-dom';

// This page is just a redirect for /dashboard to DashboardPage
// Serves as fallback 404
const NotFoundPage = () => (
  <div className="flex flex-col items-center justify-center h-64 gap-4 text-center" dir="rtl">
    <p className="text-6xl font-black text-slate-700">404</p>
    <p className="text-slate-300 font-semibold text-xl">الصفحة غير موجودة</p>
    <p className="text-slate-500 text-sm">الرابط الذي تبحث عنه غير موجود</p>
    <a href="/dashboard" className="text-sky-400 hover:text-sky-300 text-sm font-medium transition-colors">
      العودة للرئيسية ←
    </a>
  </div>
);

export default NotFoundPage;
