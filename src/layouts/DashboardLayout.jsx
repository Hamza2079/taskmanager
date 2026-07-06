import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar  from '../components/Navbar';
import { AR }  from '../data/constants';

const PAGE_TITLES = {
  '/dashboard':       AR.dashboard,
  '/dashboard/tasks': AR.tasks,
};

const DashboardLayout = () => {
  const [collapsed,         setCollapsed]         = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location  = useLocation();
  const pageTitle = PAGE_TITLES[location.pathname] ?? AR.dashboard;

  return (
    <div className="flex h-screen bg-figma-bg text-figma-text overflow-hidden" dir="rtl">

      {/* Mobile overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden animate-overlay-in"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar — desktop: flex child with controlled width */}
      <div className={`
        hidden md:flex shrink-0 transition-all duration-300 ease-in-out
        ${collapsed ? 'w-[72px]' : 'w-72'}
      `}>
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(p => !p)} />
      </div>

      {/* Sidebar — mobile: fixed slide from right */}
      <div className={`
        fixed top-0 right-0 h-full z-50 w-72 md:hidden
        transition-transform duration-300
        ${mobileSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <Sidebar collapsed={false} onToggle={() => setMobileSidebarOpen(false)} />
      </div>

      {/* Main */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Navbar
          onMenuClick={() => setMobileSidebarOpen(p => !p)}
          pageTitle={pageTitle}
        />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
