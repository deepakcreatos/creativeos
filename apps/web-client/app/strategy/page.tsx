"use client";

import React, { useState } from 'react';
import { Target, Zap, TrendingUp, Loader2, ChevronRight, BarChart3, Users, Globe, DollarSign } from 'lucide-react';
import { strategyApi } from '@/lib/api/client';

const OBJECTIVES = ['Brand Awareness', 'Lead Generation', 'Sales Conversion', 'Community Building', 'Product Launch'];
const CHANNELS = ['LinkedIn', 'Meta / Instagram', 'Google Ads', 'TikTok', 'Email', 'YouTube'];

export default function StrategyPage() {
    const [loading, setLoading] = useState(false);
    const [strategy, setStrategy] = useState<any>(null);
    const [form, setForm] = useState({
        objective: 'Brand Awareness',
        channels: ['LinkedIn', 'Meta / Instagram'] as string[],
        budget: '5000',
        timeline: '30',
    });

    const toggleChannel = (c: string) =>
        setForm(prev => ({
            ...prev,
            channels: prev.channels.includes(c) ? prev.channels.filter(x => x !== c) : [...prev.channels, c],
        }));

    const handleGenerate = async () => {
        setLoading(true);
        try {
            const res = await strategyApi.generate({ ...form });
            setStrategy(res.data || res);
        } catch {
            // Fallback mock
            setStrategy({
                pillars: ['Brand Authority', 'Market Education', 'Product Showcase', 'Customer Stories', 'Industry Trends'],
                channels: form.channels,
                budget: { total: parseInt(form.budget), breakdown: { LinkedIn: 2000, Meta: 2000, Google: 1000 } },
                timeline: `${form.timeline} days`,
                kpis: ['Reach: 50,000', 'Engagement Rate: 4%', 'Leads: 200', 'Conversions: 20'],
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full animate-in fade-in duration-500 space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-heading text-slate-900 dark:text-white flex items-center gap-3">
                    <Target className="text-accent" size={32} /> Strategy Engine
                </h1>
                <p className="text-slate-500 dark:text-slate-400 mt-2">AI-powered marketing strategy generation based on your Client DNA and campaign objectives.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Config Panel */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Campaign Objective</label>
                        <div className="space-y-2">
                            {OBJECTIVES.map(obj => (
                                <button key={obj} onClick={() => setForm(p => ({ ...p, objective: obj }))}
                                    className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-all flex items-center gap-3 ${form.objective === obj ? 'border-accent bg-blue-50 text-accent' : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-blue-200'}`}>
                                    <ChevronRight size={16} className={form.objective === obj ? 'text-accent' : 'text-transparent'} />
                                    {obj}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Target Channels</label>
                        <div className="grid grid-cols-2 gap-2">
                            {CHANNELS.map(c => (
                                <button key={c} onClick={() => toggleChannel(c)}
                                    className={`py-2 px-3 rounded-lg border-2 text-xs font-bold transition-all ${form.channels.includes(c) ? 'border-accent bg-blue-50 text-accent' : 'border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400'}`}>
                                    {c}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                            <DollarSign size={14} className="inline" /> Budget (USD)
                        </label>
                        <input type="number" value={form.budget} onChange={e => setForm(p => ({ ...p, budget: e.target.value }))}
                            className="w-full px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-accent focus:outline-none text-sm" />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Timeline (days)</label>
                        <input type="number" value={form.timeline} onChange={e => setForm(p => ({ ...p, timeline: e.target.value }))}
                            className="w-full px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-accent focus:outline-none text-sm" />
                    </div>

                    <button onClick={handleGenerate} disabled={loading}
                        className="w-full bg-accent text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg disabled:opacity-60">
                        {loading ? <><Loader2 className="animate-spin" size={18} /> Generating...</> : <><Zap size={18} /> Generate Strategy</>}
                    </button>
                </div>

                {/* Results Panel */}
                <div className="lg:col-span-2 space-y-6">
                    {!strategy ? (
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm h-full min-h-[500px] flex items-center justify-center">
                            <div className="text-center text-slate-300">
                                <Target size={64} className="mx-auto mb-4 opacity-30" />
                                <p className="text-lg font-semibold text-slate-400">Configure your objective and generate a strategy</p>
                                <p className="text-sm text-slate-400 mt-1">AI will create a full marketing strategy tailored to your client DNA</p>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Content Pillars */}
                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-6">
                                <h2 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                    <Zap size={18} className="text-accent" /> Content Pillars
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    {strategy.pillars?.map((pillar: string, i: number) => (
                                        <div key={i} className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-4">
                                            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest block mb-1">Pillar {i + 1}</span>
                                            <p className="font-bold text-slate-800 dark:text-slate-200 text-sm">{pillar}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* KPIs */}
                            <div className="grid grid-cols-2 gap-4">
                                {strategy.kpis?.map((kpi: string, i: number) => {
                                    const icons = [TrendingUp, Users, BarChart3, Globe];
                                    const IconComp = icons[i % icons.length];
                                    return (
                                        <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-5 flex items-center gap-4">
                                            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center flex-shrink-0">
                                                <IconComp size={22} className="text-accent" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">KPI {i + 1}</p>
                                                <p className="font-bold text-slate-900 dark:text-white text-sm">{kpi}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Budget + Timeline */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-6">
                                    <h3 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2"><DollarSign size={16} className="text-green-500" /> Budget Split</h3>
                                    {strategy.budget?.breakdown && Object.entries(strategy.budget.breakdown).map(([ch, amt]) => (
                                        <div key={ch} className="flex justify-between text-sm py-1 border-b border-slate-50 last:border-0">
                                            <span className="text-slate-600 dark:text-slate-400 font-medium">{ch}</span>
                                            <span className="font-bold text-slate-900 dark:text-white">${amt as number}</span>
                                        </div>
                                    ))}
                                    <div className="flex justify-between text-sm pt-2 font-bold">
                                        <span className="text-slate-900 dark:text-white">Total</span>
                                        <span className="text-accent">${strategy.budget?.total}</span>
                                    </div>
                                </div>
                                <div className="bg-accent rounded-2xl shadow-lg p-6 text-white">
                                    <h3 className="font-bold mb-4 opacity-80">Strategy Summary</h3>
                                    <div className="space-y-2">
                                        <div><p className="text-xs opacity-60">Objective</p><p className="font-bold">{form.objective}</p></div>
                                        <div><p className="text-xs opacity-60">Timeline</p><p className="font-bold">{strategy.timeline}</p></div>
                                        <div><p className="text-xs opacity-60">Channels</p><p className="font-bold text-sm">{strategy.channels?.join(', ')}</p></div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
