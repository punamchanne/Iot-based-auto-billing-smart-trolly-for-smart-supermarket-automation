import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';
import { Mail, Lock, User, UserPlus, ShoppingCart, ArrowRight } from 'lucide-react';
import Loader from '../components/Loader';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/register', { name, email, password, role });
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('Registration successful!');
      if (data.role === 'cashier') navigate('/pos');
      else navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white overflow-hidden">
      {/* Left Column: Form */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-24 xl:px-32 relative z-10 py-12">
        <div className="max-w-md w-full mx-auto space-y-10 animate-fade-in">
          
          <div className="space-y-4">
            <h2 className="text-5xl font-black text-slate-900 tracking-tighter">Join SmartBill.</h2>
            <p className="text-xl text-slate-500 font-medium">Create your free account today.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-5">
                <label className="block space-y-2 group">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 transition-colors group-hover:text-blue-600">Full Name</span>
                <div className="relative">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 transition-colors group-focus-within:text-blue-600" />
                    <input 
                    type="text" required
                    className="w-full pl-14 pr-6 py-5 bg-slate-50 border-2 border-transparent rounded-[20px] focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 outline-none transition-all font-bold text-slate-800 text-lg"
                    placeholder="John Doe"
                    value={name} onChange={(e) => setName(e.target.value)}
                    />
                </div>
                </label>

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

                <label className="block space-y-3 group pt-2">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 transition-colors group-hover:text-blue-600">Account Type</span>
                <div className="flex gap-4">
                    <button 
                    type="button" 
                    onClick={() => setRole('user')}
                    className={`flex-1 py-4 px-6 rounded-[20px] font-black border-2 transition-all text-sm tracking-tight ${role === 'user' ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-200' : 'bg-slate-50 border-transparent text-slate-400 hover:bg-slate-100 hover:text-slate-600'}`}
                    >
                    Customer
                    </button>
                    <button 
                    type="button" 
                    onClick={() => setRole('cashier')}
                    className={`flex-1 py-4 px-6 rounded-[20px] font-black border-2 transition-all text-sm tracking-tight ${role === 'cashier' ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-200' : 'bg-slate-50 border-transparent text-slate-400 hover:bg-slate-100 hover:text-slate-600'}`}
                    >
                    Cashier POS
                    </button>
                </div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center mt-3">* Admins are assigned automatically</p>
                </label>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-slate-900 text-white rounded-[20px] py-6 flex items-center justify-center gap-3 hover:bg-black transition transform active:scale-95 shadow-2xl shadow-slate-200 mt-10 disabled:opacity-50 disabled:transform-none"
            >
              {loading ? <Loader /> : (
                <>
                  <span className="font-black text-xl tracking-tight">Create Account</span>
                  <UserPlus className="w-6 h-6" />
                </>
              )}
            </button>
          </form>

          <div className="text-center pt-8">
            <p className="text-slate-500 font-medium">
              Already a member?{' '}
              <Link to="/login" className="text-blue-600 font-black hover:underline underline-offset-4">Sign in here</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Column: Hero Graphic */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 p-4 relative">
         <div className="absolute inset-4 bg-[url('https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center rounded-[40px] opacity-20 mix-blend-overlay"></div>
         <div className="flex-1 rounded-[40px] p-16 flex flex-col justify-between relative shadow-[inset_0_2px_20px_rgba(255,255,255,0.1)] overflow-hidden border border-white/5">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-blue-500 rounded-full blur-[150px] opacity-20"></div>
            
            <div className="relative z-10 flex items-center justify-end gap-3 text-white">
                <span className="text-xl font-black tracking-tighter">SmartBill.</span>
                <div className="bg-white/10 p-2 rounded-xl backdrop-blur-md border border-white/20">
                    <ShoppingCart className="w-6 h-6" />
                </div>
            </div>

            <div className="relative z-10 max-w-lg mb-20 animate-slide-up ml-auto text-right">
                <h3 className="text-5xl font-black text-white leading-[1.1] tracking-tighter mb-6">
                    Redefining the checkout experience.
                </h3>
                <p className="text-slate-300 font-medium text-xl leading-relaxed opacity-90">
                    Skip lines, avoid delays, and process transactions faster with our advanced self-scanning algorithm.
                </p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Register;
