import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Html5Qrcode } from 'html5-qrcode';
import api from '../services/api';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';
import { 
  Search, ShoppingBag, Scan, ArrowRight, Zap, Camera, Star, PackageSearch, Rocket, 
  Smartphone, Activity, ShieldCheck, HeartPulse
} from 'lucide-react';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart, cartItems } = useCart();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [scannerLive, setScannerLive] = useState(false);
  const lastScanned = useRef(null);
  const lastScanTime = useRef(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products');
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Integrated Scanner Initialization (Direct Camera Feed)
  useEffect(() => {
    let html5QrCode;
    
    if (scannerLive) {
      html5QrCode = new Html5Qrcode("dashboard-reader");
      
      const config = { fps: 15, qrbox: { width: 250, height: 250 } };
      
      html5QrCode.start(
        { facingMode: "environment" }, 
        config,
        async (decodedText) => {
          const currentTime = Date.now();
          if (decodedText === lastScanned.current && (currentTime - lastScanTime.current < 2500)) return;
          
          lastScanned.current = decodedText;
          lastScanTime.current = currentTime;
          
          try {
            const { data } = await api.get(`/products/${decodedText}`);
            addToCart(data);
            toast.success(`${data.name} added!`, {
              style: { borderRadius: '24px', background: '#0F172A', color: '#fff' }
            });
          } catch (err) {
            toast.error('Product not found');
          }
        }
      ).catch(err => {
        console.error("Camera start error:", err);
      });
    }

    return () => {
      if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.stop().catch(e => console.error(e));
      }
    };
  }, [scannerLive, addToCart]);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-16 py-4 animate-fade-in">
      
      {/* Header Welcome Section */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-2">
           <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full font-black text-[10px] uppercase tracking-widest leading-none border border-emerald-200 shadow-sm shadow-emerald-50">
               <HeartPulse className="w-3 h-3 animate-pulse" />
               Live System Online
           </div>
           <h1 className="text-6xl font-black text-slate-900 tracking-tighter leading-none">Hello, {userInfo?.name?.split(' ')[0] || 'Member'}!</h1>
           <p className="text-xl text-slate-400 font-medium tracking-tight">Your premium shopping workstation is ready.</p>
        </div>
        
        <div className="flex items-center gap-6">
           <div className="text-right hidden sm:block">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Basket</p>
              <p className="text-2xl font-black text-slate-900 tracking-tighter">{cartItems.length} Items</p>
           </div>
           <div className="flex -space-x-4">
              {[1,2,3].map(i => (
                  <div key={i} className="w-12 h-12 rounded-2xl border-4 border-white bg-slate-100 overflow-hidden shadow-xl">
                    <img src={`https://i.pravatar.cc/150?u=${i+20}`} alt="User" />
                  </div>
              ))}
              <div className="w-12 h-12 rounded-2xl border-4 border-white bg-indigo-600 text-white flex items-center justify-center font-black text-[10px] shadow-xl">+4K</div>
           </div>
        </div>
      </header>

      {/* INTEGRATED LIVE SCAN HERO */}
      <section className="bg-slate-950 rounded-[56px] p-10 lg:p-20 text-white relative overflow-hidden shadow-2xl shadow-indigo-100 group">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] bg-indigo-600 rounded-full blur-[180px] opacity-20"></div>
          
          <div className="relative z-10 grid grid-cols-1 xl:grid-cols-12 gap-16 items-center">
              <div className="xl:col-span-7 space-y-10">
                  <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/10 text-indigo-300 rounded-[24px] font-black text-xs uppercase tracking-widest border border-white/10 backdrop-blur-3xl">
                      <Activity className="w-4 h-4 animate-spin-slow" />
                      Instant Recognition Engine Active
                  </div>
                  <h2 className="text-6xl lg:text-8xl font-black leading-[0.9] tracking-tighter">Live Scan.<br/><span className="text-indigo-400">Total Control.</span></h2>
                  <p className="text-slate-400 text-xl font-medium leading-relaxed max-w-lg opacity-80">
                      Experience the future of retail. No separate pages, no switching. Scan and checkout in one seamless motion.
                  </p>
                  
                  <div className="flex flex-wrap gap-5">
                      <button 
                        onClick={() => setScannerLive(!scannerLive)}
                        className={`px-12 py-7 rounded-[32px] font-black text-2xl flex items-center justify-center gap-4 transition-all transform active:scale-95 shadow-2xl shadow-indigo-500/20 ${scannerLive ? 'bg-red-500 text-white' : 'bg-white text-slate-950 hover:bg-slate-50'}`}
                      >
                          {scannerLive ? <Scan className="w-8 h-8" /> : <Camera className="w-8 h-8" />}
                          <span>{scannerLive ? 'Close Scan' : 'Activate Live Scan'}</span>
                      </button>
                      <Link to="/cart" className="px-12 py-7 bg-white/5 border-2 border-white/10 text-white rounded-[32px] font-black text-2xl flex items-center gap-4 hover:bg-white/10 transition backdrop-blur-xl group">
                          <ShoppingBag className="w-8 h-8 group-hover:scale-110 transition-transform" />
                          <span>Check Basket</span>
                      </Link>
                  </div>

                  <div className="pt-8 flex items-center gap-10">
                      <div className="flex items-center gap-3">
                          <ShieldCheck className="w-6 h-6 text-emerald-400" />
                          <span className="text-xs font-black text-slate-500 uppercase tracking-widest">End-to-End Secure</span>
                      </div>
                      <div className="flex items-center gap-3">
                          <Zap className="w-6 h-6 text-yellow-400" />
                          <span className="text-xs font-black text-slate-500 uppercase tracking-widest">0.2s Latency</span>
                      </div>
                  </div>
              </div>

              <div className="xl:col-span-5 flex justify-center xl:justify-end relative">
                  <div className="w-[420px] h-fit bg-slate-900 rounded-[64px] border-[14px] border-slate-800 shadow-3xl relative overflow-hidden ring-1 ring-white/10 group-hover:scale-[1.02] transition-transform duration-700">
                      {/* Internal Mockup Content */}
                      <div className="h-full min-h-[500px]">
                          {scannerLive ? (
                            <div className="relative h-full">
                                <div id="dashboard-reader" className="w-full h-full bg-black rounded-[50px] overflow-hidden"></div>
                                <div className="absolute inset-x-0 h-1 bg-indigo-500/50 shadow-[0_0_20px_rgba(79,70,229,1)] z-40 animate-scan-line"></div>
                            </div>
                          ) : (
                            <div className="p-8 h-full flex flex-col items-center justify-center space-y-12 opacity-40">
                                <Smartphone className="w-32 h-32 text-indigo-400" />
                                <div className="space-y-4 w-full">
                                    <div className="h-3 w-3/4 bg-white/10 rounded-full mx-auto"></div>
                                    <div className="h-3 w-1/2 bg-white/10 rounded-full mx-auto"></div>
                                </div>
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-center text-indigo-400">Cam Inactive</p>
                            </div>
                          )}
                      </div>
                  </div>
                  {/* Floating Price Tag */}
                  <div className="absolute -bottom-10 -left-10 bg-indigo-600 text-white p-10 rounded-[40px] shadow-2xl animate-float">
                      <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-60">Total Value</p>
                      <div className="text-5xl font-black font-mono tracking-tighter leading-none">₹{cartItems.reduce((acc, i) => acc + (i.price * (i.qty || 1)), 0).toFixed(0)}</div>
                  </div>
              </div>
          </div>
      </section>

      {/* CATALOG SECTION */}
      <section className="space-y-12">
          <div className="flex flex-col lg:flex-row items-end justify-between gap-10 border-b border-slate-100 pb-12">
              <div className="space-y-4">
                  <h3 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">Stock Explorer.</h3>
                  <p className="text-xl text-slate-400 font-medium">Browse our catalog or use the integrated scanner above.</p>
              </div>
              
              <div className="relative w-full lg:w-[450px] group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-6 h-6 group-focus-within:text-indigo-600 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Find products..."
                  className="w-full pl-16 pr-8 py-6 bg-white border-2 border-transparent focus:border-indigo-600 rounded-[32px] outline-none transition-all shadow-xl shadow-slate-100 font-black text-slate-800 text-xl"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
          </div>

          {loading ? (
             <div className="flex justify-center py-20"><Loader /></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
              {filteredProducts.map(product => (
                <ProductCard key={product._id} product={product} addToCart={addToCart} />
              ))}
            </div>
          )}
      </section>

      {/* Global CSS for scanning animation on dashboard */}
      <style>{`
        @keyframes scan-line {
          0% { top: 0; }
          100% { top: 100%; }
        }
        .animate-scan-line {
          animation: scan-line 3s linear infinite;
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        #dashboard-reader video { 
            object-fit: cover !important; 
            width: 100% !important; 
            height: 100% !important; 
            border-radius: 50px !important;
            transform: scale(1.05) !important;
        }
        #dashboard-reader img { display: none !important; }
      `}</style>

    </div>
  );
};

export default Dashboard;
