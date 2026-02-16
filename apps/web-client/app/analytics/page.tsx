
"use client";

import React from 'react';
import Link from 'next/link';
import {
    BarChart,
    Bar,
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    PieChart,
    Pie
} from 'recharts';
import {
    Eye,
    Users,
    MousePointer2,
    TrendingUp,
    TrendingDown,
    Sparkles,
    Zap,
    Layout,
    Dna,
    Share2,
    Calendar,
    CheckCircle2
} from 'lucide-react';

const reachData = [
    { month: 'Jan', value: 400 },
    { month: 'Feb', value: 300 },
    { month: 'Mar', value: 600 },
    { month: 'Apr', value: 800 },
    { month: 'May', value: 500 },
    { month: 'Jun', value: 900 },
];

const platformData = [
    { name: 'Meta', value: 42, color: '#6366f1' },
    { name: 'Instagram', value: 31, color: '#ec4899' },
    { name: 'LinkedIn', value: 18, color: '#3b82f6' },
    { name: 'Google', value: 9, color: '#f59e0b' },
];

export default function Analytics() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-12">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold font-heading text-slate-900">Analytics Dashboard</h1>
                    <p className="text-slate-500">Track performance metrics and AI-powered insights for your campaigns</p>
                </div>
                <div className="flex gap-2">
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm">Trial Active</button>
                    <button className="bg-slate-200 text-slate-600 px-4 py-2 rounded-lg text-sm font-bold">Trial Expired</button>
                    <button className="bg-slate-200 text-slate-600 px-4 py-2 rounded-lg text-sm font-bold">Upgraded</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                    { label: 'Impressions', val: '2.4M', change: '+12.5%', icon: Eye, trend: 'up', color: 'bg-indigo-50 text-indigo-600' },
                    { label: 'Reach', val: '1.8M', change: '+8.3%', icon: Users, trend: 'up', color: 'bg-purple-50 text-purple-600' },
                    { label: 'Click-Through Rate', val: '3.2%', change: '+0.4%', icon: MousePointer2, trend: 'up', color: 'bg-green-50 text-green-600' },
                    { label: 'Conversion Rate', val: '2.1%', change: '-0.2%', icon: TrendingUp, trend: 'down', color: 'bg-amber-50 text-amber-600' },
                    { label: 'Follower Growth', val: '+4,287', change: '+15.2%', icon: Users, trend: 'up', color: 'bg-slate-50 text-slate-600' },
                ].map(item => (
                    <div key={item.label} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
                        <div className={`${item.color} w-8 h-8 rounded-lg flex items-center justify-center`}>
                            <item.icon size={18} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-900">{item.val}</p>
                            <p className="text-xs text-slate-400 font-medium">{item.label}</p>
                        </div>
                        <div className={`flex items-center gap-1 text-[10px] font-bold ${item.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                            {item.trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                            {item.change}
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="font-bold text-slate-900">Reach Over Time</h3>
                            <div className="flex gap-4">
                                {['Meta', 'Instagram', 'LinkedIn'].map(p => (
                                    <div key={p} className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${p === 'Meta' ? 'bg-indigo-600' : p === 'Instagram' ? 'bg-purple-400' : 'bg-green-400'}`}></div>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{p}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={reachData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                                    <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                    <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={20} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-slate-900 mb-8 text-center">Platform Performance</h3>
                        <div className="flex flex-col md:flex-row items-center gap-12">
                            <div className="w-48 h-48 relative">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={platformData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                            {platformData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <p className="text-xl font-bold text-slate-900">100%</p>
                                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Total</p>
                                </div>
                            </div>
                            <div className="flex-1 space-y-4 w-full">
                                {platformData.map(item => (
                                    <div key={item.name} className="flex items-center justify-between group">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                                            <span className="text-sm font-medium text-slate-600">{item.name}</span>
                                        </div>
                                        <span className="text-sm font-bold text-slate-900">{item.value}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="bg-indigo-100 text-indigo-600 p-2 rounded-lg">
                                <Sparkles size={20} />
                            </div>
                            <h3 className="font-bold text-slate-900">AI Insights</h3>
                        </div>

                        <div className="space-y-4">
                            {[
                                { type: 'Strong Performance', desc: 'Meta campaigns are outperforming benchmarks by 3.2x. Consider increasing budget allocation.', color: 'border-green-100 bg-green-50', icon: TrendingUp, iconColor: 'text-green-600' },
                                { type: 'Creative Fatigue Detected', desc: 'Instagram story engagement has declined 15% over the past week. Refresh creative assets.', color: 'border-amber-100 bg-amber-50', icon: Zap, iconColor: 'text-amber-600' },
                                { type: 'Optimization Opportunity', desc: 'LinkedIn posts scheduled between 8-10 AM see 24% higher engagement. Consider shifting your schedule.', color: 'border-indigo-100 bg-indigo-50', icon: Sparkles, iconColor: 'text-indigo-600' },
                            ].map((insight, idx) => (
                                <div key={idx} className={`p-4 rounded-xl border ${insight.color} space-y-2`}>
                                    <div className="flex items-center gap-2">
                                        <insight.icon size={14} className={insight.iconColor} />
                                        <span className={`text-[10px] font-bold uppercase tracking-wider ${insight.iconColor}`}>{insight.type}</span>
                                    </div>
                                    <p className="text-xs text-slate-600 leading-relaxed">{insight.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-slate-50 text-slate-400 p-2 rounded-lg">
                                <Layout size={20} />
                            </div>
                            <h3 className="font-bold text-slate-900">Dashboard Summary</h3>
                        </div>
                        <p className="text-xs text-slate-500 italic">Top metrics from this page appear as glanceable figures on your main dashboard overview.</p>
                        <Link href="/dashboard" className="text-indigo-600 text-xs font-bold hover:underline">View Dashboard</Link>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold font-heading text-slate-900">Campaign Performance</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        { name: 'Q1 Product Launch', type: 'Launch Campaign', status: 'Active', ctr: '3.2x', reach: '842K', conv: '2.4%' },
                        { name: 'Evergreen Content Series', type: 'Always-On Content', status: 'Ongoing', ctr: '1.8x', reach: '1.2M', conv: '1.9%' },
                    ].map((camp, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h4 className="font-bold text-slate-900">{camp.name}</h4>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{camp.type}</p>
                                </div>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${camp.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                                    {camp.status}
                                </span>
                            </div>
                            <div className="grid grid-cols-3 gap-4 border-t border-slate-50 pt-4">
                                <div>
                                    <p className="text-sm font-bold text-slate-800">{camp.ctr}</p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase">Benchmark CTR</p>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-800">{camp.reach}</p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase">Reach</p>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-800">{camp.conv}</p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase">Conversion</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold font-heading text-slate-900">Post Time vs. Engagement</h2>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Optimal posting windows based on historical performance</p>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-400 text-xs font-bold uppercase tracking-widest">
                            <tr>
                                <th className="px-6 py-3">Time Slot</th>
                                <th className="px-6 py-3">Platform</th>
                                <th className="px-6 py-3">Avg. Engagement</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-600">
                            {[
                                { time: '8:00 - 10:00 AM', platform: 'LinkedIn', eng: '+24% above avg', color: 'bg-green-100 text-green-700' },
                                { time: '12:00 - 2:00 PM', platform: 'Instagram', eng: '+18% above avg', color: 'bg-green-100 text-green-700' },
                                { time: '6:00 - 8:00 PM', platform: 'Meta', eng: '+31% above avg', color: 'bg-green-100 text-green-700' },
                                { time: '9:00 - 11:00 AM', platform: 'Google', eng: '+8% above avg', color: 'bg-slate-100 text-slate-500' },
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-medium">{row.time}</td>
                                    <td className="px-6 py-4">{row.platform}</td>
                                    <td className="px-6 py-4">
                                        <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${row.color}`}>{row.eng}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 space-y-6">
                <div className="flex items-center gap-3">
                    <div className="bg-indigo-100 text-indigo-600 p-2 rounded-lg">
                        <Dna size={20} />
                    </div>
                    <h3 className="font-bold text-slate-900">Context Used</h3>
                </div>
                <p className="text-xs text-slate-500">Analytics benchmarks and key segments are informed by your client's industry and goals defined in Client DNA.</p>
                <div className="flex gap-2">
                    {['SaaS Industry', 'Lead Generation', 'Brand Awareness'].map(tag => (
                        <span key={tag} className="bg-white border border-slate-200 px-3 py-1 rounded-full text-[10px] font-bold text-slate-500">{tag}</span>
                    ))}
                </div>
                <Link href="/client-dna" className="text-indigo-600 text-xs font-bold hover:underline block">Edit Client DNA</Link>
            </div>

            <div className="sticky bottom-6 flex gap-3 z-10">
                <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">
                    <Share2 size={18} /> Export Report
                </button>
                <button className="bg-white border border-slate-200 text-slate-600 px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-sm hover:bg-slate-50 transition-all">
                    <Calendar size={18} /> Schedule AI Optimization
                </button>
                <button className="bg-white border border-slate-200 text-slate-600 px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-sm hover:bg-slate-50 transition-all">
                    <Share2 size={18} /> Share with Client
                </button>
            </div>

            <div className="bg-indigo-600 rounded-2xl p-8 text-white flex flex-col md:flex-row justify-between items-center gap-8 shadow-xl shadow-indigo-200 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                <div className="space-y-4 relative z-10">
                    <h2 className="text-2xl font-bold font-heading">Unlock Full Analytics Power</h2>
                    <p className="text-indigo-100 max-w-xl">Upgrade to access AI anomaly detection, benchmark libraries, and client-facing live dashboards.</p>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                        {['AI Anomaly Detection', 'Benchmark Libraries', 'Live Client Dashboards', 'Automated Reports'].map(f => (
                            <div key={f} className="flex items-center gap-2 text-xs font-medium">
                                <CheckCircle2 size={14} className="text-indigo-300" />
                                {f}
                            </div>
                        ))}
                    </div>
                </div>
                <button className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-bold whitespace-nowrap hover:bg-indigo-50 transition-colors shadow-lg shadow-indigo-900/20 relative z-10">
                    View Plans
                </button>
            </div>
        </div>
    );
}
