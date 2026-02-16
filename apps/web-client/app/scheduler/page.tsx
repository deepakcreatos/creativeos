
"use client";

import React from 'react';
import Link from 'next/link';
import { Search, ChevronLeft, ChevronRight, Plus, Info, BarChart3 } from 'lucide-react';

export default function Scheduler() {
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const platforms = ['Meta', 'Instagram', 'Google', 'LinkedIn'];

    return (
        <div className="flex flex-col lg:flex-row gap-8 animate-in fade-in duration-500">
            <div className="w-full lg:w-72 space-y-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
                    <div>
                        <h3 className="font-bold text-slate-900 mb-4">Platform Filter</h3>
                        <div className="space-y-2">
                            {platforms.map(platform => (
                                <label key={platform} className="flex items-center gap-3 text-sm text-slate-600 cursor-pointer">
                                    <input type="checkbox" className="rounded text-indigo-600" defaultChecked />
                                    {platform}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-slate-900 mb-4">Time Period</h3>
                        <div className="flex gap-2">
                            <button className="flex-1 bg-indigo-600 text-white text-xs py-2 rounded-lg font-bold">This Week</button>
                            <button className="flex-1 bg-slate-50 text-slate-600 text-xs py-2 rounded-lg font-bold border border-slate-100">This Month</button>
                        </div>
                        <button className="w-full mt-2 bg-slate-50 text-slate-600 text-xs py-2 rounded-lg font-bold border border-slate-100">All</button>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                    <h3 className="font-bold text-slate-900">Schedule New Content</h3>
                    <p className="text-xs text-slate-500">Add a new post to your content calendar</p>
                    <button className="w-full bg-indigo-600 text-white py-2 rounded-lg font-bold flex items-center justify-center gap-2 text-sm shadow-md hover:bg-indigo-700 transition-colors">
                        <Plus size={16} /> Schedule Content
                    </button>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="font-bold text-slate-900">Auto-Posting</h3>
                        <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded uppercase font-bold">Pro Feature</span>
                    </div>
                    <p className="text-xs text-slate-500">Enable automatic posting at optimal times based on AI analysis</p>
                    <div className="bg-slate-50 p-3 rounded-lg flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700">Enable Auto-Posting</span>
                        <div className="w-10 h-6 bg-slate-200 rounded-full relative">
                            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                        </div>
                    </div>
                    <p className="text-[10px] text-slate-400 text-center">Upgrade to unlock full automation</p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-4">
                    <div className="flex items-center gap-2">
                        <BarChart3 size={18} className="text-slate-400" />
                        <h3 className="font-bold text-slate-700 text-sm">Optimize Your Timing</h3>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-relaxed">AI send-time optimization and performance analytics are available on the Analytics page</p>
                    <Link href="/analytics" className="text-indigo-600 text-[10px] font-bold hover:underline">View Analytics →</Link>
                </div>
            </div>

            <div className="flex-1 space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold font-heading text-slate-900">Content Scheduler</h1>
                        <p className="text-sm text-slate-500">Plan and schedule your content across all platforms</p>
                    </div>
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input type="text" placeholder="Search" className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm" />
                    </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                    <div className="p-6 flex justify-between items-center border-b border-slate-100">
                        <h2 className="font-bold text-slate-900 text-lg">January 2025</h2>
                        <div className="flex gap-4">
                            <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400"><ChevronLeft size={20} /></button>
                            <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400"><ChevronRight size={20} /></button>
                        </div>
                    </div>

                    <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50/50">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <div key={day} className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center border-r border-slate-100 last:border-r-0">
                                {day}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 bg-white">
                        {/* Padding for month start - simulation */}
                        <div className="min-h-[100px] p-4 text-sm text-slate-300 border-r border-b border-slate-100 bg-slate-50/20">29</div>
                        <div className="min-h-[100px] p-4 text-sm text-slate-300 border-r border-b border-slate-100 bg-slate-50/20">30</div>
                        <div className="min-h-[100px] p-4 text-sm text-slate-300 border-r border-b border-slate-100 bg-slate-50/20">31</div>
                        {days.map(day => (
                            <div key={day} className={`min-h-[100px] p-4 text-sm border-r border-b border-slate-100 last:border-r-0 relative group transition-colors hover:bg-slate-50 ${day === 8 ? 'bg-indigo-50/30' : ''}`}>
                                <span className={`font-medium ${day === 8 ? 'text-indigo-600 font-bold' : 'text-slate-600'}`}>{day}</span>
                                {day === 8 && (
                                    <div className="mt-2 h-1.5 w-full bg-indigo-600 rounded-full animate-pulse"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold font-heading text-slate-900">Scheduled Items</h2>
                        <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded-full font-bold">12 Items</span>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 flex items-center gap-4 text-slate-400 italic text-sm">
                        <Info size={20} className="flex-shrink-0" />
                        <p>Next Up items on the Dashboard are pulled from this schedule, keeping your workspace centralized</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
