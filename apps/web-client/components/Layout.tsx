
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import {
    LayoutDashboard,
    Dna,
    Rocket,
    Calendar,
    BarChart3,
    ChevronDown,
    Globe,
    User,
    Target,
    Settings,
    CloudLightning as Sparkles
} from 'lucide-react';
import { Page } from '../types/ui-types';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const pathname = usePathname();
    const router = useRouter();
    const { user, isAuthenticated, logout } = useAuth();

    const [featuresOpen, setFeaturesOpen] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleConfirmLogout = async () => {
        try {
            await logout();
            setShowLogoutModal(false);
            router.push('/');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    const mainNavItems = [
        { id: 'dashboard', label: 'Dashboard', href: '/dashboard' },
        { id: 'pricing', label: 'Pricing', href: '/pricing' },
    ] as const;

    const featureItems = [
        { id: 'client-dna', label: 'Client DNA', href: '/client-dna', icon: Dna },
        { id: 'campaigns', label: 'Campaigns', href: '/campaigns', icon: Rocket },
        { id: 'strategy', label: 'Strategy Engine', href: '/strategy', icon: Target },
        { id: 'studio', label: 'Content Studio', href: '/studio', icon: Sparkles },
        { id: 'scheduler', label: 'Scheduler', href: '/scheduler', icon: Calendar },
        { id: 'approvals', label: 'Gatekeeper Approvals', href: '/approvals', icon: Calendar },
        { id: 'analytics', label: 'Analytics Engine', href: '/analytics', icon: BarChart3 },
        { id: 'billing', label: 'Billing Manager', href: '/billing', icon: BarChart3 },
        { id: 'knowledge', label: 'Knowledge Graph', href: '/knowledge', icon: BarChart3 },
        { id: 'audit', label: 'Audit Logs', href: '/audit', icon: BarChart3 },
    ] as const;

    const isActive = (href: string) => {
        if (href === '/' && pathname === '/') return true;
        if (href !== '/' && pathname?.startsWith(href)) return true;
        return false;
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 relative pb-10">
            {/* Floating Voice Cortex Widget (Node 10) */}
            <div className="fixed bottom-6 right-6 z-50">
                <button className="w-14 h-14 bg-slate-900 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-accent hover:scale-110 transition-all border-4 border-white/50 group">
                    <Sparkles size={24} className="group-hover:animate-pulse" />
                </button>
            </div>

            {/* Header */}
            <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-40 shadow-sm">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <Link href="/" className="flex items-center gap-2 cursor-pointer flex-shrink-0">
                            <div className="bg-accent p-1.5 rounded-lg text-white">
                                <Sparkles size={24} />
                            </div>
                            <span className="text-xl md:text-2xl font-bold font-heading text-slate-900 dark:text-white tracking-tight">Creative<span className="text-accent">OS</span></span>
                        </Link>

                        <nav className="hidden xl:flex space-x-6 overflow-visible flex-1 justify-center px-4 relative z-50">
                            <Link
                                href="/"
                                className={`text-[13px] font-bold tracking-wide transition-colors whitespace-nowrap px-2 py-1 rounded-md hover:bg-slate-50 dark:bg-slate-950 hover:text-accent ${isActive('/') ? 'text-accent bg-blue-50/50' : 'text-slate-500 dark:text-slate-400'}`}
                            >
                                Home
                            </Link>

                            {mounted && isAuthenticated && (
                                <>
                                    {mainNavItems.map((item) => (
                                        <Link
                                            key={item.id}
                                            href={item.href}
                                            className={`text-[13px] font-bold tracking-wide transition-colors whitespace-nowrap px-2 py-1 rounded-md hover:bg-slate-50 dark:bg-slate-950 hover:text-accent ${isActive(item.href) ? 'text-accent bg-blue-50/50' : 'text-slate-500 dark:text-slate-400'}`}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}

                                    <div 
                                        className="relative group lg:hidden"
                                        onMouseEnter={() => setFeaturesOpen(true)}
                                        onMouseLeave={() => setFeaturesOpen(false)}
                                    >
                                        <button className={`text-[13px] font-bold tracking-wide transition-colors whitespace-nowrap px-2 py-1 rounded-md hover:bg-slate-50 dark:bg-slate-950 hover:text-accent flex items-center gap-1 ${featuresOpen ? 'text-accent bg-blue-50/50' : 'text-slate-500 dark:text-slate-400'}`}>
                                            Features <ChevronDown size={14} className={`transition-transform duration-200 ${featuresOpen ? 'rotate-180' : ''}`} />
                                        </button>

                                        {featuresOpen && (
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-64 z-50">
                                                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl shadow-blue-900/10 border border-slate-100 dark:border-slate-800 overflow-hidden py-2 animate-in fade-in slide-in-from-top-2">
                                                    {featureItems.map(item => (
                                                        <Link 
                                                            key={item.id} 
                                                            href={item.href} 
                                                            onClick={() => setFeaturesOpen(false)} 
                                                            className="px-4 py-3 hover:bg-slate-50 dark:bg-slate-950 flex items-center gap-3 transition-colors"
                                                        >
                                                            <item.icon size={16} className="text-accent" />
                                                            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{item.label}</span>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                        </nav>

                        <div className="flex items-center gap-4 flex-shrink-0">
                            {!mounted ? (
                                <div className="w-24 h-9 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-xl"></div>
                            ) : isAuthenticated ? (
                                <>
                                    <Link href="/profile" className="hidden md:flex items-center gap-2 hover:opacity-80 transition-opacity" title="My Profile">
                                        <div className="w-9 h-9 bg-gradient-to-br from-accent to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow">
                                            {user?.name?.charAt(0) ?? 'U'}
                                        </div>
                                        <div className="flex flex-col items-start">
                                            <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">{user?.name}</p>
                                            <p className="text-xs text-slate-400 leading-none mt-0.5">View Profile</p>
                                        </div>
                                    </Link>
                                    <Link href="/settings" className="p-2 rounded-xl hover:bg-slate-100 dark:bg-slate-800 transition-colors" title="Settings">
                                        <Settings size={20} className="text-slate-500 dark:text-slate-400" />
                                    </Link>
                                    <button
                                        onClick={() => setShowLogoutModal(true)}
                                        className="text-xs md:text-sm font-bold text-slate-900 dark:text-white px-4 md:px-5 py-2 md:py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-xl transition-colors"
                                    >
                                        Log Out
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/auth/login"
                                        className="text-xs md:text-sm font-bold text-slate-900 dark:text-white px-4 md:px-5 py-2 md:py-2.5 hover:bg-slate-50 dark:bg-slate-950 rounded-xl transition-colors"
                                    >
                                        Log In
                                    </Link>
                                    <Link
                                        href="/auth/register"
                                        className="text-xs md:text-sm font-bold text-white bg-accent px-4 md:px-6 py-2 md:py-2.5 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content Layout with Sidebar */}
            <div className="flex-1 w-full max-w-[1400px] mx-auto flex">
                {/* Persistent Left Sidebar for Authenticated Users */}
                {mounted && isAuthenticated && (
                    <aside className="hidden lg:flex flex-col w-64 flex-shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto py-8 px-4 gap-1.5 shadow-sm rounded-bl-3xl">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-3">Creative Nodes</div>
                        {featureItems.map(item => (
                            <Link 
                                key={item.id} 
                                href={item.href} 
                                className={`group flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${isActive(item.href) ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-indigo-600'}`}
                            >
                                <item.icon size={18} className={isActive(item.href) ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 group-hover:text-indigo-600'} />
                                {item.label}
                            </Link>
                        ))}
                        
                        <div className="mt-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-3">System Hub</div>
                        <Link href="/analytics" className={`group flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${isActive('/analytics') ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 hover:text-indigo-600'}`}>
                            <BarChart3 size={18} className={isActive('/analytics') ? 'text-indigo-600' : 'text-slate-400 group-hover:text-indigo-600'} /> Analytics Engine
                        </Link>
                        <Link href="/billing" className={`group flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${isActive('/billing') ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 hover:text-indigo-600'}`}>
                            <Settings size={18} className={isActive('/billing') ? 'text-indigo-600' : 'text-slate-400 group-hover:text-indigo-600'} /> Billing Manager
                        </Link>
                    </aside>
                )}

                <main className="flex-1 w-full flex flex-col min-w-0">
                    {children}
                </main>
            </div>

            {/* Footer */}
            <footer className="bg-white dark:bg-slate-900 pt-20 pb-10 border-t border-slate-100 dark:border-slate-800 mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-400">
                        <div className="flex items-center gap-2 text-emerald-500">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                            All Core Services Online
                        </div>
                        <p>© 2025 CreativeOS AI Platform. All Rights Reserved.</p>
                    </div>
                </div>
            </footer>

            {/* Logout Modal */}
            {showLogoutModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-2xl max-w-sm w-full mx-4 animate-in zoom-in-95 duration-200">
                        <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white mb-2">Log Out</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Do you really want to log out of your session?</p>
                        <div className="flex gap-3 justify-end">
                            <button 
                                onClick={() => setShowLogoutModal(false)}
                                className="px-4 py-2 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:bg-slate-800 transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleConfirmLogout}
                                className="px-4 py-2 rounded-xl text-sm font-bold text-white bg-rose-500 hover:bg-rose-600 shadow-lg shadow-rose-200 transition-colors"
                            >
                                Yes, Log Out
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
