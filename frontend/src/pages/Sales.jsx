import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, TrendingUp, DollarSign, ShoppingBag, Users, Calendar, Filter, FileText, Download, Target, Zap, Waves
} from 'lucide-react';
import Loader from '../components/Loader';

const Sales = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await api.get('/orders');
                setOrders(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);
    const averageOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;

    const filteredOrders = orders.filter(o => 
        (o.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (o._id.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="max-w-7xl mx-auto space-y-16 animate-fade-in py-4">
            
            <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-600 rounded-full font-black text-[10px] uppercase tracking-widest border border-green-200">
                        <Waves className="w-3 h-3 animate-pulse" />
                        Live Revenue Stream
                    </div>
                    <h1 className="text-6xl font-black text-slate-900 tracking-tighter leading-none">Global Sales.</h1>
                    <p className="text-xl text-slate-400 font-medium tracking-tight">Monitor your store performance in real-time.</p>
                </div>

                <div className="relative w-full lg:w-[400px] group">
                    <Filter className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-6 h-6 group-focus-within:text-indigo-600 transition-colors" />
                    <input 
                        type="text" 
                        placeholder="Search invoices..."
                        className="w-full pl-16 pr-8 py-6 bg-white border-2 border-transparent focus:border-indigo-600 rounded-[32px] outline-none transition-all shadow-xl shadow-slate-100 font-black text-slate-800 text-xl"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </header>

            {loading ? <div className="flex justify-center py-20"><Loader /></div> : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                        
                        <div className="bg-slate-950 rounded-[48px] p-10 text-white shadow-2xl relative overflow-hidden group">
                           <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-600 rounded-full blur-[100px] opacity-20 transition-transform group-hover:scale-150 duration-700"></div>
                           <div className="p-4 bg-white/10 rounded-2xl w-fit mb-8 border border-white/10 backdrop-blur-md">
                              <DollarSign className="w-8 h-8 text-indigo-400" />
                           </div>
                           <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2">Gross Revenue</h3>
                           <div className="text-5xl font-black font-mono tracking-tighter">₹{totalRevenue.toFixed(2)}</div>
                        </div>

                        <div className="bg-white rounded-[48px] p-10 shadow-xl border border-slate-50 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-orange-100 rounded-full blur-[80px] opacity-50"></div>
                           <div className="p-4 bg-orange-50 rounded-2xl w-fit mb-8 border border-orange-100">
                              <ShoppingBag className="w-8 h-8 text-orange-500" />
                           </div>
                           <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">Total Invoices</h3>
                           <div className="text-5xl font-black font-mono tracking-tighter text-slate-900">{orders.length}</div>
                        </div>

                        <div className="bg-white rounded-[48px] p-10 shadow-xl border border-slate-50 relative overflow-hidden group">
                           <div className="absolute top-0 right-0 w-48 h-48 bg-purple-100 rounded-full blur-[80px] opacity-50"></div>
                           <div className="p-4 bg-purple-50 rounded-2xl w-fit mb-8 border border-purple-100">
                              <Users className="w-8 h-8 text-purple-500" />
                           </div>
                           <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">Active Users</h3>
                           <div className="text-5xl font-black font-mono tracking-tighter text-slate-900">
                               {new Set(orders.map(o => o.userId?._id)).size}
                           </div>
                        </div>

                        <div className="bg-white rounded-[48px] p-10 shadow-xl border border-slate-50 relative overflow-hidden group">
                           <div className="absolute bottom-0 right-0 w-48 h-48 bg-emerald-100 rounded-full blur-[80px] opacity-50"></div>
                           <div className="p-4 bg-emerald-50 rounded-2xl w-fit mb-8 border border-emerald-100">
                              <Target className="w-8 h-8 text-emerald-500" />
                           </div>
                           <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">Avg Order Value</h3>
                           <div className="text-5xl font-black font-mono tracking-tighter text-slate-900">₹{averageOrderValue.toFixed(0)}</div>
                        </div>
                    </div>

                    <div className="bg-white rounded-[56px] shadow-2xl shadow-slate-200 border border-slate-50 overflow-hidden">
                        <div className="p-12 border-b border-slate-100 bg-slate-50/30 flex flex-col sm:flex-row justify-between items-center gap-6">
                            <div className="flex items-center gap-5">
                                <div className="p-4 bg-indigo-600 rounded-[20px] shadow-lg shadow-indigo-100">
                                    <FileText className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none">Detailed Ledger</h3>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">{filteredOrders.length} Transactions Found</p>
                                </div>
                            </div>
                            <button className="px-8 py-5 bg-slate-900 text-white rounded-[24px] font-black text-lg flex items-center gap-3 hover:bg-black transition transform active:scale-95 shadow-xl shadow-slate-200">
                                <Download className="w-6 h-6" />
                                Export Assets
                            </button>
                        </div>
                        
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50/80 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-100">
                                    <tr>
                                        <th className="px-12 py-8">Ref ID</th>
                                        <th className="px-12 py-8">Customer Detail</th>
                                        <th className="px-12 py-8">Items Trace</th>
                                        <th className="px-12 py-8">Channel</th>
                                        <th className="px-12 py-8 text-right">Revenue</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {filteredOrders.length > 0 ? (
                                        filteredOrders.map(order => (
                                            <tr key={order._id} className="hover:bg-indigo-50/30 transition-colors group cursor-default">
                                                <td className="px-12 py-8">
                                                    <div className="font-mono font-black text-indigo-600 text-xl tracking-tighter">#{order._id.slice(-8).toUpperCase()}</div>
                                                    <div className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-widest">{new Date(order.createdAt).toLocaleDateString()}</div>
                                                </td>
                                                <td className="px-12 py-8">
                                                    <div className="font-black text-slate-900 text-lg group-hover:text-indigo-600 transition-colors">{order.userId?.name || 'Guest User'}</div>
                                                    <div className="text-xs text-slate-400 font-bold lowercase tracking-tight opacity-70">{order.userId?.email || 'Walk-in Store Customer'}</div>
                                                </td>
                                                <td className="px-12 py-8">
                                                    <div className="flex gap-1.5">
                                                        {order.products.slice(0, 4).map((p, i) => (
                                                            <div key={i} className="w-8 h-8 rounded-xl bg-white border border-slate-200 text-[10px] font-black text-slate-600 flex items-center justify-center shadow-sm" title={p.productId?.name}>{p.quantity}</div>
                                                        ))}
                                                        {order.products.length > 4 && <div className="text-[10px] font-black text-slate-300 flex items-center ml-2">+{order.products.length - 4} Items</div>}
                                                    </div>
                                                </td>
                                                <td className="px-12 py-8">
                                                    <div className={`px-5 py-2.5 rounded-2xl font-black text-[10px] uppercase tracking-widest inline-flex items-center gap-2 border ${
                                                         order.paymentMethod === 'cash' ? 'bg-green-50 text-green-600 border-green-100' : 
                                                         order.paymentMethod === 'upi' ? 'bg-blue-50 text-blue-600 border-blue-100' : 
                                                         'bg-indigo-50 text-indigo-600 border-indigo-100'
                                                    }`}>
                                                        <Zap className="w-3.5 h-3.5 fill-current" />
                                                        {order.paymentMethod || 'CASH'}
                                                    </div>
                                                </td>
                                                <td className="px-12 py-8 text-right font-mono font-black text-3xl tracking-tighter text-slate-900 group-hover:text-indigo-600 transition-colors">₹{order.totalAmount.toFixed(2)}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="px-12 py-32 text-center">
                                                <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"><Target className="w-10 h-10 text-slate-200" /></div>
                                                <h4 className="text-2xl font-black text-slate-300 uppercase tracking-tighter">No History Found</h4>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Sales;
