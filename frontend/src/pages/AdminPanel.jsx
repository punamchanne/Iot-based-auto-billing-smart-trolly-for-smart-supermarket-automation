import React, { useState, useEffect } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { 
  Plus, Trash2, QrCode, Package, BarChart, Bell, ShoppingCart,
  Download, X, CheckCircle, Smartphone, CreditCard, Banknote, TrendingUp, Layers
} from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import Loader from '../components/Loader';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('overview'); // overview | manage | add
  
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Add Product State
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState('');
  
  // Modals
  const [previewQr, setPreviewQr] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [productsRes, ordersRes] = await Promise.all([
        api.get('/products'),
        api.get('/orders')
      ]);
      setProducts(productsRes.data);
      setOrders(ordersRes.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (err) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();
    try {
      await api.post('/products', { name, price: Number(price), stock: Number(stock), image });
      toast.success('Product added successfully!');
      setName(''); setPrice(''); setStock(''); setImage('');
      setActiveTab('manage');
      fetchDashboardData();
    } catch (err) {
      toast.error('Error adding product');
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm('Delete this product permanently?')) {
      try {
        await api.delete(`/products/${id}`);
        toast.success('Product deleted');
        fetchDashboardData();
      } catch (err) {
        toast.error('Error deleting product');
      }
    }
  };

  const downloadQR = (id, name) => {
    const canvas = document.getElementById(`qr-gen-${id}`);
    const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${name}-QR.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  // Analytics Computation safely handling old or malformed data
  const totalRevenue = orders.reduce((acc, o) => acc + (o.totalAmount || 0), 0);
  const totalProductsSold = orders.reduce((acc, o) => acc + (o.products ? o.products.reduce((sum, p) => sum + (p.quantity || 0), 0) : 0), 0);

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-100px)] bg-slate-50 rounded-[40px] overflow-hidden border border-slate-100 shadow-xl m-[-1rem] md:m-0">
      
      {/* SIDEBAR NAVIGATION */}
      <div className="w-full lg:w-[320px] bg-white p-8 border-r border-slate-100 flex flex-col shrink-0">
         <div className="flex items-center gap-4 mb-12">
            <div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-200">
               <BarChart className="w-8 h-8 text-white" />
            </div>
            <div>
               <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-none">Admin Area</h1>
               <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">SmartBill Engine</p>
            </div>
         </div>

         <nav className="space-y-3 flex-1">
            <button 
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center gap-4 px-6 py-5 rounded-2xl font-bold transition-all ${activeTab === 'overview' ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
            >
                <TrendingUp className="w-6 h-6" />
                Data & Overview
            </button>
            <button 
                onClick={() => setActiveTab('manage')}
                className={`w-full flex items-center gap-4 px-6 py-5 rounded-2xl font-bold transition-all ${activeTab === 'manage' ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
            >
                <Layers className="w-6 h-6" />
                Manage Inventory
            </button>
            <button 
                onClick={() => setActiveTab('add')}
                className={`w-full flex items-center gap-4 px-6 py-5 rounded-2xl font-bold transition-all ${activeTab === 'add' ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
            >
                <Plus className="w-6 h-6" />
                Add Product
            </button>
         </nav>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 overflow-y-auto p-8 lg:p-12 custom-scrollbar bg-slate-50 relative">
        {loading ? (
           <div className="flex justify-center items-center h-full"><Loader /></div>
        ) : (
           <>
            {/* 1. OVERVIEW & ANALYTICS */}
            {activeTab === 'overview' && (
              <div className="space-y-10 animate-fade-in">
                 <div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Business Overview</h2>
                    <p className="text-slate-500 mt-2 font-medium">Real-time statistics and recent notifications.</p>
                 </div>

                 {/* Top Stats */}
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-xl transition-shadow">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-[100px] -z-0"></div>
                        <div className="text-green-500 bg-green-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 relative z-10">
                            <Banknote className="w-7 h-7" />
                        </div>
                        <p className="text-sm font-black text-slate-400 uppercase tracking-widest relative z-10">Total Revenue</p>
                        <h3 className="text-4xl font-black font-mono text-slate-900 mt-2 relative z-10 tracking-tighter">₹{totalRevenue.toFixed(2)}</h3>
                    </div>
                    
                    <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-xl transition-shadow">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-[100px] -z-0"></div>
                        <div className="text-blue-500 bg-blue-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 relative z-10">
                            <Package className="w-7 h-7" />
                        </div>
                        <p className="text-sm font-black text-slate-400 uppercase tracking-widest relative z-10">Products Sold</p>
                        <h3 className="text-4xl font-black font-mono text-slate-900 mt-2 relative z-10 tracking-tighter">{totalProductsSold}</h3>
                    </div>

                    <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-xl transition-shadow">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-bl-[100px] -z-0"></div>
                        <div className="text-purple-500 bg-purple-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 relative z-10">
                            <ShoppingCart className="w-7 h-7" />
                        </div>
                        <p className="text-sm font-black text-slate-400 uppercase tracking-widest relative z-10">Active Inventory</p>
                        <h3 className="text-4xl font-black font-mono text-slate-900 mt-2 relative z-10 tracking-tighter">{products.length}</h3>
                    </div>
                 </div>

                 {/* Notifications Feed */}
                 <div className="bg-white rounded-[40px] border border-slate-100 p-8 lg:p-12 shadow-sm">
                    <div className="flex items-center gap-3 mb-8 pb-8 border-b border-slate-100">
                        <div className="p-3 bg-red-100 text-red-600 rounded-xl"><Bell className="w-6 h-6" /></div>
                        <h3 className="text-2xl font-black text-slate-800 tracking-tight">Recent Live Orders</h3>
                        <div className="ml-auto flex items-center gap-3">
                            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                            <span className="font-bold text-slate-400 uppercase text-xs tracking-widest">Live Sync</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {orders.slice(0, 10).map((order) => {
                            let Icon = Smartphone;
                            let color = 'text-blue-500 bg-blue-50';
                            if(order.paymentMethod === 'card') { Icon = CreditCard; color = 'text-purple-500 bg-purple-50'; }
                            if(order.paymentMethod === 'cash') { Icon = Banknote; color = 'text-green-500 bg-green-50'; }

                            return (
                             <div key={order._id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 hover:bg-slate-50 transition rounded-3xl border border-transparent hover:border-slate-100">
                                <div className="flex items-center gap-4">
                                    <div className={`p-4 rounded-2xl ${color}`}><Icon className="w-6 h-6" /></div>
                                    <div>
                                        <p className="font-bold text-slate-800 text-lg">Order #{order._id.slice(-6).toUpperCase()}</p>
                                        <div className="flex items-center gap-3 mt-1">
                                            {order.paymentStatus === 'paid' ? (
                                                <span className="text-[10px] font-black uppercase tracking-widest text-green-700 bg-green-100 px-2 py-1 rounded-md">PAID</span>
                                            ) : (
                                                <span className="text-[10px] font-black uppercase tracking-widest text-orange-700 bg-orange-100 px-2 py-1 rounded-md">PENDING</span>
                                            )}
                                            <p className="text-slate-400 text-sm font-medium flex items-center gap-2">
                                              {order.userId?.name || 'Guest Checkout'} • {order.paymentMethod ? order.paymentMethod.toUpperCase() : 'N/A'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-black font-mono text-2xl text-slate-900 tracking-tighter">₹{(order.totalAmount || 0).toFixed(2)}</div>
                                    <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">{new Date(order.createdAt).toLocaleTimeString()}</div>
                                </div>
                            </div>
                        )})}
                        {orders.length === 0 && <p className="text-slate-400 font-bold text-center py-10">No recent orders found.</p>}
                    </div>
                 </div>
              </div>
            )}


            {/* 2. MANAGE INVENTORY */}
            {activeTab === 'manage' && (
              <div className="space-y-10 animate-fade-in">
                 <div className="flex justify-between items-end">
                    <div>
                        <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Manage Inventory</h2>
                        <p className="text-slate-500 mt-2 font-medium">Generate QR labels and monitor individual stock.</p>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {products.map((product) => (
                      <div key={product._id} className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 hover:shadow-2xl transition-all duration-300 relative group overflow-hidden">
                          <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-bl-[40px] -z-0"></div>
                          <div className="flex items-start justify-between relative z-10 mb-8">
                              <div className="w-24 h-24 bg-white border border-slate-100 rounded-3xl flex items-center justify-center p-3 shadow-sm group-hover:scale-105 transition-transform">
                                  <QRCodeCanvas id={`qr-gen-${product._id}`} value={product._id} size={512} className="w-full h-full" />
                              </div>
                              <button 
                                  onClick={() => deleteProduct(product._id)}
                                  className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                              >
                                  <Trash2 className="w-6 h-6" />
                              </button>
                          </div>

                          <h3 className="text-2xl font-black text-slate-800 tracking-tighter leading-tight truncate relative z-10">{product.name}</h3>
                          
                          <div className="flex items-center gap-3 mt-6">
                              <div className="flex-1 p-4 bg-slate-50 rounded-2xl text-blue-600 font-mono font-black text-xl border border-slate-100">
                                  <div className="text-[10px] text-slate-400 font-sans uppercase tracking-[0.2em] mb-1">Price</div>
                                  ₹{product.price}
                              </div>
                              <div className="flex-1 p-4 bg-slate-50 rounded-2xl text-slate-600 font-mono font-black text-xl border border-slate-100">
                                  <div className="text-[10px] text-slate-400 font-sans uppercase tracking-[0.2em] mb-1">Stock</div>
                                  {product.stock}
                              </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3 mt-6">
                                <button 
                                    onClick={() => downloadQR(product._id, product.name)}
                                    className="py-3 bg-white text-slate-600 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition active:scale-95 border border-slate-200"
                                >
                                    <Download className="w-4 h-4" />
                                    Save
                                </button>
                                <button 
                                    onClick={() => setPreviewQr(product)}
                                    className="py-3 bg-slate-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black transition active:scale-95 shadow-lg shadow-slate-200"
                                >
                                    <QrCode className="w-4 h-4" />
                                    Print
                                </button>
                          </div>
                      </div>
                  ))}
                 </div>
              </div>
            )}


            {/* 3. ADD PRODUCT */}
            {activeTab === 'add' && (
              <div className="animate-fade-in max-w-2xl mx-auto py-8">
                 <div className="text-center mb-12">
                    <div className="bg-blue-100 w-24 h-24 rounded-[32px] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-100/50">
                        <Plus className="w-12 h-12 stroke-[3] text-blue-600" />
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Add New Product</h2>
                    <p className="text-slate-500 mt-2 font-medium">Create a new item in your inventory system.</p>
                 </div>

                 <div className="bg-white rounded-[40px] p-10 lg:p-14 border border-slate-100 shadow-2xl shadow-slate-200/50 relative overflow-hidden">
                    {/* Background glow */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>

                    <form onSubmit={addProduct} className="space-y-8 relative z-10">
                        <label className="block space-y-3 group">
                            <span className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2 group-focus-within:text-blue-600 transition">Product Name</span>
                            <input 
                                type="text" required
                                className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 rounded-[24px] outline-none transition-all font-bold text-slate-800 text-xl"
                                placeholder="e.g. Premium Basmati Rice 1kg"
                                value={name} onChange={(e) => setName(e.target.value)}
                            />
                        </label>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <label className="block space-y-3 group">
                                <span className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2 group-focus-within:text-blue-600 transition">Price (₹)</span>
                                <input 
                                    type="number" required
                                    className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 rounded-[24px] outline-none transition-all font-mono font-black text-slate-800 text-2xl"
                                    placeholder="249"
                                    value={price} onChange={(e) => setPrice(e.target.value)}
                                />
                            </label>
                            
                            <label className="block space-y-3 group">
                                <span className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2 group-focus-within:text-blue-600 transition">Initial Stock</span>
                                <input 
                                    type="number" required
                                    className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 rounded-[24px] outline-none transition-all font-mono font-black text-slate-800 text-2xl"
                                    placeholder="100"
                                    value={stock} onChange={(e) => setStock(e.target.value)}
                                />
                            </label>
                        </div>

                        <label className="block space-y-3 group">
                            <span className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2 group-focus-within:text-blue-600 transition">Image URL (Optional)</span>
                            <input 
                                type="text"
                                className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 rounded-[24px] outline-none transition-all font-bold text-slate-600 text-lg"
                                placeholder="https://example.com/image.jpg"
                                value={image} onChange={(e) => setImage(e.target.value)}
                            />
                        </label>

                        <button 
                            type="submit" 
                            className="w-full bg-slate-900 text-white rounded-[24px] py-6 flex items-center justify-center gap-3 hover:bg-black transition-all transform hover:-translate-y-1 active:scale-95 shadow-2xl shadow-slate-200 mt-4"
                        >
                            <span className="font-black text-2xl tracking-tight">Generate QR & Add Product</span>
                            <Plus className="w-6 h-6 stroke-[3]" />
                        </button>
                    </form>
                 </div>
              </div>
            )}
           </>
        )}
      </div>

      {/* QR Preview Overlay (For Manage Tab) */}
      {previewQr && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xl flex items-center justify-center z-[100] p-6 animate-fade-in">
           <div className="bg-white rounded-[40px] p-12 max-w-sm w-full relative shadow-[0_50px_100px_-20px_rgba(30,41,59,0.4)] text-center animate-receipt-pop">
              <button 
                onClick={() => setPreviewQr(null)}
                className="absolute top-6 right-6 p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-red-500 transition active:scale-90"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="bg-slate-900 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-slate-200">
                 <QrCode className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="text-3xl font-black text-slate-800 tracking-tight leading-none mb-3 truncate px-8">{previewQr.name}</h2>
              <div className="text-slate-400 font-bold mb-8 text-[10px] tracking-[0.2em] uppercase">SKU: {previewQr._id}</div>

              <div className="p-6 bg-white rounded-3xl mb-8 inline-block shadow-lg border border-slate-100">
                <QRCodeCanvas value={previewQr._id} size={512} className="w-48 h-48" />
              </div>

              <button 
                onClick={() => window.print()}
                className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xl shadow-xl shadow-blue-200 hover:bg-blue-700 transition transform active:scale-95 flex items-center justify-center gap-3"
              >
                <Download className="w-6 h-6" />
                Print Sticker
              </button>
           </div>
        </div>
      )}

    </div>
  );
};

export default AdminPanel;
