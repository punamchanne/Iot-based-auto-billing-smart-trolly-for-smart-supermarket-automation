import React from 'react';
import { Smartphone, Scan, TrendingUp, CheckCircle, ShieldCheck, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Features = () => {
    const allFeatures = [
        { title: 'Self-Scanning Tech', desc: 'Allow customers to scan products with their own smartphones and pay instantly via UPI or card without waiting in lines.', icon: Smartphone, color: 'text-blue-500', bg: 'bg-blue-50' },
        { title: 'Lightning POS', desc: 'State-of-the-art billing panel for cashiers optimized for speed. Complete customer orders in less than a second.', icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-50' },
        { title: 'Real-time Analytics', desc: 'Monitor daily revenue, view stock levels, and track deep sales trends with our comprehensive analytics dashboard.', icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-50' },
        { title: 'Live QR Generation', desc: 'Generate unique, high-resolution QR codes directly from the admin panel for all your in-store inventory and products.', icon: Scan, color: 'text-purple-500', bg: 'bg-purple-50' },
        { title: 'Enterprise Security', desc: 'Role-based access controls ensuring standard users, cashiers, and administrators have strictly defined permissions.', icon: ShieldCheck, color: 'text-red-500', bg: 'bg-red-50' },
        { title: 'Automated Invoicing', desc: 'Instantly generate detailed PDF receipts and invoices for easy printing or digital sharing with your customers.', icon: CheckCircle, color: 'text-indigo-500', bg: 'bg-indigo-50' },
    ];

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Navbar />
            <div className="flex-1">
                <div className="container mx-auto px-6 py-24 pb-32">
                    <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in">
                        <div className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-full font-black text-xs uppercase tracking-widest mb-6">
                            Capabilities
                        </div>
                        <h1 className="text-6xl font-black text-slate-900 tracking-tighter mb-6">Everything you need.</h1>
                        <p className="text-xl text-slate-400 font-medium">SmartBill replaces multiple fragmented tools with one complete, seamless ecosystem designed to scale your store.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {allFeatures.map((f, i) => (
                            <div key={i} className="bg-white p-10 rounded-[40px] shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 group animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
                                <div className={`${f.bg} ${f.color} w-16 h-16 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                                    <f.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-black text-slate-800 mb-4 tracking-tight">{f.title}</h3>
                                <p className="text-slate-500 font-medium leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Features;
