import React from 'react';
import { Check, Shield } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Pricing = () => {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />
            <div className="flex-1 py-32 px-6 container mx-auto text-center">
                <div className="max-w-3xl mx-auto mb-20 animate-fade-in">
                    <div className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full font-black text-xs uppercase tracking-widest mb-6">
                        Pricing
                    </div>
                    <h1 className="text-6xl font-black text-slate-900 tracking-tighter mb-6">Simple, transparent pricing.</h1>
                    <p className="text-xl text-slate-500">Pick a plan that scales with your retail business.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {[
                        { name: 'Starter', price: 'Free', target: 'For Small Shops', features: ['Up to 100 products', 'Basic QR Generation', 'Email Support'], popular: false },
                        { name: 'Pro', price: '₹999/mo', target: 'For Supermarkets', features: ['Unlimited Products', 'High-res QR Export', 'Dedicated POS Access', 'Priority Support'], popular: true },
                        { name: 'Enterprise', price: 'Custom', target: 'For Retail Chains', features: ['Multi-branch Sync', 'Custom Integrations', '24/7 Phone Support', 'Dedicated Account Manager'], popular: false },
                    ].map((p, i) => (
                        <div key={i} className={`bg-white rounded-[40px] p-12 text-left shadow-lg border relative transition-transform hover:-translate-y-2 ${p.popular ? 'border-blue-500 shadow-blue-100' : 'border-slate-100'}`}>
                            {p.popular && (
                                <div className="absolute top-0 right-10 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">Most Popular</div>
                            )}
                            <h3 className="text-2xl font-black text-slate-800 tracking-tight mb-2">{p.name}</h3>
                            <div className="text-4xl font-black font-mono text-slate-900 tracking-tighter my-6">{p.price}</div>
                            <p className="text-slate-400 font-bold text-sm uppercase mb-8 tracking-widest pb-8 border-b border-slate-100">{p.target}</p>
                            
                            <ul className="space-y-4 mb-10">
                                {p.features.map((f, idx) => (
                                    <li key={idx} className="flex items-center gap-3">
                                        <div className="bg-green-100 rounded-full p-1">
                                            <Check className="w-4 h-4 text-green-600" />
                                        </div>
                                        <span className="font-bold text-slate-600">{f}</span>
                                    </li>
                                ))}
                            </ul>

                            <a href="/register" className={`w-full py-5 rounded-2xl font-black text-center flex items-center justify-center transition-all ${p.popular ? 'bg-blue-600 text-white shadow-xl shadow-blue-200 hover:bg-blue-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                                Get Started
                            </a>
                        </div>
                    ))}
                </div>

                <div className="mt-20 flex items-center justify-center gap-3 text-slate-400 font-bold text-sm">
                    <Shield className="w-5 h-5" />
                    Secure transactions via Stripe & UPI
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Pricing;
