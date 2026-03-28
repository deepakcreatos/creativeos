"use client";

import React, { useState } from 'react';
import {
    User, Mail, Phone, Building2, Globe, Camera, Edit3, Save,
    Shield, Bell, Star, Zap, Award, TrendingUp, Calendar,
    Loader2, CheckCircle2, Dna, Rocket, BarChart3, Clock
} from 'lucide-react';

export default function ProfilePage() {
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [editing, setEditing] = useState(false);
    const [profile, setProfile] = useState({
        name: 'Deepak R',
        email: '619kok@gmail.com',
        phone: '+91 98765 43210',
        company: 'CreativeOS AI',
        website: 'creativeos.ai',
        role: 'Admin',
        bio: 'Building the future of AI-powered marketing operations.',
        location: 'Dubai, UAE',
        joinedDate: 'January 2025',
    });

    const stats = [
        { label: 'DNA Profiles Created', value: 3, icon: Dna, color: 'text-blue-600 bg-blue-50' },
        { label: 'Campaigns Launched', value: 8, icon: Rocket, color: 'text-indigo-600 bg-indigo-50' },
        { label: 'Content Generated', value: 47, icon: Zap, color: 'text-purple-600 bg-purple-50' },
        { label: 'Analytics Reports', value: 12, icon: BarChart3, color: 'text-green-600 bg-green-50' },
    ];

    const recentActivity = [
        { action: 'Saved Client DNA Profile', time: '2 hours ago', icon: Dna, color: 'text-blue-600 bg-blue-50' },
        { action: 'Generated Q1 Campaign Strategy', time: '5 hours ago', icon: Rocket, color: 'text-indigo-600 bg-indigo-50' },
        { action: 'Created LinkedIn Content Pack', time: '1 day ago', icon: Zap, color: 'text-purple-600 bg-purple-50' },
        { action: 'Scheduled 8 Posts', time: '2 days ago', icon: Calendar, color: 'text-orange-600 bg-orange-50' },
        { action: 'Ran Analytics Report', time: '3 days ago', icon: BarChart3, color: 'text-green-600 bg-green-50' },
    ];

    const handleSave = async () => {
        setSaving(true);
        await new Promise(r => setTimeout(r, 1000));
        setSaving(false);
        setSaved(true);
        setEditing(false);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full animate-in fade-in duration-500">
            {/* Header Banner */}
            <div className="relative h-40 rounded-3xl overflow-hidden mb-0 bg-gradient-to-r from-accent via-indigo-600 to-purple-700 shadow-xl">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-4 left-10 w-32 h-32 rounded-full bg-white/30 blur-2xl" />
                    <div className="absolute bottom-2 right-20 w-48 h-48 rounded-full bg-white/20 blur-3xl" />
                </div>
                <div className="absolute top-4 right-6 flex gap-2">
                    <span className="bg-white/20 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                        <Award size={12} /> Agency Pro Plan
                    </span>
                </div>
            </div>

            {/* Avatar + Name Row */}
            <div className="flex flex-col md:flex-row md:items-end gap-6 px-6 -mt-12 mb-8 relative z-10">
                <div className="relative">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-xl border-4 border-white">
                        {profile.name.charAt(0)}
                    </div>
                    <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border border-slate-200 hover:bg-slate-50 transition-colors">
                        <Camera size={14} className="text-slate-600" />
                    </button>
                </div>

                <div className="flex-1 md:pb-2">
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold text-slate-900">{profile.name}</h1>
                        <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-0.5 rounded-full">{profile.role}</span>
                        <span className="flex items-center gap-1 bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500" /> Online
                        </span>
                    </div>
                    <p className="text-slate-500 text-sm mt-0.5">{profile.company} · {profile.location}</p>
                </div>

                <div className="flex gap-3 md:pb-2">
                    {saved && <span className="flex items-center gap-1.5 text-green-600 text-sm font-bold"><CheckCircle2 size={16} /> Saved!</span>}
                    <button onClick={() => editing ? handleSave() : setEditing(true)} disabled={saving}
                        className="flex items-center gap-2 bg-accent text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg disabled:opacity-60">
                        {saving ? <Loader2 className="animate-spin" size={16} /> : editing ? <Save size={16} /> : <Edit3 size={16} />}
                        {saving ? 'Saving...' : editing ? 'Save Changes' : 'Edit Profile'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                    {/* Profile Card */}
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                        <div className="p-6 space-y-4">
                            <h2 className="font-bold text-slate-900 text-sm uppercase tracking-widest text-slate-400">Profile Info</h2>
                            {[
                                { icon: Mail, label: 'Email', key: 'email', type: 'email' },
                                { icon: Phone, label: 'Phone', key: 'phone', type: 'tel' },
                                { icon: Building2, label: 'Company', key: 'company', type: 'text' },
                                { icon: Globe, label: 'Website', key: 'website', type: 'text' },
                                { icon: User, label: 'Location', key: 'location', type: 'text' },
                            ].map(field => (
                                <div key={field.key} className="flex items-center gap-3">
                                    <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <field.icon size={16} className="text-slate-500" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{field.label}</p>
                                        {editing ? (
                                            <input type={field.type} value={profile[field.key as keyof typeof profile]}
                                                onChange={e => setProfile(p => ({ ...p, [field.key]: e.target.value }))}
                                                className="w-full text-sm text-slate-800 border-b border-indigo-400 focus:outline-none bg-transparent py-0.5" />
                                        ) : (
                                            <p className="text-sm text-slate-800 font-medium truncate">{profile[field.key as keyof typeof profile]}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bio Card */}
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
                        <h2 className="font-bold text-slate-900 text-sm uppercase tracking-widest text-slate-400 mb-3">Bio</h2>
                        {editing ? (
                            <textarea value={profile.bio} onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))}
                                className="w-full h-24 text-sm text-slate-700 border border-slate-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
                        ) : (
                            <p className="text-sm text-slate-600 leading-relaxed">{profile.bio}</p>
                        )}
                    </div>

                    {/* Plan Badge */}
                    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white shadow-lg">
                        <div className="flex items-center gap-2 mb-3">
                            <Star size={20} className="text-yellow-300" />
                            <span className="font-bold">Agency Pro</span>
                        </div>
                        <p className="text-indigo-200 text-sm mb-4">Full access to all 13 AI nodes. AI credits renew monthly.</p>
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-bold">
                                <span className="text-indigo-200">AI Credits Used</span>
                                <span>660 / 1000</span>
                            </div>
                            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                                <div className="h-2 bg-white rounded-full" style={{ width: '66%' }} />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-xs text-indigo-200">
                            <Clock size={12} /> Member since {profile.joinedDate}
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {stats.map(stat => (
                            <div key={stat.label} className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 text-center">
                                <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                                    <stat.icon size={20} />
                                </div>
                                <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                                <p className="text-xs text-slate-500 mt-1 font-medium">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Permissions & Roles */}
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
                        <div className="flex items-center gap-2 mb-5">
                            <Shield size={20} className="text-indigo-600" />
                            <h2 className="font-bold text-slate-900">Permissions & Access</h2>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { label: 'Client DNA Management', granted: true },
                                { label: 'Campaign Generation', granted: true },
                                { label: 'Content Studio', granted: true },
                                { label: 'Media Generation', granted: true },
                                { label: 'Analytics Access', granted: true },
                                { label: 'Billing Management', granted: true },
                                { label: 'Team Management', granted: false },
                                { label: 'White Label Export', granted: false },
                            ].map(perm => (
                                <div key={perm.label} className={`flex items-center gap-3 p-3 rounded-xl border ${perm.granted ? 'border-green-100 bg-green-50' : 'border-slate-100 bg-slate-50 opacity-60'}`}>
                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${perm.granted ? 'bg-green-500' : 'bg-slate-300'}`}>
                                        {perm.granted ? <CheckCircle2 size={12} className="text-white" /> : <span className="text-white text-xs">✕</span>}
                                    </div>
                                    <span className={`text-xs font-semibold ${perm.granted ? 'text-green-800' : 'text-slate-500'}`}>{perm.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
                        <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center gap-2">
                                <TrendingUp size={20} className="text-indigo-600" />
                                <h2 className="font-bold text-slate-900">Recent Activity</h2>
                            </div>
                            <span className="text-xs text-slate-400 font-medium">Last 7 days</span>
                        </div>
                        <div className="space-y-4">
                            {recentActivity.map((item, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className={`w-9 h-9 rounded-xl ${item.color} flex items-center justify-center flex-shrink-0`}>
                                        <item.icon size={16} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-slate-800">{item.action}</p>
                                        <p className="text-xs text-slate-400">{item.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Notification Preferences */}
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
                        <div className="flex items-center gap-2 mb-5">
                            <Bell size={20} className="text-indigo-600" />
                            <h2 className="font-bold text-slate-900">Notification Preferences</h2>
                        </div>
                        <div className="space-y-3">
                            {[
                                { label: 'Campaign Complete', desc: 'Notify when AI finishes generating a campaign', on: true },
                                { label: 'Content Ready', desc: 'Alert when new content is ready for review', on: true },
                                { label: 'Weekly Summary', desc: 'Performance digest every Monday', on: false },
                                { label: 'Billing Alerts', desc: 'Invoice and payment notifications', on: true },
                            ].map(item => (
                                <div key={item.label} className="flex items-center justify-between py-2.5 border-b border-slate-50 last:border-0">
                                    <div>
                                        <p className="text-sm font-semibold text-slate-800">{item.label}</p>
                                        <p className="text-xs text-slate-500">{item.desc}</p>
                                    </div>
                                    <div className={`w-11 h-6 rounded-full transition-colors cursor-pointer ${item.on ? 'bg-indigo-600' : 'bg-slate-200'} flex items-center px-1`}>
                                        <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${item.on ? 'translate-x-5' : 'translate-x-0'}`} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
