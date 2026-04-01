import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Package, Clock, ChevronRight, CheckCircle2, AlertCircle, Banknote, Smartphone, CreditCard, History, Zap, Waves
} from 'lucide-react';
import Loader from '../components/Loader';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get('/orders/user');
        setOrders(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-16 animate-fade-in py-4">
      
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full font-black text-[10px] uppercase tracking-widest border border-indigo-200 shadow-sm shadow-indigo-50">
                  <Waves className="w-3 h-3 animate-pulse" />
                  Real-time Ledger Sync
              </div>
              <h1 className="text-6xl font-black text-slate-900 tracking-tighter leading-none">Wallet History.</h1>
              <p className="text-xl text-slate-400 font-medium tracking-tight">Track all your previous scans and payment status.</p>
          </div>
          
          <button onClick={() => navigate(-1)} className="p-5 bg-white border border-slate-100 rounded-[28px] hover:bg-slate-50 transition active:scale-90 shadow-xl shadow-slate-100">
             <ArrowLeft className="w-8 h-8 text-slate-400" />
          </button>
      </header>

      {loading ? <div className="flex justify-center py-20"><Loader /></div> : orders.length > 0 ? (
        <div className="grid grid-cols-1 gap-10">
          {orders.map(order => {
             const isPaid = order.paymentStatus === 'paid';
             let MethodIcon = Banknote;
             if(order.paymentMethod === 'upi') MethodIcon = Smartphone;
             if(order.paymentMethod === 'card') MethodIcon = CreditCard;

             return (
              <div key={order._id} className="bg-white rounded-[48px] p-10 border border-slate-100 shadow-sm hover:shadow-[0_50px_100px_-20px_rgba(79,70,229,0.1)] transition-all duration-500 group overflow-hidden relative">
                
                {/* Visual Accent Decoration */}
                <div className={`absolute top-0 right-0 w-64 h-64 rounded-bl-[150px] -z-0 opacity-[0.03] transition-opacity group-hover:opacity-10 pointer-events-none ${isPaid ? 'bg-green-600' : 'bg-orange-600'}`}></div>

                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-10 mb-10 pb-10 border-b border-slate-50 relative z-10">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-8">
                       <div className={`w-24 h-24 rounded-[32px] flex items-center justify-center shadow-2xl transition-transform duration-500 group-hover:scale-105 ${isPaid ? 'bg-green-50 text-green-600 shadow-green-100' : 'bg-orange-50 text-orange-600 shadow-orange-100 animate-pulse'}`}>
                          {isPaid ? <CheckCircle2 className="w-12 h-12" /> : <Clock className="w-12 h-12" />}
                       </div>
                       
                       <div className="space-y-2">
                          <div className="flex items-center gap-4">
                             <h3 className="font-black text-4xl text-slate-900 tracking-tighter leading-none">Token #{order._id.slice(-6).toUpperCase()}</h3>
                             {isPaid ? (
                                <span className="px-5 py-2 bg-green-50 text-green-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl border border-green-100 shadow-sm shadow-green-50">Settled</span>
                             ) : (
                                <span className="px-5 py-2 bg-orange-50 text-orange-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl border border-orange-100 shadow-sm shadow-orange-50">Waiting</span>
                             )}
                          </div>
                          <div className="flex items-center gap-3 text-slate-400 font-bold text-sm uppercase tracking-widest pl-1">
                             <Clock className="w-4 h-4 text-slate-300" />
                             {new Date(order.createdAt).toLocaleDateString()} • {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                       </div>
                    </div>
                    
                    <div className="text-left xl:text-right flex flex-col xl:items-end gap-1">
                       <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">Total Amount</span>
                       <div className="text-6xl font-black text-slate-900 font-mono tracking-tighter leading-none group-hover:text-indigo-600 transition-colors">₹{order.totalAmount.toFixed(2)}</div>
                       {isPaid && (
                          <div className="flex items-center justify-end gap-2 text-xs font-black text-slate-400 mt-2 uppercase tracking-widest opacity-60">
                             <MethodIcon className="w-4 h-4" />
                             Channel: {order.paymentMethod.toUpperCase()}
                          </div>
                       )}
                    </div>
                </div>

                <div className="space-y-6 relative z-10">
                   <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] ml-1">Inventory Breakdown</h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {order.products.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-slate-50/50 p-6 rounded-[28px] border border-slate-100/50 group-hover:bg-slate-50 transition-all duration-300 transform group-hover:translate-x-1">
                         <div className="flex items-center gap-5">
                            <span className="w-12 h-12 bg-white border border-slate-100 rounded-2xl flex items-center justify-center font-black text-indigo-600 text-sm shadow-xl shadow-slate-100">{item.quantity}x</span>
                            <div>
                               <span className="font-black text-slate-800 text-lg leading-tight block">{item.productId?.name || 'Retail Product'}</span>
                               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Catalog Unit: ₹{item.price}</p>
                            </div>
                         </div>
                         <span className="font-mono font-black text-slate-900 text-xl tracking-tighter shadow-sm bg-white px-4 py-2 rounded-xl">₹{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                   </div>
                </div>

                {!isPaid && (
                  <div className="mt-12 p-8 bg-indigo-900 text-white rounded-[32px] shadow-2xl shadow-indigo-100 flex items-center gap-8 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100/10 rounded-full blur-3xl"></div>
                      <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md shrink-0"><AlertCircle className="w-10 h-10 text-indigo-400" /></div>
                      <div>
                          <h5 className="font-black text-2xl tracking-tighter mb-1">Action Required at Counter</h5>
                          <p className="font-medium text-indigo-300 leading-relaxed text-sm">
                            Please proceed to the billing desk. Show your **Token #{order._id.slice(-6).toUpperCase()}** to the cashier to finalize the payment and receive your physical bill.
                          </p>
                      </div>
                  </div>
                )}
              </div>
          )})}
        </div>
      ) : (
        <div className="text-center py-40 bg-white rounded-[56px] border border-slate-50 flex flex-col items-center shadow-xl shadow-slate-100 animate-slide-up">
           <div className="bg-slate-50 w-32 h-32 rounded-[40px] flex items-center justify-center mb-10 border border-slate-100 shadow-inner">
              <History className="w-16 h-16 text-slate-200" />
           </div>
           <h3 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none mb-4">No History.</h3>
           <p className="text-slate-400 font-medium text-lg max-w-xs mx-auto leading-relaxed">It looks like this ledger is currently empty. Start scanning to begin your history.</p>
           <button onClick={() => navigate('/scan')} className="mt-12 px-12 py-6 bg-slate-900 text-white rounded-[28px] font-black text-2xl flex items-center gap-4 transition transform hover:bg-black hover:-translate-y-1 active:scale-95 shadow-2xl shadow-slate-200">
               <Zap className="w-8 h-8" />
               Start Scanning
           </button>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
