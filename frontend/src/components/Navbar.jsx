import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, LogOut, User, Camera, Settings, TrendingUp, Scan } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const { cartItems } = useCart();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate('/login');
    };

    // Public Navbar for Landing Page and Auth Pages
    if (!userInfo) {
        return (
            <nav className={`px-6 py-5 lg:px-16 flex items-center justify-between sticky top-0 z-50 transition-all ${location.pathname === '/' ? 'bg-white/80 backdrop-blur-xl border-b border-slate-50 shadow-sm' : 'bg-white shadow-sm'}`}>
                <Link to="/" className="text-3xl font-black text-slate-900 tracking-tighter flex items-center gap-3">
                    <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-100">
                        <ShoppingCart className="w-8 h-8" />
                    </div>
                    <span>SmartBill.</span>
                </Link>

                <div className="flex items-center gap-10">
                    <div className="hidden lg:flex items-center gap-10 text-sm font-black text-slate-400 uppercase tracking-widest">
                        <Link to="/" className={`transition-colors ${location.pathname === '/' ? 'text-blue-600' : 'hover:text-blue-600'}`}>Home</Link>
                        <Link to="/features" className={`transition-colors ${location.pathname === '/features' ? 'text-blue-600' : 'hover:text-blue-600'}`}>Features</Link>
                        <Link to="/pricing" className={`transition-colors ${location.pathname === '/pricing' ? 'text-blue-600' : 'hover:text-blue-600'}`}>Pricing</Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to="/login" className="px-8 py-3 text-slate-600 font-bold hover:bg-slate-50 rounded-2xl transition">Log In</Link>
                        <Link to="/register" className="px-8 py-3 bg-slate-900 text-white rounded-2xl font-bold shadow-xl shadow-slate-200 hover:bg-black transition">Sign Up</Link>
                    </div>
                </div>
            </nav>
        );
    }

    // System/Dashboard Top Bar
    return (
        <nav className="bg-white/80 backdrop-blur-md px-8 py-5 border-b border-slate-50 sticky top-0 z-50 flex items-center justify-between">
            <div className="flex items-center gap-6">
                <Link to="/dashboard" className="text-xl font-black text-slate-800 tracking-tighter flex lg:hidden items-center gap-2">
                    <ShoppingCart className="w-6 h-6 text-blue-600" />
                    <span>SmartBill</span>
                </Link>
                <div className="hidden lg:flex items-center gap-4 px-4 py-2 bg-slate-50 rounded-2xl text-slate-400 font-bold text-xs uppercase tracking-widest leading-none">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    {userInfo.role} Environment
                </div>
            </div>

            <div className="flex items-center gap-6">
                {/* User Dropdown/Profile */}
                <div className="flex items-center gap-4 px-4 py-2 bg-blue-50/50 rounded-2xl border border-blue-100">
                    <div className="bg-blue-600 w-10 h-10 rounded-xl flex items-center justify-center text-white">
                        <User className="w-5 h-5" />
                    </div>
                    <div className="hidden md:block">
                        <div className="text-sm font-black text-slate-800 leading-none">{userInfo.name}</div>
                        <div className="text-[10px] font-black text-blue-500 uppercase tracking-widest mt-1 opacity-60">{userInfo.role} Account</div>
                    </div>
                </div>

                <Link to="/cart" className="relative group p-3 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:border-blue-100 transition shadow-sm">
                    <ShoppingCart className="w-6 h-6 text-slate-400 group-hover:text-blue-600 transition-colors" />
                    {cartItems.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] w-6 h-6 rounded-full flex items-center justify-center font-black border-4 border-white animate-pop">
                            {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                        </span>
                    )}
                </Link>

                <button 
                  onClick={handleLogout} 
                  className="p-3 bg-red-50/50 text-red-400 hover:bg-red-50 hover:text-red-500 rounded-2xl border border-red-50 transition active:scale-90"
                >
                    <LogOut className="w-6 h-6" />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
