"use client";

import React, { useState, useEffect } from 'react';
import { User, Bell, Shield, Palette, Globe, CreditCard, Save, CheckCircle2, Key, Loader2 } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useAppTheme } from '@/app/providers';

const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'api', label: 'API & Integrations', icon: Key },
    { id: 'billing', label: 'Plan & Billing', icon: CreditCard },
];

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('profile');
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    
    // Theme & Contexts
    const { theme, setTheme } = useTheme();
    const { accentColor, setAccentColor, density, setDensity } = useAppTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    // Form states
    const [profile, setProfile] = useState({ name: 'Deepak R', email: '619kok@gmail.com', company: 'CreativeOS', timezone: 'Asia/Kolkata', role: 'Admin' });
    
    const [notifications, setNotifications] = useState([
        { id: 1, label: 'Campaign generated', desc: 'When AI generates a new campaign strategy', on: true },
        { id: 2, label: 'Content ready for review', desc: 'When content assets are ready for approval', on: true },
        { id: 3, label: 'Scheduled post published', desc: 'When a scheduled post goes live', on: false },
        { id: 4, label: 'Billing alerts', desc: 'Invoice generated or payment due', on: true },
        { id: 5, label: 'Weekly performance report', desc: 'Analytics summary every Monday', on: false },
    ]);

    const toggleNotification = (id: number) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, on: !n.on } : n));
    };

    const handleSave = async () => {
        setSaving(true);
        await new Promise(r => setTimeout(r, 800));
        setSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500 min-h-screen">
            <div className="mb-8">
                <h1 className="text-3xl font-bold font-heading text-slate-900 dark:text-white">Settings</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your account preferences and workspace configuration.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <div className="w-full md:w-56 flex-shrink-0">
                    <nav className="space-y-1">
                        {tabs.map(tab => (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === tab.id ? 'bg-accent text-white shadow-md' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                                style={activeTab === tab.id ? { backgroundColor: accentColor } : {}}>
                                <tab.icon size={16} /> {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Content */}
                <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden text-slate-900 dark:text-white">
                    {activeTab === 'profile' && (
                        <div className="p-8 space-y-6">
                            <h2 className="text-xl font-bold border-b border-slate-100 dark:border-slate-800 pb-4">Profile Settings</h2>
                            <div className="flex items-center gap-6">
                                <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg"
                                    style={{ backgroundColor: accentColor }}>
                                    {profile.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-bold">{profile.name}</p>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">{profile.email}</p>
                                    <button className="text-xs font-bold mt-1 hover:underline" style={{ color: accentColor }}>Change Avatar</button>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { label: 'Full Name', key: 'name', type: 'text' },
                                    { label: 'Email Address', key: 'email', type: 'email' },
                                    { label: 'Company / Agency', key: 'company', type: 'text' },
                                    { label: 'Role', key: 'role', type: 'text', readOnly: true },
                                ].map(field => (
                                    <div key={field.key}>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{field.label}</label>
                                        <input type={field.type} value={profile[field.key as keyof typeof profile]} readOnly={field.readOnly}
                                            onChange={e => !field.readOnly && setProfile(prev => ({ ...prev, [field.key]: e.target.value }))}
                                            className="w-full px-4 py-2 bg-transparent border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 text-sm disabled:opacity-50"
                                            style={{ '--tw-ring-color': accentColor } as React.CSSProperties} />
                                    </div>
                                ))}
                                <div className="col-span-1 sm:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Timezone</label>
                                    <select value={profile.timezone} onChange={e => setProfile(p => ({ ...p, timezone: e.target.value }))}
                                        className="w-full px-4 py-2 bg-transparent border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 text-sm"
                                        style={{ '--tw-ring-color': accentColor } as React.CSSProperties}>
                                        <option value="Asia/Kolkata">Asia/Kolkata (IST +5:30)</option>
                                        <option value="Asia/Dubai">Asia/Dubai (GST +4:00)</option>
                                        <option value="America/New_York">America/New_York (EST -5:00)</option>
                                        <option value="Europe/London">Europe/London (GMT +0:00)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="p-8 space-y-6">
                            <h2 className="text-xl font-bold border-b border-slate-100 dark:border-slate-800 pb-4">Notification Preferences</h2>
                            {notifications.map(item => (
                                <div key={item.id} className="flex items-center justify-between py-3 border-b border-slate-50 dark:border-slate-800">
                                    <div>
                                        <p className="font-medium text-sm">{item.label}</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
                                    </div>
                                    <div onClick={() => toggleNotification(item.id)}
                                         className={`w-12 h-6 rounded-full transition-all cursor-pointer flex items-center px-1 ${item.on ? 'justify-end' : 'justify-start bg-slate-200 dark:bg-slate-700'}`}
                                         style={item.on ? { backgroundColor: accentColor } : {}}>
                                        <div className="w-4 h-4 bg-white rounded-full shadow" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'appearance' && mounted && (
                        <div className="p-8 space-y-6">
                            <h2 className="text-xl font-bold border-b border-slate-100 dark:border-slate-800 pb-4">Appearance</h2>
                            <div>
                                <label className="block text-sm font-medium mb-3">Theme Mode</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {['light', 'dark', 'system'].map(t => (
                                        <button key={t} onClick={() => setTheme(t)}
                                            className={`p-4 border-2 rounded-xl font-bold text-sm capitalize transition-all ${theme === t ? 'bg-opacity-10' : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'}`}
                                            style={theme === t ? { borderColor: accentColor, color: accentColor, backgroundColor: `${accentColor}15` } : {}}>
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-3">Accent Color</label>
                                <div className="flex gap-3">
                                    {['#0061FF', '#7C3AED', '#059669', '#DC2626', '#D97706', '#E11D48', '#0D9488'].map(c => (
                                        <button key={c} onClick={() => setAccentColor(c)}
                                            style={{ backgroundColor: c, borderColor: accentColor === c ? (theme === 'dark' ? '#FFF' : '#0F172A') : 'transparent' }} 
                                            className="w-10 h-10 rounded-full border-4 transition-all hover:scale-110 shadow-sm" />
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-3">Sidebar & List Density</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {['Compact', 'Comfortable'].map(d => (
                                        <button key={d} onClick={() => setDensity(d as any)}
                                            className={`p-3 border-2 rounded-xl font-medium text-sm transition-all ${density === d ? 'bg-opacity-10' : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'}`}
                                            style={density === d ? { borderColor: accentColor, color: accentColor, backgroundColor: `${accentColor}15` } : {}}>
                                            {d}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="p-8 space-y-6">
                            <h2 className="text-xl font-bold border-b border-slate-100 dark:border-slate-800 pb-4">Security Settings</h2>
                            <div className="space-y-4">
                                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 flex gap-3">
                                    <CheckCircle2 className="text-green-600 dark:text-green-400 flex-shrink-0" size={20} />
                                    <div><p className="font-bold text-green-800 dark:text-green-300 text-sm">Account Secured</p><p className="text-xs text-green-700 dark:text-green-400">Authenticated via Supabase. Your session is protected.</p></div>
                                </div>
                                {[
                                    { label: 'Change Password', desc: 'Update your login password' },
                                    { label: 'Two-Factor Authentication', desc: 'Add an extra layer of security (coming soon)' },
                                    { label: 'Active Sessions', desc: 'View and revoke active sessions' },
                                ].map(item => (
                                    <div key={item.label} className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                        <div><p className="font-medium text-sm">{item.label}</p><p className="text-xs text-slate-500">{item.desc}</p></div>
                                        <button className="text-xs font-bold hover:underline" style={{ color: accentColor }}>Manage</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Footer Save */}
                    <div className="px-8 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
                        {saved && (
                            <span className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm font-bold">
                                <CheckCircle2 size={16} /> Changes saved!
                            </span>
                        )}
                        <button onClick={handleSave} disabled={saving}
                            className="text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors disabled:opacity-60 text-sm shadow-md"
                            style={{ backgroundColor: accentColor }}>
                            {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
