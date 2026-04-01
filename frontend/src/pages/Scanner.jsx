import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import api from '../services/api';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Scan, ShoppingCart, Zap, Camera, RefreshCw } from 'lucide-react';

const Scanner = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [scannerLive, setScannerLive] = useState(false);
  const scannerRef = useRef(null);
  const lastScanned = useRef(null);
  const lastScanTime = useRef(0);

  useEffect(() => {
    // Initializing scanner with more robust settings
    const scanner = new Html5QrcodeScanner("reader", { 
      fps: 15, 
      qrbox: { width: 280, height: 280 },
      aspectRatio: 1.0 
    });

    const onScanSuccess = async (decodedText) => {
      const currentTime = Date.now();
      if (decodedText === lastScanned.current && (currentTime - lastScanTime.current < 2500)) return;

      lastScanned.current = decodedText;
      lastScanTime.current = currentTime;

      try {
        const { data } = await api.get(`/products/${decodedText}`);
        addToCart(data);
        toast.success(`${data.name} added!`, {
          icon: '🚀',
          style: { borderRadius: '24px', background: '#0F172A', color: '#fff' }
        });
      } catch (err) {
        toast.error('Product not found in system', {
          style: { borderRadius: '24px' }
        });
      }
    };

    scanner.render(onScanSuccess, (error) => {
        // Log silently
    });

    scannerRef.current = scanner;
    setScannerLive(true);

    return () => {
      scanner.clear().catch(error => console.error("Scanner clean error", error));
    };
  }, [addToCart]);

  return (
    <div className="max-w-xl mx-auto space-y-8 animate-fade-in py-6">
      
      <div className="text-center space-y-3">
         <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full font-black text-[10px] uppercase tracking-widest border border-indigo-100 shadow-sm">
             <Zap className="w-3.5 h-3.5 fill-current animate-pulse" />
             Neural Scanner v2.1
         </div>
         <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">Scan Item</h1>
         <p className="text-slate-400 font-medium px-4">Center the QR code in the frame below to instantly add it to your digital basket.</p>
      </div>

      {/* The Smartphone Style Frame */}
      <div className="bg-white rounded-[56px] p-2 shadow-[0_50px_100px_-20px_rgba(79,70,229,0.1)] overflow-hidden relative border-[12px] border-white ring-1 ring-slate-100 group transition-all duration-500 hover:shadow-indigo-200">
        
        {/* Mirror Reflection Overlay */}
        <div className="absolute top-0 right-0 w-32 h-64 bg-gradient-to-br from-white/10 to-transparent skew-x-[-20deg] translate-x-20 z-20 pointer-events-none opacity-50"></div>
        
        <div className="bg-slate-50 w-full aspect-square rounded-[44px] overflow-hidden relative z-10">
            {/* The Reader Viewport */}
            <div id="reader" className="w-full h-full border-0"></div>
            
            {/* Scan Line Animation */}
            {scannerLive && (
                <div className="absolute inset-x-0 h-1 bg-indigo-500/50 shadow-[0_0_20px_rgba(79,70,229,0.8)] z-30 animate-scan-line pointer-events-none"></div>
            )}

            {!scannerLive && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 text-slate-300 gap-4">
                    <RefreshCw className="w-10 h-10 animate-spin" />
                    <span className="font-black text-[10px] uppercase tracking-widest">Enabling Lens...</span>
                </div>
            )}
        </div>

        {/* Brand/Status Indicator */}
        <div className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-2 z-30 pointer-events-none">
             <div className="px-4 py-1.5 bg-slate-900/40 backdrop-blur-xl rounded-full border border-white/10 shadow-2xl">
                <p className="text-white font-black uppercase text-[9px] tracking-[0.4em] opacity-80 flex items-center gap-2">
                    <Camera className="w-3 h-3" />
                    Optics Engine Ready
                </p>
             </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 px-2">
          <button 
            onClick={() => navigate('/dashboard')}
            className="flex-1 py-6 bg-white border border-slate-100 rounded-[28px] font-black text-slate-400 uppercase tracking-widest text-[10px] hover:bg-slate-50 transition active:scale-95 shadow-sm"
          >
            Cancel Session
          </button>
          
          <button 
            onClick={() => navigate('/cart')}
            className="flex-[2] bg-slate-900 text-white rounded-[28px] py-6 flex items-center justify-center gap-4 hover:bg-black transition transform active:scale-95 shadow-2xl shadow-indigo-100 relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-indigo-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <ShoppingCart className="w-7 h-7 group-hover:rotate-12 transition-transform" />
            <span className="font-black text-2xl tracking-tighter">View Basket</span>
          </button>
      </div>

      {/* Embedded CSS for specialized scanner styles & animation */}
      <style>{`
        #reader { border: none !important; }
        #reader video { 
            object-fit: cover !important; 
            width: 100% !important; 
            height: 100% !important; 
            border-radius: 44px !important;
        }
        #reader img { display: none !important; }
        #reader__dashboard_section_csr button {
            background-color: #4F46E5 !important;
            color: white !important;
            border-radius: 12px !important;
            padding: 8px 16px !important;
            font-weight: 800 !important;
            text-transform: uppercase !important;
            font-size: 10px !important;
            border: none !important;
            letter-spacing: 0.1em !important;
        }

        @keyframes scan-line {
          0% { top: 0; }
          100% { top: 100%; }
        }
        .animate-scan-line {
          animation: scan-line 2s linear infinite;
        }
      `}</style>

    </div>
  );
};

export default Scanner;
