import React from 'react';
import { Plus, ShoppingCart, Tag, CheckCircle, ArrowRight } from 'lucide-react';

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="group bg-white rounded-[40px] p-6 shadow-sm hover:shadow-[0_40px_100px_-20px_rgba(79,70,229,0.15)] transition-all duration-500 border border-slate-100 flex flex-col relative overflow-hidden transform hover:-translate-y-2">
      
      {/* Decorative Glint */}
      <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover:left-full transition-all duration-700 pointer-events-none"></div>

      {/* Stock & Category Badge */}
      <div className="absolute top-8 left-8 z-20 flex flex-col gap-2">
          <div className={`px-4 py-2 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] shadow-sm backdrop-blur-md border ${product.stock > 0 ? 'bg-green-500/10 text-green-600 border-green-500/20' : 'bg-red-500/10 text-red-600 border-red-500/20'}`}>
             {product.stock > 0 ? 'Live In Stock' : 'Sold Out'}
          </div>
      </div>

      {/* Image Container */}
      <div className="aspect-square bg-slate-50 rounded-[32px] mb-8 flex items-center justify-center text-slate-300 relative overflow-hidden group-hover:bg-indigo-50 transition-colors duration-500 shadow-inner">
        {product.image ? (
          <img src={product.image} alt={product.name} className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700" />
        ) : (
          <div className="flex flex-col items-center gap-3">
             <ShoppingCart className="w-16 h-16 opacity-30 group-hover:scale-110 transition-transform duration-700 group-hover:text-indigo-400 group-hover:opacity-100" />
             <span className="text-[10px] font-black uppercase tracking-widest text-slate-200">Catalog Item</span>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="px-2 flex-1 flex flex-col">
        <h3 className="font-black text-2xl text-slate-900 tracking-tight leading-[1.1] mb-2 group-hover:text-indigo-600 transition-colors duration-300 line-clamp-2">{product.name}</h3>
        
        <div className="flex items-center gap-3 mt-4">
           <div className="p-2 bg-slate-50 rounded-xl"><Tag className="w-4 h-4 text-slate-400" /></div>
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">SKU: {product._id.slice(-6).toUpperCase()}</span>
        </div>

        <div className="flex justify-between items-end mt-8 pt-8 border-t border-slate-50 border-dashed">
          <div>
              <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 leading-none">Market Price</span>
              <span className="text-4xl font-black font-mono text-slate-900 tracking-tighter">₹{product.price}</span>
          </div>
          
          <button 
            onClick={() => addToCart(product)}
            disabled={product.stock <= 0}
            className={`w-16 h-16 rounded-[24px] flex items-center justify-center transition-all transform active:scale-90 shadow-2xl relative group/btn ${product.stock > 0 ? 'bg-indigo-600 text-white hover:bg-slate-950 shadow-indigo-100 hover:shadow-indigo-300' : 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'}`}
          >
            {product.stock > 0 ? (
                <Plus className="w-8 h-8 stroke-[3] group-hover/btn:rotate-90 transition-transform" />
            ) : (
                <CheckCircle className="w-7 h-7" />
            )}
          </button>
        </div>
      </div>

    </div>
  );
};

export default ProductCard;
