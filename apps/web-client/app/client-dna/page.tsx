"use client";

import React, { useState } from 'react';
import {
    Tag, Target, Users, Music, Globe, StickyNote, Save,
    ChevronRight, Monitor, Rocket, Loader2, CheckCircle2
} from 'lucide-react';
import { dnaApi } from '@/lib/api/client';

const BRAND_TONES = ['Professional', 'Friendly', 'Bold', 'Witty', 'Inspirational', 'Educational', 'Luxurious', 'Minimalist'];
const PLATFORMS = ['LinkedIn', 'Meta / Instagram', 'Google Ads', 'TikTok', 'Twitter / X', 'YouTube', 'Email', 'WhatsApp'];
const GOALS = ['Brand Awareness', 'Lead Generation', 'Sales Conversion', 'Community Building', 'Product Launch', 'Retention'];

export default function ClientDNA() {
    const sections = [
        { title: 'Brand Identity', icon: Tag, color: 'text-blue-600', bg: 'bg-blue-50' },
        { title: 'Industry & Audience', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
        { title: 'Brand Tone', icon: Music, color: 'text-pink-600', bg: 'bg-pink-50' },
        { title: 'Platforms & Goals', icon: Target, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { title: 'Geography & Notes', icon: Globe, color: 'text-green-600', bg: 'bg-green-50' },
    ];

    const [isLoading, setIsLoading] = useState(false);
    const [lastSaved, setLastSaved] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        clientName: '',
        tagline: '',
        story: '',
        industry: '',
        targetAudience: '',
        ageRange: '',
        brandTone: 'Professional',
        customTone: '',
        selectedPlatforms: [] as string[],
        selectedGoals: [] as string[],
        geography: '',
        languages: '',
        notes: '',
    });

    const updateField = (field: string, value: string) =>
        setFormData(prev => ({ ...prev, [field]: value }));

    const togglePlatform = (p: string) =>
        setFormData(prev => ({
            ...prev,
            selectedPlatforms: prev.selectedPlatforms.includes(p)
                ? prev.selectedPlatforms.filter(x => x !== p)
                : [...prev.selectedPlatforms, p],
        }));

    const toggleGoal = (g: string) =>
        setFormData(prev => ({
            ...prev,
            selectedGoals: prev.selectedGoals.includes(g)
                ? prev.selectedGoals.filter(x => x !== g)
                : [...prev.selectedGoals, g],
        }));

    const handleSave = async () => {
        setIsLoading(true);
        try {
            const payload = {
                clientName: formData.clientName || 'Untitled Client',
                industry: formData.industry || 'Other',
                brandTone: formData.brandTone || 'Professional',
                targetAudience: {
                    description: formData.targetAudience || 'General audience',
                    ageRange: formData.ageRange,
                },
                geography: {
                    regions: formData.geography,
                    languages: formData.languages,
                },
                psychographics: {
                    story: formData.story,
                    tagline: formData.tagline,
                    notes: formData.notes,
                },
                products: {
                    platforms: formData.selectedPlatforms,
                    goals: formData.selectedGoals,
                },
            };

            await dnaApi.create(payload);
            setLastSaved(new Date().toLocaleTimeString());
            alert('✅ Client DNA Saved Successfully!');
        } catch (error) {
            console.error('Failed to save Client DNA', error);
            alert('Failed to save. Check console for details.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in slide-in-from-bottom-4 duration-500 w-full">
            <div className="flex-1 space-y-8">
                <div>
                    <h1 className="text-3xl font-bold font-heading text-slate-900">Client DNA Profile</h1>
                    <p className="text-slate-500">Capture your client&apos;s foundational brand information to power AI-driven campaigns and content.</p>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="bg-indigo-100 text-indigo-600 p-2 rounded-lg"><Users size={20} /></div>
                        <span className="font-semibold text-slate-700">
                            {formData.clientName || 'New Client Profile'}
                        </span>
                    </div>
                    {lastSaved && (
                        <span className="flex items-center gap-1.5 text-xs text-green-600 font-bold">
                            <CheckCircle2 size={14} /> Saved at {lastSaved}
                        </span>
                    )}
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

                        <div className="p-6 space-y-5">
                            <div className="bg-slate-50 border border-indigo-100 rounded-lg p-3 flex items-center gap-2 text-sm text-indigo-600">
                                <ChevronRight size={16} />
                                Feeds into {section.title.split(' ')[0]} AI Module
                            </div>

                            {/* ── SECTION 1: Brand Identity ── */}
                            {section.title === 'Brand Identity' && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Brand Name <span className="text-red-400">*</span></label>
                                        <input type="text" placeholder="e.g. Squadra Media" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                            value={formData.clientName} onChange={(e) => updateField('clientName', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Brand Tagline</label>
                                        <input type="text" placeholder="Your memorable tagline" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                            value={formData.tagline} onChange={(e) => updateField('tagline', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Brand Story / Positioning</label>
                                        <textarea placeholder="Share your brand's origin, mission, and what makes it unique..." className="w-full h-32 px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
                                            value={formData.story} onChange={(e) => updateField('story', e.target.value)} />
                                    </div>
                                </div>
                            )}

                            {/* ── SECTION 2: Industry & Audience ── */}
                            {section.title === 'Industry & Audience' && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Industry <span className="text-red-400">*</span></label>
                                        <select className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                            value={formData.industry} onChange={(e) => updateField('industry', e.target.value)}>
                                            <option value="">Select industry</option>
                                            <option value="SaaS">SaaS / Tech</option>
                                            <option value="E-commerce">E-commerce</option>
                                            <option value="Real Estate">Real Estate</option>
                                            <option value="Healthcare">Healthcare</option>
                                            <option value="Finance">Finance & Fintech</option>
                                            <option value="Education">Education</option>
                                            <option value="Agency">Marketing Agency</option>
                                            <option value="Retail">Retail</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Primary Target Audience</label>
                                        <textarea placeholder="e.g. Marketing managers at B2B SaaS companies, aged 28–45..." className="w-full h-24 px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
                                            value={formData.targetAudience} onChange={(e) => updateField('targetAudience', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Age Range</label>
                                        <select className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                            value={formData.ageRange} onChange={(e) => updateField('ageRange', e.target.value)}>
                                            <option value="">Select age range</option>
                                            <option value="18-24">18 – 24</option>
                                            <option value="25-34">25 – 34</option>
                                            <option value="35-44">35 – 44</option>
                                            <option value="45-54">45 – 54</option>
                                            <option value="55+">55+</option>
                                            <option value="all">All Ages</option>
                                        </select>
                                    </div>
                                </div>
                            )}

                            {/* ── SECTION 3: Brand Tone ── */}
                            {section.title === 'Brand Tone' && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-3">Select Primary Tone <span className="text-red-400">*</span></label>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                            {BRAND_TONES.map(tone => (
                                                <button key={tone} type="button"
                                                    onClick={() => updateField('brandTone', tone)}
                                                    className={`p-3 rounded-xl border-2 text-sm font-bold transition-all ${formData.brandTone === tone
                                                        ? 'border-pink-500 bg-pink-50 text-pink-700'
                                                        : 'border-slate-200 text-slate-600 hover:border-pink-300'}`}>
                                                    {tone}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Additional Tone Notes</label>
                                        <textarea placeholder="Describe any specific tone nuances, words to avoid, or style preferences..." className="w-full h-24 px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
                                            value={formData.customTone} onChange={(e) => updateField('customTone', e.target.value)} />
                                    </div>
                                    <div className="bg-pink-50 border border-pink-100 rounded-lg p-4">
                                        <p className="text-sm font-semibold text-pink-800">Selected: <span className="text-pink-600">{formData.brandTone}</span></p>
                                        <p className="text-xs text-pink-600 mt-1">This tone will be applied to all AI-generated content for this client.</p>
                                    </div>
                                </div>
                            )}

                            {/* ── SECTION 4: Platforms & Goals ── */}
                            {section.title === 'Platforms & Goals' && (
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-3">Target Platforms</label>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                            {PLATFORMS.map(p => (
                                                <button key={p} type="button"
                                                    onClick={() => togglePlatform(p)}
                                                    className={`p-3 rounded-xl border-2 text-xs font-bold transition-all ${formData.selectedPlatforms.includes(p)
                                                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                                                        : 'border-slate-200 text-slate-600 hover:border-indigo-300'}`}>
                                                    {p}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-3">Campaign Goals</label>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                            {GOALS.map(g => (
                                                <button key={g} type="button"
                                                    onClick={() => toggleGoal(g)}
                                                    className={`p-3 rounded-xl border-2 text-xs font-bold transition-all ${formData.selectedGoals.includes(g)
                                                        ? 'border-green-500 bg-green-50 text-green-700'
                                                        : 'border-slate-200 text-slate-600 hover:border-green-300'}`}>
                                                    {g}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    {(formData.selectedPlatforms.length > 0 || formData.selectedGoals.length > 0) && (
                                        <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 text-sm text-indigo-800">
                                            <p className="font-bold mb-1">Selected: {formData.selectedPlatforms.length} platform(s), {formData.selectedGoals.length} goal(s)</p>
                                            {formData.selectedPlatforms.length > 0 && <p className="text-xs">Platforms: {formData.selectedPlatforms.join(', ')}</p>}
                                            {formData.selectedGoals.length > 0 && <p className="text-xs mt-1">Goals: {formData.selectedGoals.join(', ')}</p>}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* ── SECTION 5: Geography & Notes ── */}
                            {section.title === 'Geography & Notes' && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Target Geography / Regions</label>
                                        <input type="text" placeholder="e.g. UAE, Saudi Arabia, India, UK..." className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                            value={formData.geography} onChange={(e) => updateField('geography', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Languages</label>
                                        <input type="text" placeholder="e.g. English, Arabic, Hindi..." className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                            value={formData.languages} onChange={(e) => updateField('languages', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">
                                            <StickyNote size={14} className="inline mr-1" />
                                            Additional Notes / Special Instructions
                                        </label>
                                        <textarea placeholder="Anything else AI should know — competitors, sensitive topics to avoid, key differentiators..." className="w-full h-32 px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
                                            value={formData.notes} onChange={(e) => updateField('notes', e.target.value)} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                <div className="sticky bottom-6 flex justify-between items-center bg-white p-4 border border-slate-200 rounded-xl shadow-lg z-10">
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                        <Save size={16} />
                        Last saved: {lastSaved || 'Not saved yet'}
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={isLoading}
                        className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-indigo-700 transition-colors shadow-md disabled:opacity-70"
                    >
                        {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                        {isLoading ? 'Saving...' : 'Save Client DNA'}
                    </button>
                </div>
            </div>

            {/* Right Sidebar */}
            <div className="w-80 hidden lg:block">
                <div className="sticky top-24 space-y-6">
                    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-slate-900">DNA Preview</h3>
                            <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded uppercase font-bold">Live</span>
                        </div>
                        <div className="space-y-3">
                            {[
                                { label: 'Brand', value: formData.clientName },
                                { label: 'Industry', value: formData.industry },
                                { label: 'Tone', value: formData.brandTone },
                                { label: 'Platforms', value: formData.selectedPlatforms.length ? `${formData.selectedPlatforms.length} selected` : '' },
                                { label: 'Goals', value: formData.selectedGoals.length ? `${formData.selectedGoals.length} selected` : '' },
                                { label: 'Geography', value: formData.geography },
                            ].map(item => (
                                <div key={item.label}>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</p>
                                    <p className="text-sm font-medium text-slate-800">{item.value || '—'}</p>
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
