import React from 'react';
import { Minus, Plus, Trash2, ShoppingCart, Zap } from 'lucide-react';

const CartItem = ({ item, updateQty, removeFromCart }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-white rounded-[32px] border border-slate-100 hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-50 transition-all duration-300 group relative overflow-hidden">
      
      {/* Visual Glint Effect */}
      <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:left-full transition-all duration-700 pointer-events-none"></div>

      <div className="w-24 h-24 bg-slate-50 rounded-[24px] flex items-center justify-center shrink-0 overflow-hidden relative border border-slate-100 shadow-inner group-hover:scale-105 transition-transform duration-500">
        {item.image ? (
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-1">
             <ShoppingCart className="w-8 h-8 text-slate-300 group-hover:text-indigo-400 transition-colors" />
             <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">No Image</span>
          </div>
        )}
      </div>

      <div className="flex-1 text-center sm:text-left">
        <h4 className="font-black text-2xl text-slate-900 tracking-tight leading-tight mb-2 truncate group-hover:text-indigo-600 transition-colors">{item.name}</h4>
        <div className="flex items-center justify-center sm:justify-start gap-4">
           <div className="text-indigo-600 font-mono font-black text-xl tracking-tighter">₹{item.price}</div>
           <div className="w-1.5 h-1.5 bg-slate-200 rounded-full"></div>
           <div className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em]">In Stock</div>
        </div>
      </div>

      <div className="flex items-center gap-2 bg-slate-50 rounded-[20px] p-1.5 border border-slate-100 shadow-inner">
        <button 
          onClick={() => updateQty(item._id, -1)}
          className="w-12 h-12 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-white rounded-[16px] transition shadow-sm active:scale-90"
        >
          <Minus className="w-5 h-5" />
        </button>
        <span className="font-black text-2xl w-10 text-center text-slate-800 font-mono">{item.qty}</span>
        <button 
          onClick={() => updateQty(item._id, 1)}
          className="w-12 h-12 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-white rounded-[16px] transition shadow-sm active:scale-90"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="text-right px-4 min-w-[140px] hidden lg:block">
        <div className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-1">Item Total</div>
        <div className="font-black font-mono text-3xl text-slate-900 tracking-tighter">₹{(item.price * item.qty).toFixed(2)}</div>
      </div>

      <button 
        onClick={() => removeFromCart(item._id)}
        className="w-14 h-14 flex items-center justify-center shrink-0 text-slate-200 hover:text-red-500 hover:bg-red-50 rounded-[24px] transition-all duration-300"
      >
        <Trash2 className="w-7 h-7" />
      </button>
    </div>
  );
};

export default CartItem;
