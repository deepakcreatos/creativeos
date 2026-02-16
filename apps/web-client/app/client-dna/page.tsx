
"use client";

import React from 'react';
import {
    Dna,
    Tag,
    Target,
    Users,
    Music,
    Globe,
    StickyNote,
    Save,
    ChevronRight,
    Monitor,
    Rocket
} from 'lucide-react';

export default function ClientDNA() {
    const sections = [
        { title: 'Brand Identity', icon: Tag, color: 'text-blue-600', bg: 'bg-blue-50' },
        { title: 'Industry & Audience', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
        { title: 'Brand Tone', icon: Music, color: 'text-pink-600', bg: 'bg-pink-50' },
        { title: 'Platforms & Goals', icon: Target, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { title: 'Additional Notes', icon: StickyNote, color: 'text-slate-600', bg: 'bg-slate-50' },
    ];

    return (
        <div className="flex gap-8 max-w-7xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex-1 space-y-8">
                <div>
                    <h1 className="text-3xl font-bold font-heading text-slate-900">Client DNA Profile</h1>
                    <p className="text-slate-500">Capture your client's foundational brand information to power AI-driven campaigns and content.</p>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="bg-indigo-100 text-indigo-600 p-2 rounded-lg">
                            <Users size={20} />
                        </div>
                        <span className="font-semibold text-slate-700">Active Client</span>
                    </div>
                    <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded">Active</span>
                </div>

                {sections.map((section, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                            <div className={`${section.bg} ${section.color} p-2 rounded-lg`}>
                                <section.icon size={20} />
                            </div>
                            <h2 className="text-lg font-bold text-slate-800">{section.title}</h2>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="bg-slate-50 border border-indigo-100 rounded-lg p-3 flex items-center gap-2 text-sm text-indigo-600">
                                <ChevronRight size={16} />
                                Feeds into {section.title.split(' ')[0]} AI Module
                            </div>

                            {section.title === 'Brand Identity' && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Brand Name</label>
                                        <input type="text" placeholder="Enter brand name" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Brand Tagline</label>
                                        <input type="text" placeholder="Your memorable tagline" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Brand Story / Positioning</label>
                                        <textarea placeholder="Share your brand's origin, mission, and what makes it unique..." className="w-full h-32 px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none" />
                                    </div>
                                </div>
                            )}

                            {section.title === 'Industry & Audience' && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Industry</label>
                                        <select className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none">
                                            <option>Select industry</option>
                                            <option>SaaS / Tech</option>
                                            <option>E-commerce</option>
                                            <option>Real Estate</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Primary Audience</label>
                                        <textarea placeholder="Describe your primary target audience..." className="w-full h-24 px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                <div className="sticky bottom-6 flex justify-between items-center bg-white p-4 border border-slate-200 rounded-xl shadow-lg z-10">
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                        <Save size={16} />
                        Last saved: Just now
                    </div>
                    <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-indigo-700 transition-colors shadow-md">
                        <Save size={18} /> Save Client DNA
                    </button>
                </div>
            </div>

            <div className="w-80 hidden lg:block">
                <div className="sticky top-24 space-y-6">
                    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-slate-900">DNA Preview</h3>
                            <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded uppercase font-bold">Live Preview</span>
                        </div>
                        <p className="text-xs text-slate-500 mb-6">This preview shows how your client DNA will appear as an internal creative brief.</p>

                        <div className="space-y-4">
                            {['Brand', 'Industry', 'Brand Tones', 'Business Goals', 'Platforms'].map((label) => (
                                <div key={label}>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
                                    <p className="text-sm font-medium text-slate-300 italic">Not set</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <Monitor size={18} className="text-indigo-600" />
                            <h3 className="font-bold text-slate-900">Where DNA Flows</h3>
                        </div>
                        <div className="space-y-4">
                            {[
                                { title: 'Campaign Strategy', desc: 'Informs objectives & messaging', color: 'bg-blue-100 text-blue-600' },
                                { title: 'Content Tone', desc: 'Shapes scripts & prompts', color: 'bg-purple-100 text-purple-600' },
                                { title: 'Scheduler & Platforms', desc: 'Pre-selects preferred channels', color: 'bg-green-100 text-green-600' },
                            ].map((item) => (
                                <div key={item.title} className="flex gap-3">
                                    <div className={`w-8 h-8 rounded-lg ${item.color} flex items-center justify-center flex-shrink-0`}>
                                        <Rocket size={14} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-800">{item.title}</p>
                                        <p className="text-[10px] text-slate-500">{item.desc}</p>
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
