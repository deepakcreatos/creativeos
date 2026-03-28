"use client";

import React, { useState } from 'react';
import { User, Bell, Shield, Palette, Globe, CreditCard, Save, CheckCircle2, Key, Loader2 } from 'lucide-react';

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
    const [profile, setProfile] = useState({ name: 'Deepak R', email: '619kok@gmail.com', company: 'CreativeOS', timezone: 'Asia/Kolkata', role: 'Admin' });

    const handleSave = async () => {
        setSaving(true);
        await new Promise(r => setTimeout(r, 1000));
        setSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full animate-in fade-in duration-500">
            <div className="mb-8">
                <h1 className="text-3xl font-bold font-heading text-slate-900">Settings</h1>
                <p className="text-slate-500 mt-1">Manage your account preferences and workspace configuration.</p>
            </div>

            <div className="flex gap-8">
                {/* Sidebar */}
                <div className="w-56 flex-shrink-0">
                    <nav className="space-y-1">
                        {tabs.map(tab => (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === tab.id ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}>
                                <tab.icon size={16} /> {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Content */}
                <div className="flex-1 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                    {activeTab === 'profile' && (
                        <div className="p-8 space-y-6">
                            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">Profile Settings</h2>
                            <div className="flex items-center gap-6">
                                <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                                    {profile.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900">{profile.name}</p>
                                    <p className="text-sm text-slate-500">{profile.email}</p>
                                    <button className="text-xs text-indigo-600 font-bold mt-1 hover:underline">Change Avatar</button>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { label: 'Full Name', key: 'name', type: 'text' },
                                    { label: 'Email Address', key: 'email', type: 'email' },
                                    { label: 'Company / Agency', key: 'company', type: 'text' },
                                    { label: 'Role', key: 'role', type: 'text' },
                                ].map(field => (
                                    <div key={field.key}>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">{field.label}</label>
                                        <input type={field.type} value={profile[field.key as keyof typeof profile]}
                                            onChange={e => setProfile(prev => ({ ...prev, [field.key]: e.target.value }))}
                                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm" />
                                    </div>
                                ))}
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Timezone</label>
                                    <select value={profile.timezone} onChange={e => setProfile(p => ({ ...p, timezone: e.target.value }))}
                                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none text-sm">
                                        <option value="Asia/Kolkata">Asia/Kolkata (IST +5:30)</option>
                                        <option value="Asia/Dubai">Asia/Dubai (GST +4:00)</option>
                                        <option value="America/New_York">America/New_York (EST -5:00)</option>
                                        <option value="Europe/London">Europe/London (GMT +0:00)</option>
                                        <option value="America/Los_Angeles">America/Los_Angeles (PST -8:00)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="p-8 space-y-6">
                            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">Notification Preferences</h2>
                            {[
                                { label: 'Campaign generated', desc: 'When AI generates a new campaign strategy', on: true },
                                { label: 'Content ready for review', desc: 'When content assets are ready for approval', on: true },
                                { label: 'Scheduled post published', desc: 'When a scheduled post goes live', on: false },
                                { label: 'Billing alerts', desc: 'Invoice generated or payment due', on: true },
                                { label: 'Weekly performance report', desc: 'Analytics summary every Monday', on: false },
                            ].map(item => (
                                <div key={item.label} className="flex items-center justify-between py-3 border-b border-slate-50">
                                    <div>
                                        <p className="font-medium text-slate-800 text-sm">{item.label}</p>
                                        <p className="text-xs text-slate-500">{item.desc}</p>
                                    </div>
                                    <div className={`w-12 h-6 rounded-full transition-all cursor-pointer ${item.on ? 'bg-indigo-600' : 'bg-slate-200'} flex items-center ${item.on ? 'justify-end' : 'justify-start'} px-1`}>
                                        <div className="w-4 h-4 bg-white rounded-full shadow" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="p-8 space-y-6">
                            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">Security Settings</h2>
                            <div className="space-y-4">
                                <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex gap-3">
                                    <CheckCircle2 className="text-green-600 flex-shrink-0" size={20} />
                                    <div><p className="font-bold text-green-800 text-sm">Account Secured</p><p className="text-xs text-green-700">Authenticated via Supabase. Your session is protected.</p></div>
                                </div>
                                {[
                                    { label: 'Change Password', desc: 'Update your login password' },
                                    { label: 'Two-Factor Authentication', desc: 'Add an extra layer of security (coming soon)' },
                                    { label: 'Active Sessions', desc: 'View and revoke active sessions' },
                                ].map(item => (
                                    <div key={item.label} className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                                        <div><p className="font-medium text-slate-800 text-sm">{item.label}</p><p className="text-xs text-slate-500">{item.desc}</p></div>
                                        <button className="text-xs font-bold text-indigo-600 hover:underline">Manage</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'appearance' && (
                        <div className="p-8 space-y-6">
                            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">Appearance</h2>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-3">Theme Mode</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {['Light', 'Dark', 'System'].map(t => (
                                        <button key={t} className={`p-4 border-2 rounded-xl font-bold text-sm transition-all ${t === 'Light' ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-slate-200 text-slate-600'}`}>{t}</button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-3">Accent Color</label>
                                <div className="flex gap-3">
                                    {['#0061FF', '#7C3AED', '#059669', '#DC2626', '#D97706'].map(c => (
                                        <button key={c} style={{ backgroundColor: c }} className={`w-10 h-10 rounded-full border-4 ${c === '#0061FF' ? 'border-slate-900' : 'border-transparent'} transition-all hover:scale-110`} />
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-3">Sidebar Density</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {['Compact', 'Comfortable'].map(d => (
                                        <button key={d} className={`p-3 border-2 rounded-xl font-medium text-sm ${d === 'Comfortable' ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-slate-200 text-slate-600'}`}>{d}</button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'api' && (
                        <div className="p-8 space-y-6">
                            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">API & Integrations</h2>
                            <div className="bg-slate-900 rounded-xl p-4">
                                <p className="text-xs text-slate-400 mb-1 font-mono uppercase tracking-widest">Gateway Endpoint</p>
                                <p className="font-mono text-green-400 text-sm">https://creativeos-production-bc43.up.railway.app/api</p>
                            </div>
                            <div className="space-y-3">
                                {[
                                    { name: 'Supabase', status: 'Connected', color: 'text-green-600 bg-green-50' },
                                    { name: 'OpenAI', status: 'Not configured', color: 'text-amber-600 bg-amber-50' },
                                    { name: 'Stripe', status: 'Not configured', color: 'text-amber-600 bg-amber-50' },
                                    { name: 'Zapier', status: 'Not configured', color: 'text-slate-500 bg-slate-50' },
                                ].map(int => (
                                    <div key={int.name} className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <Globe size={18} className="text-slate-400" />
                                            <span className="font-medium text-slate-800 text-sm">{int.name}</span>
                                        </div>
                                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${int.color}`}>{int.status}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'billing' && (
                        <div className="p-8 space-y-6">
                            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">Plan & Billing</h2>
                            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white">
                                <p className="text-indigo-200 text-sm font-bold uppercase tracking-widest mb-1">Current Plan</p>
                                <p className="text-3xl font-bold">Agency Pro</p>
                                <p className="text-indigo-200 text-sm mt-2">$299/month · Renews on April 28, 2026</p>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                {[
                                    { label: 'AI Credits', value: '660 / 1000' },
                                    { label: 'DNA Profiles', value: '3 / 10' },
                                    { label: 'Campaigns', value: '8 / 50' },
                                ].map(u => (
                                    <div key={u.label} className="bg-slate-50 rounded-xl p-4">
                                        <p className="text-xs text-slate-500 font-medium">{u.label}</p>
                                        <p className="text-lg font-bold text-slate-900 mt-1">{u.value}</p>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                                <CreditCard size={18} /> Manage Subscription
                            </button>
                        </div>
                    )}

                    {/* Footer Save */}
                    <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                        {saved && (
                            <span className="flex items-center gap-2 text-green-600 text-sm font-bold">
                                <CheckCircle2 size={16} /> Changes saved!
                            </span>
                        )}
                        <button onClick={handleSave} disabled={saving}
                            className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-indigo-700 transition-colors disabled:opacity-60 text-sm">
                            {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
