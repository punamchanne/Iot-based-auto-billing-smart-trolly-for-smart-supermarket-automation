import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Scan, ArrowRight, ShoppingCart, Zap, 
  Smartphone, TrendingUp
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Landing = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            {/* HERO SECTION */}
            <header className="relative overflow-hidden pt-20 pb-32 lg:pt-32 lg:pb-48">
                {/* Background Blobs */}
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] bg-blue-100/50 rounded-full blur-3xl -z-10"></div>
                <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[600px] h-[600px] bg-purple-100/50 rounded-full blur-3xl -z-10"></div>

                <div className="container mx-auto px-6 text-center lg:text-left flex flex-col lg:flex-row items-center gap-16">
                    <div className="flex-1 space-y-8 animate-fade-in">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full font-black text-xs uppercase tracking-widest border border-blue-100">
                            <Zap className="w-4 h-4 fill-current" />
                            The Future of Retail
                        </div>
                        <h1 className="text-6xl lg:text-8xl font-black text-slate-900 leading-[1.1] tracking-tighter">
                            Billing at the <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Speed of Sight.</span>
                        </h1>
                        <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto lg:mx-0">
                            Transform your supermarket with real-time QR scanning. Allow customers to scan and bill themselves, or empower cashiers with state-of-the-art POS management.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-center gap-4 pt-6">
                            <Link to="/register" className="w-full sm:w-auto px-10 py-5 bg-blue-600 text-white rounded-3xl font-black text-xl shadow-2xl shadow-blue-200 hover:bg-blue-700 transition transform hover:-translate-y-1 flex items-center justify-center gap-3">
                                Get Started Free
                                <ArrowRight className="w-6 h-6" />
                            </Link>
                            <Link to="/login" className="w-full sm:w-auto px-10 py-5 bg-white text-slate-600 rounded-3xl font-bold text-xl border-2 border-slate-100 hover:bg-slate-50 transition flex items-center justify-center gap-3">
                                Log In
                            </Link>
                        </div>

                        <div className="flex items-center justify-center lg:justify-start gap-8 pt-10 border-t border-slate-50">
                            <div>
                                <div className="text-4xl font-black text-slate-900">100%</div>
                                <div className="text-xs font-black uppercase text-slate-300 tracking-widest mt-1">Real-time Sync</div>
                            </div>
                            <div className="w-px h-12 bg-slate-100"></div>
                            <div>
                                <div className="text-4xl font-black text-slate-900">0.5s</div>
                                <div className="text-xs font-black uppercase text-slate-300 tracking-widest mt-1">Scan Latency</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 relative animate-float">
                        <div className="relative z-10 bg-white rounded-[60px] p-12 shadow-[0_50px_100px_-20px_rgba(30,41,59,0.2)] border border-slate-100">
                           <div className="bg-slate-900 w-full h-[400px] rounded-[40px] overflow-hidden relative flex items-center justify-center overflow-hidden">
                               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center brightness-50"></div>
                               <div className="relative text-center">
                                  <div className="w-24 h-24 border-4 border-white/20 rounded-full border-t-white animate-spin mx-auto mb-6"></div>
                                  <Scan className="w-20 h-20 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                                  <div className="text-white font-black text-2xl tracking-widest bg-blue-600/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/20">SCANNING...</div>
                               </div>
                           </div>
                           <div className="mt-10 flex gap-4">
                               <div className="flex-1 h-3 bg-blue-100 rounded-full overflow-hidden">
                                   <div className="w-3/4 h-full bg-blue-600 rounded-full"></div>
                               </div>
                               <div className="flex-1 h-3 bg-slate-100 rounded-full"></div>
                               <div className="flex-1 h-3 bg-slate-100 rounded-full"></div>
                           </div>
                        </div>
                        {/* Floating elements */}
                        <div className="absolute -top-10 -right-10 bg-white p-6 rounded-3xl shadow-xl border border-slate-50 flex items-center gap-4 animate-bounce-slow">
                            <div className="bg-green-500 w-12 h-12 rounded-2xl flex items-center justify-center text-white">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="text-sm font-black text-slate-400">Total Sales</div>
                                <div className="text-xl font-black text-slate-800">₹42,890.00</div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* FEATURES SECTION */}
            <section className="bg-slate-50 py-32">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-5xl font-black text-slate-900 tracking-tighter mb-6">Complete ecosystem for modern retail.</h2>
                        <p className="text-xl text-slate-400 font-medium">From individual shoppers to bulk warehouse management, we've got you covered.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { title: 'Self-Scanning', desc: 'Allow customers to scan products with their own smartphones and pay instantly.', icon: Smartphone, color: 'bg-blue-500' },
                            { title: 'Advanced POS', desc: 'State-of-the-art billing panel for cashiers optimized for speed and large volumes.', icon: Scan, color: 'bg-indigo-500' },
                            { title: 'Live Analytics', desc: 'Monitor revenue, stock levels, and sales trends in real-time from any device.', icon: TrendingUp, color: 'bg-green-500' },
                        ].map((f, i) => (
                            <div key={i} className="bg-white p-10 rounded-[40px] shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 group">
                                <div className={`${f.color} w-16 h-16 rounded-[20px] flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform shadow-xl`}>
                                    <f.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-black text-slate-800 mb-4 tracking-tight">{f.title}</h3>
                                <p className="text-slate-400 font-medium leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CALL TO ACTION */}
            <section className="py-32 overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="bg-slate-900 rounded-[60px] p-16 lg:p-24 text-center relative overflow-hidden">
                        {/* Glow effect */}
                        <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-full h-[200%] bg-blue-600/20 blur-[120px] -z-0"></div>
                        
                        <div className="relative z-10 space-y-10">
                            <h2 className="text-5xl lg:text-7xl font-black text-white tracking-tighter">Ready to upgrade your store?</h2>
                            <p className="text-xl text-blue-200/50 max-w-2xl mx-auto font-medium">Join thousands of smart retailers worldwide who are already using SmartBill.</p>
                            
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
                                <Link to="/register" className="px-12 py-6 bg-blue-600 text-white rounded-3xl font-black text-2xl hover:bg-blue-700 transition transform hover:-translate-y-1 active:scale-95 shadow-2xl shadow-blue-900/50">
                                    Start Now — It's Free
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Landing;
