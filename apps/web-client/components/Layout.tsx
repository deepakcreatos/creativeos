
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Dna,
    Rocket,
    Calendar,
    BarChart3,
    ChevronDown,
    Globe,
    Facebook,
    Twitter,
    Instagram,
    Youtube,
    CloudLightning as Sparkles
} from 'lucide-react';
import { Page } from '../types/ui-types';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const pathname = usePathname();

    const navItems = [
        { id: 'landing', label: 'Home', href: '/' },
        { id: 'dashboard', label: 'Dashboard', href: '/dashboard' },
        { id: 'client-dna', label: 'Features', href: '/client-dna' },
        { id: 'pricing', label: 'Pricing', href: '/pricing' },
        { id: 'analytics', label: 'Analytics', href: '/analytics' },
    ] as const;

    const isActive = (href: string) => {
        if (href === '/' && pathname === '/') return true;
        if (href !== '/' && pathname?.startsWith(href)) return true;
        return false;
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            {/* Header */}
            <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <Link href="/" className="flex items-center gap-2 cursor-pointer">
                            <div className="bg-[#0061FF] p-1.5 rounded-lg text-white">
                                <Sparkles size={24} />
                            </div>
                            <span className="text-2xl font-bold font-heading text-slate-900 tracking-tight">Creative<span className="text-[#0061FF]">OS</span></span>
                        </Link>

                        <nav className="hidden lg:flex space-x-10">
                            {navItems.map((item) => (
                                <Link
                                    key={item.id}
                                    href={item.href}
                                    className={`text-sm font-semibold transition-colors hover:text-[#0061FF] ${isActive(item.href) ? 'text-[#0061FF]' : 'text-slate-600'
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <button className="text-sm font-semibold text-slate-600 hover:text-[#0061FF] flex items-center gap-1">
                                More <ChevronDown size={14} />
                            </button>
                        </nav>

                        <div className="flex items-center gap-4">
                            <Link
                                href="/auth/login"
                                className="text-sm font-bold text-slate-900 px-5 py-2.5 hover:bg-slate-50 rounded-xl transition-colors"
                            >
                                Log In
                            </Link>
                            <Link
                                href="/auth/register"
                                className="text-sm font-bold text-white bg-[#0061FF] px-6 py-2.5 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                            >
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-white pt-20 pb-10 border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="flex items-center gap-2">
                                <div className="bg-[#0061FF] p-1.5 rounded-lg text-white">
                                    <Sparkles size={20} />
                                </div>
                                <span className="text-xl font-bold font-heading text-slate-900">CreativeOS</span>
                            </div>
                            <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
                                CreativeOS helps you manage clients, generate high-performing campaigns, and track analytics—all from one smart platform.
                            </p>
                            <div className="flex gap-4">
                                {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                                    <button key={i} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#0061FF] hover:border-[#0061FF] transition-all">
                                        <Icon size={18} />
                                    </button>
                                ))}
                            </div>
                            <div className="flex items-center gap-2 text-green-500 text-xs font-bold">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                All services are online
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold text-slate-900 mb-6">Company</h4>
                            <ul className="space-y-4 text-sm text-slate-500">
                                <li><Link href="/" className="hover:text-[#0061FF]">Home</Link></li>
                                <li><Link href="/client-dna" className="hover:text-[#0061FF]">Features</Link></li>
                                <li className="hover:text-[#0061FF] cursor-pointer">Service</li>
                                <li><Link href="/pricing" className="hover:text-[#0061FF]">Pricing</Link></li>
                                <li className="hover:text-[#0061FF] cursor-pointer">Blog</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-slate-900 mb-6">Resources</h4>
                            <ul className="space-y-4 text-sm text-slate-500">
                                <li className="hover:text-[#0061FF] cursor-pointer">FAQs</li>
                                <li className="hover:text-[#0061FF] cursor-pointer">Success Stories</li>
                                <li className="hover:text-[#0061FF] cursor-pointer">About Us</li>
                                <li className="hover:text-[#0061FF] cursor-pointer">Support Center</li>
                                <li className="hover:text-[#0061FF] cursor-pointer">Contact</li>
                            </ul>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h4 className="font-bold text-slate-900 mb-4">Language</h4>
                                <div className="flex items-center justify-between px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-600">
                                    <div className="flex items-center gap-2">
                                        <Globe size={16} /> English (US)
                                    </div>
                                    <ChevronDown size={14} />
                                </div>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 mb-4">Currency</h4>
                                <div className="flex items-center justify-between px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-600">
                                    <span className="font-bold">USD</span>
                                    <ChevronDown size={14} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-400">
                        <div className="flex gap-6">
                            <span className="hover:text-slate-600 cursor-pointer">Terms of service</span>
                            <span className="hover:text-slate-600 cursor-pointer">Privacy policy</span>
                            <span className="hover:text-slate-600 cursor-pointer">Cookies settings</span>
                        </div>
                        <p>© 2025 CreativeOS AI Platform. All Rights Reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};
