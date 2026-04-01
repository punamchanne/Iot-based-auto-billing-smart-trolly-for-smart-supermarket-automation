import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import { useNavigate, Link } from 'react-router-dom';
import { Html5Qrcode } from 'html5-qrcode';
import api from '../services/api';
import toast from 'react-hot-toast';
import { 
  ShoppingBag, ArrowLeft, ArrowRight, ReceiptText, ShieldCheck, 
  Camera, Scan, Zap, PackagePlus
} from 'lucide-react';

const Cart = () => {
  const { cartItems, updateQty, removeFromCart, totalAmount, addToCart } = useCart();
  const navigate = useNavigate();
  const [scannerOpen, setScannerOpen] = useState(false);
  const lastScanned = useRef(null);
  const lastScanTime = useRef(0);

  // Integrated Scanner for Cart Page
  useEffect(() => {
    let html5QrCode;
    
    if (scannerOpen) {
      html5QrCode = new Html5Qrcode("cart-reader");
      
      const config = { 
        fps: 15, 
        qrbox: { width: 250, height: 250 }
      };

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
              style: { borderRadius: '20px', background: '#0F172A', color: '#fff' }
            });
          } catch (err) {
            toast.error('Product not found');
          }
        }
      ).catch(err => {
        console.error("Cart cam error:", err);
      });
    }

    return () => {
      if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.stop().catch(e => console.error(e));
      }
    };
  }, [scannerOpen, addToCart]);

  if (cartItems.length === 0 && !scannerOpen) {
    return (
      <div className="max-w-2xl mx-auto mt-20 text-center py-24 bg-white rounded-[40px] shadow-2xl p-16 border border-slate-100 flex flex-col items-center animate-fade-in">
        <div className="bg-slate-50 w-32 h-32 rounded-[32px] flex items-center justify-center mb-10 border border-slate-100 shadow-inner">
            <ShoppingBag className="w-14 h-14 text-slate-300" />
        </div>
        <h2 className="text-4xl font-black text-slate-800 tracking-tighter leading-none mb-4">Empty Basket</h2>
        <p className="text-slate-400 font-medium text-lg max-w-xs leading-relaxed">Scan products to see them here.</p>
        <div className="flex gap-4 mt-12">
            <button onClick={() => setScannerOpen(true)} className="px-10 py-6 bg-indigo-600 text-white rounded-[24px] font-black text-xl flex items-center gap-4 hover:bg-indigo-700 transition shadow-2xl shadow-indigo-100">
               <Camera className="w-8 h-8" />
               Open Scanner
            </button>
        </div>
      </div>
    );
  }

  const gst = totalAmount * 0.18;
  const grandTotal = totalAmount + gst;

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-fade-in">
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-4 border-b border-slate-100 pb-10">
         <div className="flex items-center gap-6">
            <button onClick={() => navigate('/dashboard')} className="p-4 bg-white border border-slate-200 rounded-3xl hover:bg-slate-50 transition active:scale-90 shadow-sm">
               <ArrowLeft className="w-8 h-8 text-slate-400" />
            </button>
            <div>
               <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">Your Basket</h1>
               <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-2">Manage Items & Scan More</p>
            </div>
         </div>
         <button 
            onClick={() => setScannerOpen(!scannerOpen)}
            className={`px-8 py-5 rounded-[24px] font-black flex items-center gap-3 transition-all active:scale-95 shadow-xl ${scannerOpen ? 'bg-red-500 text-white shadow-red-100' : 'bg-indigo-600 text-white shadow-indigo-100'}`}
         >
            {scannerOpen ? <Scan className="w-6 h-6" /> : <PackagePlus className="w-6 h-6" />}
            <span className="uppercase tracking-widest text-xs">{scannerOpen ? 'Close Scanner' : 'Quick Scan More'}</span>
         </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Side: Items or Scanner */}
        <div className="lg:col-span-8 space-y-8">
            
            {/* Quick Scan Widget */}
            {scannerOpen && (
                <div className="bg-slate-950 rounded-[40px] p-2 overflow-hidden relative shadow-2xl border-[8px] border-white ring-1 ring-slate-100">
                    <div id="cart-reader" className="w-full aspect-video md:aspect-square bg-black rounded-[32px] overflow-hidden"></div>
                    <div className="absolute inset-x-0 h-1 bg-indigo-500/50 shadow-[0_0-20px_rgba(79,70,229,1)] z-40 animate-scan-line"></div>
                    <div className="absolute top-6 left-6 px-4 py-2 bg-indigo-600 text-white rounded-full font-black text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-xl">
                        <Zap className="w-3 h-3 fill-current animate-pulse" />
                        Live Cart Sync Active
                    </div>
                </div>
            )}

            <div className="space-y-4">
               {cartItems.map(item => (
                 <CartItem 
                   key={item._id} 
                   item={item} 
                   updateQty={updateQty} 
                   removeFromCart={removeFromCart} 
                 />
               ))}
               
               {cartItems.length === 0 && scannerOpen && (
                   <div className="py-20 text-center border-4 border-dashed border-slate-100 rounded-[40px]">
                       <p className="text-slate-300 font-black uppercase tracking-widest">Scan items to add them below</p>
                   </div>
               )}
            </div>
        </div>

        {/* Right Side: Summary */}
        <div className="lg:col-span-4 h-fit sticky top-24">
            <div className="bg-slate-950 rounded-[48px] p-10 text-white shadow-[0_50px_100px_-20px_rgba(30,41,59,0.4)] relative overflow-hidden ring-1 ring-white/5">
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-indigo-600 rounded-full blur-[100px] opacity-20"></div>
                
                <h3 className="text-2xl font-black mb-10 flex items-center gap-3 tracking-tight">
                   <ReceiptText className="w-7 h-7 text-indigo-400" />
                   Order Summary
                </h3>

                <div className="space-y-6">
                   <div className="flex justify-between items-center opacity-60">
                     <span className="font-bold">Items ({cartItems.length})</span>
                     <span className="font-mono text-xl">₹{totalAmount.toFixed(2)}</span>
                   </div>
                   <div className="flex justify-between items-center opacity-60">
                     <span className="font-bold">Tax (GST 18%)</span>
                     <span className="font-mono text-xl">₹{gst.toFixed(2)}</span>
                   </div>
                   
                   <div className="py-10 my-6 border-y border-white/5 flex flex-col items-center gap-3">
                       <span className="text-[10px] text-slate-500 uppercase font-black tracking-[0.4em]">AMOUNT PAYABLE</span>
                       <div className="text-7xl font-black font-mono tracking-tighter text-indigo-400 drop-shadow-2xl shadow-indigo-500/20">₹{grandTotal.toFixed(0)}</div>
                   </div>

                   <button 
                     onClick={() => navigate('/checkout')}
                     disabled={cartItems.length === 0}
                     className="w-full bg-white text-slate-950 py-8 rounded-[32px] font-black text-3xl tracking-tighter flex items-center justify-center gap-4 hover:bg-indigo-50 transition transform hover:-translate-y-2 active:scale-95 disabled:opacity-20 disabled:hover:translate-y-0"
                   >
                     Submit 
                     <ArrowRight className="w-10 h-10" />
                   </button>
                </div>
            </div>

            <div className="mt-8 flex items-center justify-center gap-4 p-8 bg-white rounded-[32px] border border-slate-100 shadow-sm">
                <ShieldCheck className="w-6 h-6 text-emerald-500" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">End-to-End Secure Transaction</span>
            </div>
        </div>
      </div>

      <style>{`
        @keyframes scan-line {
          0% { top: 0; }
          100% { top: 100%; }
        }
        .animate-scan-line {
          animation: scan-line 3.5s linear infinite;
        }
        #cart-reader video { 
            object-fit: cover !important; 
            width: 100% !important; 
            height: 100% !important; 
            border-radius: 32px !important;
        }
        #cart-reader img { display: none !important; }
        #cart-reader__dashboard_section_csr button { display: none !important; }
      `}</style>
    </div>
  );
};

export default Cart;
