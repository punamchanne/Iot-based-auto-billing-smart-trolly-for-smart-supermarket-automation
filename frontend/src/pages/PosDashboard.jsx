import React, { useState, useEffect } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { 
  CheckCircle, Clock, Search, Smartphone, Banknote, CreditCard, Receipt, Store, Loader2, User, Phone, MapPin
} from 'lucide-react';
import Loader from '../components/Loader';

const PosDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [search, setSearch] = useState('');

  // Billing Form State
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await api.get('/orders');
      const pendingOrders = data.filter(o => o.status === 'pending').sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt));
      setOrders(pendingOrders);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 401) {
        // Redirection handled by api interceptor
        return;
      }
      toast.error('Failed to sync live orders');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkPaid = async () => {
    if (!paymentMethod) {
      toast.error('Please select a payment method.');
      return;
    }

    setProcessing(true);
    try {
      await api.patch(`/orders/${selectedOrder._id}`, {
        status: 'completed',
        paymentStatus: 'paid',
        paymentMethod: paymentMethod,
        customerPhone: customerPhone,
        customerAddress: customerAddress
      });
      
      toast.success('Invoice Generated & Marked as PAID!');
      resetForm();
      fetchOrders();
    } catch (err) {
      toast.error('Error processing payment');
    } finally {
      setProcessing(false);
    }
  };

  const resetForm = () => {
    setSelectedOrder(null);
    setPaymentMethod('');
    setCustomerPhone('');
    setCustomerAddress('');
  };

  const handlePrint = () => {
     if (!paymentMethod) {
        toast.error('Select payment method first!');
        return;
     }
     window.print();
     handleMarkPaid();
  };

  const filteredOrders = orders.filter(
    (order) => 
      order._id.toLowerCase().includes(search.toLowerCase()) || 
      (order.userId?.name && order.userId.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-100px)] bg-slate-50 rounded-[40px] overflow-hidden border border-slate-100 shadow-xl m-[-1rem] md:m-0 print:m-0 print:bg-white print:shadow-none print:border-none">
      
      {/* LEFT: PENDING QUEUE (Hidden on Print) */}
      <div className="w-full lg:w-[400px] bg-white border-r border-slate-100 flex flex-col shrink-0 h-full print:hidden">
         <div className="p-8 border-b border-slate-100 bg-white">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200">
                    <Store className="w-8 h-8 text-white" />
                </div>
                <div>
                   <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-none uppercase">Checkout</h1>
                   <p className="text-[10px] font-black text-slate-400 tracking-widest mt-1 flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                     LIVE COUNTER
                   </p>
                </div>
            </div>

            <div className="relative group">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-indigo-600 transition" />
               <input 
                  type="text"
                  placeholder="Customer name or Token..."
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-2xl outline-none font-bold text-slate-800 transition"
                  value={search} onChange={(e) => setSearch(e.target.value)}
               />
            </div>
         </div>

         <div className="p-4 space-y-3 overflow-y-auto custom-scrollbar flex-1 bg-slate-50/50">
            {loading ? (
                <div className="flex justify-center py-10"><Loader /></div>
            ) : filteredOrders.length === 0 ? (
                <div className="text-center py-20 px-8">
                   <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"><Receipt className="w-10 h-10 text-slate-300" /></div>
                   <h3 className="font-black text-slate-800 text-xl tracking-tight leading-none uppercase mb-2">No Tokens</h3>
                   <p className="text-slate-500 font-medium text-sm">Customers haven't submitted scans yet.</p>
                </div>
            ) : (
                filteredOrders.map(order => (
                    <button 
                        key={order._id}
                        onClick={() => { setSelectedOrder(order); setCustomerPhone(''); setCustomerAddress(''); }}
                        className={`w-full text-left p-6 rounded-[28px] border-2 transition-all flex items-center justify-between ${
                            selectedOrder?._id === order._id 
                                ? 'bg-indigo-600 border-indigo-600 shadow-xl shadow-indigo-100 scale-[1.02]' 
                                : 'bg-white border-transparent hover:border-slate-200 hover:shadow-sm'
                        }`}
                    >
                       <div>
                          <p className={`font-black text-lg ${selectedOrder?._id === order._id ? 'text-white' : 'text-slate-900'}`}>{order.userId?.name || 'Walk-in User'}</p>
                          <p className={`text-[10px] font-black uppercase tracking-widest mt-1 flex items-center gap-1 ${selectedOrder?._id === order._id ? 'text-indigo-100' : 'text-slate-400'}`}>
                             <Clock className="w-3 h-3" /> 
                             {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                       </div>
                       <div className="text-right">
                          <p className={`font-mono font-black text-xl tracking-tighter ${selectedOrder?._id === order._id ? 'text-white' : 'text-indigo-600'}`}>₹{order.totalAmount.toFixed(2)}</p>
                       </div>
                    </button>
                ))
            )}
         </div>
      </div>

      {/* RIGHT: BILLING WORKSTATION */}
      <div className="flex-1 bg-slate-50 p-6 md:p-12 overflow-y-auto custom-scrollbar relative print:p-0 print:bg-white print:overflow-visible">
          {selectedOrder ? (
              <div className="max-w-4xl mx-auto space-y-8 animate-fade-in print:max-w-none">
                 
                 <div className="flex flex-col lg:flex-row gap-8 print:block">
                     
                     {/* LEFT: FORM (Optional info) - Skip on Print */}
                     <div className="flex-1 space-y-6 print:hidden">
                        <section className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm space-y-6">
                            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                <User className="w-4 h-4" /> Billing Information
                            </h3>
                            
                            <label className="block space-y-2">
                               <span className="text-xs font-black text-slate-400 ml-2 uppercase tracking-widest">Phone Number</span>
                               <div className="relative group">
                                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-indigo-600 transition" />
                                  <input 
                                     type="text" 
                                     placeholder="e.g. +91 9876543210"
                                     className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-2xl outline-none font-bold text-slate-800 transition"
                                     value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)}
                                  />
                               </div>
                            </label>

                            <label className="block space-y-2">
                               <span className="text-xs font-black text-slate-400 ml-2 uppercase tracking-widest">Billing Address</span>
                               <div className="relative group">
                                  <MapPin className="absolute left-4 top-4 w-5 h-5 text-slate-300 group-focus-within:text-indigo-600 transition" />
                                  <textarea 
                                     rows={3}
                                     placeholder="Street name, landmark..."
                                     className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-2xl outline-none font-bold text-slate-800 transition resize-none"
                                     value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)}
                                  />
                               </div>
                            </label>

                            <div className="pt-4">
                                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Select Payment</h3>
                                <div className="grid grid-cols-3 gap-3">
                                    <button onClick={() => setPaymentMethod('cash')} className={`py-4 rounded-xl flex flex-col items-center gap-2 border-2 transition ${paymentMethod === 'cash' ? 'border-green-500 bg-green-50 text-green-700' : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200'}`}>
                                        <Banknote className="w-5 h-5" /><span className="text-[10px] uppercase font-black">CASH</span>
                                    </button>
                                    <button onClick={() => setPaymentMethod('upi')} className={`py-4 rounded-xl flex flex-col items-center gap-2 border-2 transition ${paymentMethod === 'upi' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200'}`}>
                                        <Smartphone className="w-5 h-5" /><span className="text-[10px] uppercase font-black">UPI</span>
                                    </button>
                                    <button onClick={() => setPaymentMethod('card')} className={`py-4 rounded-xl flex flex-col items-center gap-2 border-2 transition ${paymentMethod === 'card' ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200'}`}>
                                        <CreditCard className="w-5 h-5" /><span className="text-[10px] uppercase font-black">CARD</span>
                                    </button>
                                </div>
                            </div>
                        </section>
                     </div>

                     {/* RIGHT: THE BILL (Visible and focus on Print) */}
                     <div className="w-full lg:w-[450px] print:w-full">
                         <div id="capture-bill" className="bg-white rounded-3xl p-10 border border-slate-100 shadow-xl print:shadow-none print:border-none print:p-0">
                             
                             <div className="text-center pb-8 border-b-2 border-dashed border-slate-100 mb-8">
                                 <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">SmartBill</h2>
                                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-2">Professional Store Receipt</p>
                             </div>

                             <div className="flex justify-between items-start mb-8 text-sm">
                                 <div className="space-y-1">
                                    <p className="font-extrabold text-slate-400 uppercase text-[9px] tracking-widest">Bill To</p>
                                    <p className="font-black text-slate-900 text-lg leading-tight">{selectedOrder.userId?.name || 'Walk-in Customer'}</p>
                                    {customerPhone && <p className="font-bold text-slate-500">{customerPhone}</p>}
                                    {customerAddress && <p className="text-slate-400 font-medium max-w-[200px] leading-snug">{customerAddress}</p>}
                                 </div>
                                 <div className="text-right space-y-1">
                                    <p className="font-extrabold text-slate-400 uppercase text-[9px] tracking-widest">Token ID</p>
                                    <p className="font-black text-slate-800">#{selectedOrder._id.slice(-8).toUpperCase()}</p>
                                    <p className="text-[10px] font-bold text-slate-400 mt-2">{new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</p>
                                 </div>
                             </div>

                             <div className="space-y-4 mb-8">
                                 <div className="flex justify-between font-black text-slate-400 uppercase text-[9px] tracking-widest px-1">
                                     <span>Description</span>
                                     <span>Amount</span>
                                 </div>
                                 <div className="space-y-3">
                                    {selectedOrder.products.map((item, idx) => (
                                        <div key={idx} className="flex justify-between items-center text-sm">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-800 mb-0.5">{item.productId?.name || 'Item'}</span>
                                                <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{item.quantity} x ₹{item.price}</span>
                                            </div>
                                            <span className="font-black text-slate-900">₹{(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                 </div>
                             </div>

                             <div className="space-y-3 pt-6 border-t border-dashed border-slate-200">
                                 <div className="flex justify-between items-center font-bold text-slate-400">
                                     <span className="text-xs uppercase tracking-widest">Subtotal</span>
                                     <span className="font-mono">₹{(selectedOrder.totalAmount / 1.18).toFixed(2)}</span>
                                 </div>
                                 <div className="flex justify-between items-center font-bold text-slate-400">
                                     <span className="text-xs uppercase tracking-widest">GST (18%)</span>
                                     <span className="font-mono">₹{(selectedOrder.totalAmount - (selectedOrder.totalAmount / 1.18)).toFixed(2)}</span>
                                 </div>
                                 <div className="flex justify-between items-center pt-4 mt-2 border-t border-slate-100">
                                     <span className="text-xl font-black text-slate-900 tracking-tight">TOTAL DUE</span>
                                     <span className="text-3xl font-black text-indigo-600 font-mono tracking-tighter">₹{selectedOrder.totalAmount.toFixed(2)}</span>
                                 </div>
                             </div>

                             <div className="text-center mt-12 pt-8 border-t border-dashed border-slate-100">
                                 <div className="bg-slate-50 text-slate-400 p-4 rounded-2xl inline-block border border-slate-100 mb-4 print:mb-0">
                                     <p className="text-[9px] font-black uppercase tracking-[0.2em]">Thank you for shopping!</p>
                                     <p className="text-[8px] font-bold mt-1 uppercase tracking-widest">Powered by SmartBill Engine</p>
                                 </div>
                             </div>
                         </div>

                         {/* Actions - Skip on Print */}
                         <div className="mt-8 flex gap-4 print:hidden">
                            <button onClick={resetForm} className="flex-1 py-5 bg-white text-slate-400 rounded-2xl font-black uppercase tracking-widest text-xs hover:text-red-500 hover:bg-red-50 border border-slate-100 transition active:scale-95">Discard</button>
                            <button 
                               onClick={handlePrint}
                               disabled={processing}
                               className={`flex-[2] py-5 rounded-2xl font-black flex items-center justify-center gap-3 transition-all shadow-xl active:scale-95 ${
                                 paymentMethod ? 'bg-indigo-600 text-white shadow-indigo-100' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                               }`}
                            >
                               {processing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Receipt className="w-5 h-5" />}
                               MARK PAID & PRINT
                            </button>
                         </div>
                     </div>

                 </div>

              </div>
          ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300 pointer-events-none print:hidden">
                  <div className="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center mb-8"><Store className="w-16 h-16" /></div>
                  <h2 className="text-4xl font-black tracking-tighter text-slate-400 uppercase leading-none">Awaiting Checkout</h2>
                  <p className="font-bold text-slate-300 mt-3 uppercase tracking-widest text-[10px]">Select a pending token from the left to start billing.</p>
              </div>
          )}
      </div>

    </div>
  );
};

export default PosDashboard;
