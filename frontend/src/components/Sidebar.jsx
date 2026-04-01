import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Scan, History, 
  LogOut, Package, Store, BarChart3, ShoppingBag
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  if (!userInfo) return null;

  const menuItems = [
    // Customer Links
    { name: 'Self-Checkout', path: '/dashboard', icon: LayoutDashboard, roles: ['user'] },
    { name: 'Active Scanner', path: '/scan', icon: Scan, roles: ['user'] },
    { name: 'My History', path: '/history', icon: History, roles: ['user'] },

    // Cashier Links
    { name: 'POS Kiosk', path: '/pos', icon: Store, roles: ['cashier', 'admin'] },

    // Admin Links
    { name: 'Admin Hub', path: '/admin-hub', icon: LayoutDashboard, roles: ['admin'] },
    { name: 'Inventory Management', path: '/admin', icon: Package, roles: ['admin'] },
    { name: 'Sales Insights', path: '/sales', icon: BarChart3, roles: ['admin'] },
  ];

  const filteredMenu = menuItems.filter(item => item.roles.includes(userInfo.role));

  return (
    <aside className="w-64 bg-white border-r border-slate-100 flex flex-col h-screen h-full sticky top-0 hidden md:flex shrink-0">
      <div className="p-8 border-b border-slate-50 mb-6 bg-slate-50/50">
        <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Smart<span className="text-blue-600">Bill.</span></h2>
        <p className="text-[10px] font-black text-slate-400 mt-1 uppercase tracking-widest leading-none">
            {userInfo.role === 'admin' ? 'System Administrator' : userInfo.role === 'cashier' ? 'Cashier Station' : 'Customer Shop'}
        </p>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {filteredMenu.map(item => (
          <Link 
            key={item.path}
            to={item.path}
            className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 ${location.pathname === item.path ? 'bg-slate-900 text-white shadow-xl shadow-slate-200 scale-[1.03]' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600 hover:translate-x-1'}`}
          >
            <item.icon className={`w-5 h-5 ${location.pathname === item.path ? 'text-blue-400' : 'text-slate-300'}`} />
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="p-8 border-t border-slate-50">
         <div className="mb-6 px-4">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Logged in as</p>
            <p className="text-sm font-bold text-slate-800 line-clamp-1">{userInfo.name}</p>
         </div>
         <button 
           onClick={() => { localStorage.removeItem('userInfo'); window.location.reload(); }}
           className="w-full flex items-center justify-center gap-4 px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 shadow-sm"
         >
            <LogOut className="w-4 h-4" />
            Logout
         </button>
      </div>
    </aside>
  );
};

export default Sidebar;
