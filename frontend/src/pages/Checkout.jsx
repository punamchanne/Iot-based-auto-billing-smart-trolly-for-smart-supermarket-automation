import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import api from '../services/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, MapPin, Receipt, ArrowLeft, Loader2, Store } from 'lucide-react';

const Checkout = () => {
  const { cartItems, clearCart, totalAmount } = useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  const gst = totalAmount * 0.18;
  const grandTotal = totalAmount + gst;

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Create pending order for Cashier to approve
      await api.post('/orders', {
        products: cartItems.map(item => ({
          productId: item._id,
          quantity: item.qty || 1,
          price: item.price
        })),
        totalAmount: grandTotal,
        paymentMethod: 'unpaid',
        paymentStatus: 'pending',
        status: 'pending' // pending until cashier marks paid
      });
      
      clearCart();
      toast.success('Bill Token Generated!', { duration: 4000 });
      // Redirect User to their Dashboard or History where they can view their status
      navigate('/history');
    } catch (error) {
      console.error(error);
      toast.error('Failed to generate bill token. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in relative z-10 space-y-8">
      
      <div className="flex items-center justify-between mb-8">
         <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Checkout</h1>
            <p className="text-slate-500 font-medium">Review your items and generate a bill token.</p>
         </div>
         <button onClick={() => navigate('/scan')} className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-50 transition shadow-sm active:scale-95">
             <ArrowLeft className="w-5 h-5" /> Back to Scanner
         </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-white rounded-[32px] p-8 lg:p-10 shadow-sm border border-slate-100 flex flex-col h-full">
            <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-3">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-xl"><Receipt className="w-5 h-5" /></div>
                Order Details
            </h2>
            
            <div className="space-y-4 mb-8 flex-1 overflow-y-auto max-h-[300px] custom-scrollbar pr-2">
              {cartItems.map((item) => (
                <div key={item._id} className="flex justify-between items-center py-3 border-b border-slate-50">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center font-bold text-slate-500 border border-slate-100 shadow-inner">
                        {item.qty || 1}x
                     </div>
                     <div>
                        <p className="font-bold text-slate-800 line-clamp-1">{item.name}</p>
                        <p className="text-xs text-slate-400 font-bold tracking-widest uppercase">₹{item.price} each</p>
                     </div>
                  </div>
                  <p className="font-black text-lg text-slate-800">₹{(item.price * (item.qty || 1)).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="bg-slate-50 rounded-[24px] p-6 border border-slate-100 space-y-3 mt-auto">
              <div className="flex justify-between text-slate-500 font-bold">
                <span>Subtotal</span>
                <span>₹{totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-500 font-bold">
                <span>GST (18%)</span>
                <span>₹{gst.toFixed(2)}</span>
              </div>
              <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
                <span className="font-black text-slate-800 text-xl">Total Expected</span>
                <span className="font-black text-3xl font-mono text-blue-600 tracking-tighter">₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>
        </div>

        {/* Counter Payment Instructions */}
        <div className="space-y-8">
             <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
                 <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-3">
                     <div className="p-2 bg-indigo-100 text-indigo-600 rounded-xl"><Store className="w-5 h-5" /></div>
                     How to Pay
                 </h2>
                 <div className="space-y-5 relative">
                     {/* Timeline line */}
                     <div className="absolute top-8 left-6 bottom-8 w-0.5 bg-slate-100"></div>

                     <div className="flex items-start gap-5 relative z-10">
                         <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center font-black text-xl shrink-0 shadow-lg shadow-indigo-200">1</div>
                         <div className="pt-2">
                             <h4 className="font-bold text-slate-800 text-lg">Generate Token</h4>
                             <p className="text-sm text-slate-500 font-medium">Click the button below to complete your self-scan.</p>
                         </div>
                     </div>
                     <div className="flex items-start gap-5 relative z-10">
                         <div className="w-12 h-12 bg-white border-2 border-indigo-200 text-indigo-600 rounded-2xl flex items-center justify-center font-black text-xl shrink-0">2</div>
                         <div className="pt-2">
                             <h4 className="font-bold text-slate-800 text-lg">Proceed to Cashier</h4>
                             <p className="text-sm text-slate-500 font-medium">Go to the billing counter and share your Name/Token.</p>
                         </div>
                     </div>
                     <div className="flex items-start gap-5 relative z-10">
                         <div className="w-12 h-12 bg-white border-2 border-indigo-200 text-indigo-600 rounded-2xl flex items-center justify-center font-black text-xl shrink-0">3</div>
                         <div className="pt-2">
                             <h4 className="font-bold text-slate-800 text-lg">Pay & Collect Bill</h4>
                             <p className="text-sm text-slate-500 font-medium">Pay via Cash/Card/UPI at the counter directly.</p>
                         </div>
                     </div>
                 </div>
             </div>

             <button
                 onClick={handleCreateOrder}
                 disabled={loading}
                 className="w-full bg-slate-900 text-white p-6 rounded-[24px] font-black text-2xl tracking-tighter hover:bg-black transition shadow-2xl shadow-slate-200 flex items-center justify-center gap-3 transform hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:hover:translate-y-0"
             >
                 {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <CheckCircle className="w-7 h-7" />}
                 {loading ? 'Processing...' : 'Generate Bill Token'}
             </button>
        </div>
        
      </div>
    </div>
  );
};

export default Checkout;
