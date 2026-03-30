"use client";

import React, { useState, useEffect } from 'react';
import {
    Tag, Target, Users, Music, Globe, StickyNote, Save,
    ChevronRight, Monitor, Rocket, Loader2, CheckCircle2,
    Plus, Trash2, Edit
} from 'lucide-react';
import { dnaApi } from '@/lib/api/client';
import { useWorkspace } from '@/lib/workspace/WorkspaceContext';

const BRAND_TONES = ['Professional', 'Friendly', 'Bold', 'Witty', 'Inspirational', 'Educational', 'Luxurious', 'Minimalist'];
const PLATFORMS = ['LinkedIn', 'Meta / Instagram', 'Google Ads', 'TikTok', 'Twitter / X', 'YouTube', 'Email', 'WhatsApp'];
const GOALS = ['Brand Awareness', 'Lead Generation', 'Sales Conversion', 'Community Building', 'Product Launch', 'Retention'];

export default function ClientDNA() {
    const { clients, activeClient, setActiveClientId, refreshClients, isLoading: isWorkspaceLoading } = useWorkspace();
    
    const sections = [
        { title: 'Brand Identity', icon: Tag, color: 'text-blue-600', bg: 'bg-blue-50' },
        { title: 'Industry & Audience', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
        { title: 'Brand Tone', icon: Music, color: 'text-pink-600', bg: 'bg-pink-50' },
        { title: 'Products & Deals', icon: Rocket, color: 'text-orange-600', bg: 'bg-orange-50' },
        { title: 'Competitor Analysis', icon: Target, color: 'text-rose-600', bg: 'bg-rose-50' },
        { title: 'Platforms & Goals', icon: Target, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { title: 'Geography & Notes', icon: Globe, color: 'text-green-600', bg: 'bg-green-50' },
    ];

    const [isLoading, setIsLoading] = useState(false);
    const [lastSaved, setLastSaved] = useState<string | null>(null);
    const [isCreatingNew, setIsCreatingNew] = useState(false);

    const defaultFormData = {
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
        products: '',
        usp: '',
        competitors: '',
        geography: '',
        languages: '',
        notes: '',
    };

    const [formData, setFormData] = useState(defaultFormData);

    useEffect(() => {
        if (activeClient && !isCreatingNew) {
            setFormData({
                clientName: activeClient.clientName || '',
                tagline: activeClient.psychographics?.tagline || '',
                story: activeClient.psychographics?.story || '',
                industry: activeClient.industry || '',
                targetAudience: activeClient.targetAudience?.description || '',
                ageRange: activeClient.targetAudience?.ageRange || '',
                brandTone: activeClient.brandTone || 'Professional',
                customTone: activeClient.customTone || '', // assuming customTone might exist later
                selectedPlatforms: activeClient.products?.platforms || [],
                selectedGoals: activeClient.products?.goals || [],
                products: activeClient.products?.coreProducts || '',
                usp: activeClient.psychographics?.usp || '',
                competitors: activeClient.competitors?.list || '',
                geography: activeClient.geography?.regions || '',
                languages: activeClient.geography?.languages || '',
                notes: activeClient.psychographics?.notes || '',
            });
            setLastSaved(new Date(activeClient.updatedAt || new Date()).toLocaleTimeString());
        } else if (isCreatingNew) {
            setFormData(defaultFormData);
            setLastSaved(null);
        }
    }, [activeClient, isCreatingNew]);

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

    const handleCreateNew = () => {
        setActiveClientId(null);
        setIsCreatingNew(true);
    };

    const handleSelectClient = (id: string) => {
        setActiveClientId(id);
        setIsCreatingNew(false);
    };

    const handleDelete = async () => {
        if (!activeClient || isCreatingNew) return;
        if (!confirm('Are you sure you want to delete this client?')) return;
        
        setIsLoading(true);
        try {
            await dnaApi.delete(activeClient.id);
            await refreshClients();
            setIsCreatingNew(false);
            alert('✅ Client DNA Deleted Successfully!');
        } catch (error) {
            console.error('Failed to delete Client DNA', error);
            alert('Failed to delete. Check console for details.');
        } finally {
            setIsLoading(false);
        }
    };

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
                    usp: formData.usp,
                },
                products: {
                    platforms: formData.selectedPlatforms,
                    goals: formData.selectedGoals,
                    coreProducts: formData.products,
                },
                competitors: {
                    list: formData.competitors,
                }
            };

            if (isCreatingNew || !activeClient) {
                await dnaApi.create(payload);
            } else {
                await dnaApi.update(activeClient.id, payload);
            }
            
            await refreshClients();
            setIsCreatingNew(false);
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
        <div className="flex flex-col lg:flex-row gap-8 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in slide-in-from-bottom-4 duration-500 w-full min-h-screen">
            
            {/* Left Sidebar: Client List */}
            <div className="w-full lg:w-72 flex-shrink-0 space-y-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white">Your Clients</h2>
                </div>
                
                <button 
                    onClick={handleCreateNew}
                    className={`w-full flex items-center justify-center gap-2 py-3 px-4 border-2 border-dashed rounded-xl transition-all font-bold text-sm ${isCreatingNew ? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20' : 'border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                >
                    <Plus size={16} /> New Client
                </button>

                <div className="space-y-2 max-h-[calc(100vh-12rem)] overflow-y-auto pr-2 pb-10 custom-scrollbar">
                    {isWorkspaceLoading ? (
                        <div className="flex justify-center p-4"><Loader2 className="animate-spin text-slate-400" /></div>
                    ) : clients.length === 0 ? (
                        <p className="text-sm text-slate-500 italic p-4 text-center">No clients found. Create one above.</p>
                    ) : (
                        clients.map(client => {
                            const isActive = activeClient?.id === client.id && !isCreatingNew;
                            return (
                                <div 
                                    key={client.id}
                                    onClick={() => handleSelectClient(client.id)}
                                    className={`p-4 rounded-xl cursor-pointer border transition-all ${isActive ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800 shadow-sm' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700'}`}
                                >
                                    <h3 className={`font-bold text-sm ${isActive ? 'text-indigo-900 dark:text-indigo-300' : 'text-slate-800 dark:text-slate-200'}`}>
                                        {client.clientName || 'Untitled Client'}
                                    </h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">{client.industry || 'No industry set'}</p>
                                    
                                    {isActive && (
                                        <div className="mt-3 flex items-center gap-1">
                                            <span className="bg-indigo-600 text-white text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded">Active</span>
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            {/* Main Content Form */}
            <div className="flex-1 space-y-8 lg:max-w-[800px]">
                <div>
                    <h1 className="text-3xl font-bold font-heading text-slate-900 dark:text-white">
                        {isCreatingNew ? 'Create New Client Profile' : 'Client DNA Profile'}
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400">Capture your client&apos;s foundational brand information to power AI-driven campaigns and content.</p>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="bg-indigo-100 text-indigo-600 p-2 rounded-lg"><Users size={20} /></div>
                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                            {formData.clientName || 'New Client Profile'}
                        </span>
                    </div>
                    {lastSaved && !isCreatingNew && (
                        <span className="flex items-center gap-1.5 text-xs text-green-600 font-bold hidden sm:flex">
                            <CheckCircle2 size={14} /> Saved at {lastSaved}
                        </span>
                    )}
                </div>

                {sections.map((section, idx) => (
                    <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
                            <div className={`${section.bg} ${section.color} p-2 rounded-lg`}>
                                <section.icon size={20} />
                            </div>
                            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">{section.title}</h2>
                        </div>

                        <div className="p-6 space-y-5">
                            <div className="bg-slate-50 dark:bg-slate-950 border border-indigo-100 dark:border-indigo-900/30 rounded-lg p-3 flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400">
                                <ChevronRight size={16} />
                                Feeds into {section.title.split(' ')[0]} AI Module
                            </div>

                            {/* ── SECTION 1: Brand Identity ── */}
                            {section.title === 'Brand Identity' && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Brand Name <span className="text-red-400">*</span></label>
                                        <input type="text" placeholder="e.g. Squadra Media" className="w-full px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-transparent"
                                            value={formData.clientName} onChange={(e) => updateField('clientName', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Brand Tagline</label>
                                        <input type="text" placeholder="Your memorable tagline" className="w-full px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-transparent"
                                            value={formData.tagline} onChange={(e) => updateField('tagline', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Brand Story / Positioning</label>
                                        <textarea placeholder="Share your brand's origin, mission, and what makes it unique..." className="w-full h-32 px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none bg-transparent"
                                            value={formData.story} onChange={(e) => updateField('story', e.target.value)} />
                                    </div>
                                </div>
                            )}

                            {/* ── SECTION 2: Industry & Audience ── */}
                            {section.title === 'Industry & Audience' && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Industry <span className="text-red-400">*</span></label>
                                        <select className="w-full px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-transparent"
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
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Primary Target Audience</label>
                                        <textarea placeholder="e.g. Marketing managers at B2B SaaS companies, aged 28–45..." className="w-full h-24 px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none bg-transparent"
                                            value={formData.targetAudience} onChange={(e) => updateField('targetAudience', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Age Range</label>
                                        <select className="w-full px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-transparent"
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
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Select Primary Tone <span className="text-red-400">*</span></label>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                            {BRAND_TONES.map(tone => (
                                                <button key={tone} type="button"
                                                    onClick={() => updateField('brandTone', tone)}
                                                    className={`p-3 rounded-xl border-2 text-sm font-bold transition-all ${formData.brandTone === tone
                                                        ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-400'
                                                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-pink-300 dark:hover:border-pink-700'}`}>
                                                    {tone}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Additional Tone Notes</label>
                                        <textarea placeholder="Describe any specific tone nuances, words to avoid, or style preferences..." className="w-full h-24 px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none bg-transparent"
                                            value={formData.customTone} onChange={(e) => updateField('customTone', e.target.value)} />
                                    </div>
                                </div>
                            )}

                            {/* ── SECTION: Products & Deals ── */}
                            {section.title === 'Products & Deals' && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Core Products / Services</label>
                                        <textarea placeholder="List your main offerings, price points, and what problems they solve..." className="w-full h-24 px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none bg-transparent"
                                            value={formData.products} onChange={(e) => updateField('products', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Unique Selling Proposition (USP)</label>
                                        <input type="text" placeholder="Why do customers choose you over others?" className="w-full px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-transparent"
                                            value={formData.usp} onChange={(e) => updateField('usp', e.target.value)} />
                                    </div>
                                </div>
                            )}

                            {/* ── SECTION: Competitor Analysis ── */}
                            {section.title === 'Competitor Analysis' && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Main Competitors</label>
                                        <textarea placeholder="List top 3 competitors and what you do better than them..." className="w-full h-24 px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none bg-transparent"
                                            value={formData.competitors} onChange={(e) => updateField('competitors', e.target.value)} />
                                    </div>
                                </div>
                            )}

                            {/* ── SECTION: Platforms & Goals ── */}
                            {section.title === 'Platforms & Goals' && (
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Target Platforms</label>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                            {PLATFORMS.map(p => (
                                                <button key={p} type="button"
                                                    onClick={() => togglePlatform(p)}
                                                    className={`p-3 rounded-xl border-2 text-xs font-bold transition-all ${formData.selectedPlatforms.includes(p)
                                                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400'
                                                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-indigo-300 dark:hover:border-indigo-700'}`}>
                                                    {p}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Campaign Goals</label>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                            {GOALS.map(g => (
                                                <button key={g} type="button"
                                                    onClick={() => toggleGoal(g)}
                                                    className={`p-3 rounded-xl border-2 text-xs font-bold transition-all ${formData.selectedGoals.includes(g)
                                                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                                                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-green-300 dark:hover:border-green-700'}`}>
                                                    {g}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* ── SECTION 5: Geography & Notes ── */}
                            {section.title === 'Geography & Notes' && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Target Geography / Regions</label>
                                        <input type="text" placeholder="e.g. UAE, Saudi Arabia, India, UK..." className="w-full px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-transparent"
                                            value={formData.geography} onChange={(e) => updateField('geography', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Languages</label>
                                        <input type="text" placeholder="e.g. English, Arabic, Hindi..." className="w-full px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-transparent"
                                            value={formData.languages} onChange={(e) => updateField('languages', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                            <StickyNote size={14} className="inline mr-1" />
                                            Additional Notes / Special Instructions
                                        </label>
                                        <textarea placeholder="Anything else AI should know — competitors, sensitive topics to avoid, key differentiators..." className="w-full h-32 px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none bg-transparent"
                                            value={formData.notes} onChange={(e) => updateField('notes', e.target.value)} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                <div className="sticky bottom-6 flex justify-between items-center bg-white dark:bg-slate-900 p-4 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg z-10">
                    <div className="flex items-center gap-4">
                        {!isCreatingNew && activeClient && (
                            <button
                                onClick={handleDelete}
                                disabled={isLoading}
                                className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors"
                            >
                                <Trash2 size={18} /> Delete Client
                            </button>
                        )}
                        <span className="text-slate-400 text-sm hidden sm:inline-block">
                            {lastSaved ? `Last saved: ${lastSaved}` : 'Unsaved changes'}
                        </span>
                    </div>
                    
                    <button
                        onClick={handleSave}
                        disabled={isLoading}
                        className="bg-indigo-600 text-white px-6 py-2 flex-shrink-0 rounded-lg font-bold flex items-center gap-2 hover:bg-indigo-700 transition-colors shadow-md disabled:opacity-70"
                    >
                        {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                        {isLoading ? 'Saving...' : (isCreatingNew ? 'Create Client' : 'Update Client')}
                    </button>
                </div>
            </div>

            {/* Right Sidebar: Quick Summary (Hidden on Mobile/Tablet) */}
            <div className="w-64 hidden xl:block flex-shrink-0 space-y-6">
                <div className="sticky top-24 space-y-6">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-slate-900 dark:text-white">DNA Summary</h3>
                            <span className="text-[10px] bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded uppercase font-bold">Live</span>
                        </div>
                        <div className="space-y-3">
                            {[
                                { label: 'Brand', value: formData.clientName },
                                { label: 'Industry', value: formData.industry },
                                { label: 'Tone', value: formData.brandTone },
                                { label: 'Platforms', value: formData.selectedPlatforms.length ? `${formData.selectedPlatforms.length} selected` : '' },
                                { label: 'Goals', value: formData.selectedGoals.length ? `${formData.selectedGoals.length} selected` : '' },
                            ].map(item => (
                                <div key={item.label}>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</p>
                                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">{item.value || '—'}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <Monitor size={18} className="text-indigo-600" />
                            <h3 className="font-bold text-slate-900 dark:text-white">Active Connections</h3>
                        </div>
                        <div className="space-y-4">
                            {[
                                { title: 'Campaign Matrix', desc: 'Objectives & audiences sync', color: 'bg-blue-100 text-blue-600' },
                                { title: 'Content Studio', desc: 'Tone & platforms applied', color: 'bg-purple-100 text-purple-600' },
                                { title: 'Analytics', desc: 'Benchmarking activated', color: 'bg-green-100 text-green-600' },
                            ].map((item) => (
                                <div key={item.title} className="flex gap-3">
                                    <div className={`w-8 h-8 rounded-lg ${item.color} flex items-center justify-center flex-shrink-0`}>
                                        <Rocket size={14} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{item.title}</p>
                                        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">{item.desc}</p>
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
