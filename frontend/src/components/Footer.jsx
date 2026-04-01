import React from 'react';
import { ShoppingCart, Globe, MessageCircle, MonitorPlay, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-white pt-24 pb-12">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
                    <div className="space-y-8">
                        <div className="flex items-center gap-3 text-3xl font-black tracking-tighter">
                            <div className="bg-blue-600 p-2 rounded-xl">
                                <ShoppingCart className="w-8 h-8 text-white" />
                            </div>
                            <span>SmartBill.</span>
                        </div>
                        <p className="text-slate-400 font-medium leading-relaxed max-w-xs">
                            The world's fastest QR-based self-scanning and POS billing solution for modern supermarkets and retail stores.
                        </p>
                        <div className="flex items-center gap-4">
                            {[Globe, MessageCircle, MonitorPlay].map((Icon, idx) => (
                                <a key={idx} href="#" className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-blue-600 transition-all group">
                                    <Icon className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-8">
                        <h4 className="text-xl font-black tracking-tight">Quick Links</h4>
                        <ul className="space-y-4 text-slate-400 font-bold uppercase tracking-widest text-xs">
                            <li><Link to="/" className="hover:text-blue-500 transition-colors">Home</Link></li>
                            <li><Link to="/login" className="hover:text-blue-500 transition-colors">Login</Link></li>
                            <li><Link to="/register" className="hover:text-blue-500 transition-colors">Register</Link></li>
                            <li><Link to="/pricing" className="hover:text-blue-500 transition-colors">Pricing Plans</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-8">
                        <h4 className="text-xl font-black tracking-tight">Features</h4>
                        <ul className="space-y-4 text-slate-400 font-bold uppercase tracking-widest text-xs">
                            <li><Link to="/features" className="hover:text-blue-500 transition-colors">All Features</Link></li>
                            <li><Link to="/features" className="hover:text-blue-500 transition-colors">POS Dashboard</Link></li>
                            <li><Link to="/features" className="hover:text-blue-500 transition-colors">Sales Analytics</Link></li>
                            <li><Link to="/features" className="hover:text-blue-500 transition-colors">Order History</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-8">
                        <h4 className="text-xl font-black tracking-tight">Contact Us</h4>
                        <ul className="space-y-6">
                            <li className="flex items-center gap-4">
                                <div className="bg-blue-600/10 p-3 rounded-xl">
                                    <Mail className="w-5 h-5 text-blue-500" />
                                </div>
                                <span className="text-slate-400 font-medium">support@smartbill.io</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="bg-blue-600/10 p-3 rounded-xl">
                                    <Phone className="w-5 h-5 text-blue-500" />
                                </div>
                                <span className="text-slate-400 font-medium">+91 (800) 123-4567</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-sm font-bold text-slate-500 tracking-widest uppercase text-center">
                    <p>© 2026 SmartBill Systems. All Rights Reserved.</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
