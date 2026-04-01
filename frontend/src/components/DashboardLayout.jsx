import React from 'react';
import Sidebar from './Sidebar';
import { useLocation } from 'react-router-dom';

const DashboardLayout = ({ children }) => {
  const location = useLocation();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Persistent App Sidebar */}
      <Sidebar />

      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden relative">
        
        {/* Dynamic Header Blur Effect */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent opacity-50 pointer-events-none z-0"></div>

        <main className="relative z-10 p-4 md:p-8 lg:p-10 flex-1 flex flex-col">
          
          {/* Main Content Panel Container */}
          <div className="flex-1 bg-white/40 backdrop-blur-sm rounded-[48px] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col">
             
             {/* Inside Panel Content */}
             <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10 lg:p-12">
                {children}
             </div>

             {/* Functional Footer inside Panel (Optional) */}
             <div className="px-10 py-4 bg-white/50 border-t border-slate-50 flex items-center justify-between">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">SmartBill V2.0 Engine • Ready</p>
                <div className="flex items-center gap-2">
                   <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                   <span className="text-[9px] font-bold text-slate-400 uppercase">System Sync: OK</span>
                </div>
             </div>
          </div>

        </main>
      </div>

      {/* Global CSS for custom scrollbar within the panel */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E2E8F0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #CBD5E1;
        }
      `}</style>
    </div>
  );
};

export default DashboardLayout;
