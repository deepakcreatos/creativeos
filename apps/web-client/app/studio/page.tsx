"use client";

import React, { useState } from 'react';
import { contentApi, mediaApi } from '@/lib/api/client';
import { Image as ImageIcon, Type, Sparkles, Wand2, Download, Play, RefreshCw } from 'lucide-react';

export default function ContentStudio() {
    const [prompt, setPrompt] = useState('');
    const [generating, setGenerating] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [mode, setMode] = useState<'copy' | 'media'>('copy');

    const handleGenerate = async () => {
        if (!prompt) return;
        setGenerating(true);
        try {
            if (mode === 'copy') {
                const res = await contentApi.generate({ prompt, platform: 'LinkedIn', blueprintId: 'demo-uuid' });
                setResult({ type: 'copy', data: res.data });
            } else {
                const res = await mediaApi.generate({ 
                    prompt, 
                    type: 'IMAGE', 
                    dimensions: { width: 1080, height: 1080 },
                    contentId: 'demo-content-uuid'
                });
                setResult({ type: 'media', data: res.data });
            }
        } catch (err) {
            console.error(err);
            alert("Error generating asset. Check console.");
        } finally {
            setGenerating(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full animate-in fade-in duration-500 space-y-8">
            <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-heading text-slate-900 flex items-center gap-3">
                        <Wand2 className="text-accent" size={32} />
                        Content Studio
                    </h1>
                    <p className="text-slate-500 mt-2">AI-powered copy and visual asset generation.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Generation Controls */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Asset Type</label>
                            <div className="flex bg-slate-100 p-1 rounded-xl">
                                <button 
                                    onClick={() => setMode('copy')}
                                    className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-bold rounded-lg transition-all ${mode === 'copy' ? 'bg-white text-accent shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    <Type size={16} /> Copy
                                </button>
                                <button 
                                    onClick={() => setMode('media')}
                                    className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-bold rounded-lg transition-all ${mode === 'media' ? 'bg-white text-accent shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    <ImageIcon size={16} /> Media
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Instructions</label>
                            <textarea 
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder={`Describe the ${mode === 'copy' ? 'social post' : 'image'} you want to generate...`}
                                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl h-32 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-sm resize-none"
                            />
                        </div>

                        <button 
                            onClick={handleGenerate}
                            disabled={generating || !prompt}
                            className="w-full bg-accent hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                        >
                            {generating ? (
                                <><RefreshCw className="animate-spin" size={18} /> Generating...</>
                            ) : (
                                <><Sparkles size={18} /> Generate {mode === 'copy' ? 'Copy' : 'Media'}</>
                            )}
                        </button>
                    </div>
                </div>

                {/* Canvas / Preview */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm h-full min-h-[500px] flex flex-col overflow-hidden">
                        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                            <h3 className="font-bold text-slate-700">Preview Canvas</h3>
                            {result && (
                                <button className="text-sm font-bold text-slate-500 hover:text-accent flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                                    <Download size={14} /> Export
                                </button>
                            )}
                        </div>

                        <div className="flex-1 p-8 flex items-center justify-center bg-slate-50/30">
                            {!result ? (
                                <div className="text-center text-slate-400 max-w-sm">
                                    <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100 shadow-sm">
                                        <Wand2 size={32} className="text-slate-300" />
                                    </div>
                                    <p className="font-medium text-slate-500 mb-1">Your canvas is empty</p>
                                    <p className="text-sm">Enter instructions on the left to generate new AI content and media assets.</p>
                                </div>
                            ) : (
                                <div className="w-full max-w-xl animate-in zoom-in-95 duration-300">
                                    {result.type === 'copy' ? (
                                        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-lg">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-10 h-10 bg-accent/10 text-accent rounded-full flex items-center justify-center font-bold">AI</div>
                                                <div>
                                                    <p className="font-bold text-slate-900 text-sm">CreativeOS AI</p>
                                                    <p className="text-xs text-slate-500">Drafted just now</p>
                                                </div>
                                            </div>
                                            <div className="space-y-4">
                                                {result.data.items?.map((item: any, i: number) => (
                                                    <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                                        <span className="text-xs font-bold text-accent uppercase tracking-wider mb-2 block">{item.platform}</span>
                                                        <p className="text-slate-700 whitespace-pre-wrap text-sm">{item.text}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="bg-white border border-slate-200 p-2 rounded-2xl shadow-lg">
                                            <div className="aspect-square bg-slate-100 rounded-xl flex items-center justify-center relative overflow-hidden group">
                                                <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-purple-500/20"></div>
                                                <ImageIcon size={48} className="text-slate-400 opacity-50 relative z-10" />
                                                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur p-4 rounded-lg shadow-sm transform translate-y-full group-hover:translate-y-0 transition-transform hidden group-hover:block z-20">
                                                    <p className="text-xs font-bold text-slate-900 mb-1">Generated Asset</p>
                                                    <p className="text-[10px] text-slate-500 font-mono break-all">{result.data.url || 'asset-url-mock'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
