import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';
import { Mail, Lock, LogIn, ShoppingCart, ArrowRight } from 'lucide-react';
import Loader from '../components/Loader';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('userInfo')) navigate('/dashboard');
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('Logged in successfully!');
      if (data.role === 'admin') navigate('/admin');
      else if (data.role === 'cashier') navigate('/pos');
      else navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white overflow-hidden">
      {/* Left Column: Form */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-24 xl:px-32 relative z-10">
        <div className="max-w-md w-full mx-auto space-y-10 animate-fade-in">
          
          <div className="space-y-4">
            <h2 className="text-5xl font-black text-slate-900 tracking-tighter">Welcome Back.</h2>
            <p className="text-xl text-slate-500 font-medium">Log in to enter the SmartBill ecosystem.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-5">
                <label className="block space-y-2 group">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 transition-colors group-hover:text-blue-600">Email Address</span>
                <div className="relative">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 transition-colors group-focus-within:text-blue-600" />
                    <input 
                    type="email" required
                    className="w-full pl-14 pr-6 py-5 bg-slate-50 border-2 border-transparent rounded-[20px] focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 outline-none transition-all font-bold text-slate-800 text-lg"
                    placeholder="name@example.com"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                </label>

                <label className="block space-y-2 group">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 transition-colors group-hover:text-blue-600">Password</span>
                <div className="relative">
                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 transition-colors group-focus-within:text-blue-600" />
                    <input 
                    type="password" required
                    className="w-full pl-14 pr-6 py-5 bg-slate-50 border-2 border-transparent rounded-[20px] focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 outline-none transition-all font-bold text-slate-800 text-lg tracking-widest"
                    placeholder="••••••••"
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                </label>
            </div>

            <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded-lg border-2 border-slate-200 text-blue-600 focus:ring-blue-600 focus:ring-offset-2 transition-colors cursor-pointer" />
                    <span className="text-sm font-bold text-slate-500 group-hover:text-slate-700 transition-colors">Remember me</span>
                </label>
                <a href="#" className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">Forgot Password?</a>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-slate-900 text-white rounded-[20px] py-5 flex items-center justify-center gap-3 hover:bg-black transition transform active:scale-95 shadow-2xl shadow-slate-200 mt-8 disabled:opacity-50 disabled:transform-none"
            >
              {loading ? <Loader /> : (
                <>
                  <span className="font-black text-xl tracking-tight">Sign In</span>
                  <ArrowRight className="w-6 h-6" />
                </>
              )}
            </button>
          </form>

          <div className="text-center pt-8">
            <p className="text-slate-500 font-medium">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 font-black hover:underline underline-offset-4">Create one here</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Column: Hero Graphic */}
      <div className="hidden lg:flex w-1/2 bg-blue-600 p-4 relative">
         <div className="absolute inset-4 bg-[url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center rounded-[40px] opacity-20 mix-blend-overlay"></div>
         <div className="flex-1 rounded-[40px] p-16 flex flex-col justify-between relative shadow-2xl overflow-hidden glassmorphism border border-white/10">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-white rounded-full blur-[120px] opacity-10"></div>
            
            <div className="relative z-10 flex items-center gap-3 text-white">
                <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md border border-white/20">
                    <ShoppingCart className="w-8 h-8" />
                </div>
                <span className="text-3xl font-black tracking-tighter">SmartBill.</span>
            </div>

            <div className="relative z-10 max-w-lg mb-20 animate-slide-up">
                <h3 className="text-5xl font-black text-white leading-[1.15] tracking-tighter mb-6">
                    Manage your store from anywhere.
                </h3>
                <p className="text-blue-100 font-medium text-xl leading-relaxed opacity-90">
                    Join thousands of modern retail chains leveraging the power of real-time point-of-sale scanning.
                </p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Login;
