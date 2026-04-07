"use client";

import React, { useState } from 'react';
import { contentApi, mediaApi } from '@/lib/api/client';
import { useWorkspace } from '@/lib/workspace/WorkspaceContext';
import { Image as ImageIcon, Type, Sparkles, Wand2, Download, Play, RefreshCw, Dna, Layout, Palette, Camera } from 'lucide-react';

export default function ContentStudio() {
    const { activeClient } = useWorkspace();
    const [prompt, setPrompt] = useState('');
    const [generating, setGenerating] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [mode, setMode] = useState<'copy' | 'media'>('copy');

    // Advanced Media Settings
    const [imageStyle, setImageStyle] = useState('Photorealistic');
    const [aspectRatio, setAspectRatio] = useState('1:1');
    const [colorHint, setColorHint] = useState('#7C3AED');

    const imageStyles = ['Photorealistic', '3D Render', 'Minimalist', 'Cyberpunk', 'Anime'];
    const aspectRatios = [
        { label: 'Square', value: '1:1' },
        { label: 'Landscape', value: '16:9' },
        { label: 'Portrait', value: '9:16' },
        { label: 'Cinematic', value: '21:9' }
    ];

    const handleGenerate = async () => {
        if (!prompt) return;
        setGenerating(true);
        try {
            // Intercept prompt securely injecting the Active Client DNA constraints natively.
            const enhancedPrompt = activeClient 
                ? `Write in a ${activeClient.brandTone} brand tone tailored for the ${activeClient.industry} industry. Instructions: ${prompt}`
                : prompt;

            if (mode === 'copy') {
                const res = await contentApi.generate({ prompt: enhancedPrompt, platform: 'LinkedIn', blueprintId: 'demo-uuid' });
                setResult({ type: 'copy', data: res.data });
            } else {
                // Note: Grok image generation was mentioned as failing. 
                // Instruct backend to route this to DALL-E 3, Flux, or Midjourney instead.
                const mediaPrompt = `${enhancedPrompt}. Style: ${imageStyle}. Main color scheme involves: ${colorHint}.`;
                
                // Map logical ratios to dimensions (approximate)
                const dims = aspectRatio === '16:9' ? { width: 1920, height: 1080 } 
                            : aspectRatio === '9:16' ? { width: 1080, height: 1920 } 
                            : aspectRatio === '21:9' ? { width: 2560, height: 1080 } 
                            : { width: 1080, height: 1080 };

                const res = await mediaApi.generate({ 
                    prompt: mediaPrompt, 
                    type: 'IMAGE', 
                    dimensions: dims,
                    style: imageStyle,
                    colorHint: colorHint,
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
                    <h1 className="text-3xl font-bold font-heading text-slate-900 dark:text-white flex items-center gap-3">
                        <Wand2 className="text-accent" size={32} />
                        Content Studio
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-2">
                        <Dna size={16} className="text-purple-500" />
                        {activeClient 
                            ? `AI Engine locked to ${activeClient.clientName}'s target audience and tone.` 
                            : 'AI-powered copy and visual asset generation.'}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Generation Controls */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Asset Type</label>
                            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                                <button 
                                    onClick={() => setMode('copy')}
                                    className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-bold rounded-lg transition-all ${mode === 'copy' ? 'bg-white dark:bg-slate-900 text-accent shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:text-slate-300'}`}
                                >
                                    <Type size={16} /> Copy
                                </button>
                                <button 
                                    onClick={() => setMode('media')}
                                    className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-bold rounded-lg transition-all ${mode === 'media' ? 'bg-white dark:bg-slate-900 text-accent shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:text-slate-300'}`}
                                >
                                    <ImageIcon size={16} /> Media
                                </button>
                            </div>
                        </div>

                        {mode === 'media' && (
                            <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1"><Camera size={14} /> Image Style</label>
                                    <div className="flex flex-wrap gap-2">
                                        {imageStyles.map(s => (
                                            <button 
                                                key={s} 
                                                onClick={() => setImageStyle(s)}
                                                className={`text-xs px-3 py-1.5 rounded-full font-bold border transition-colors ${imageStyle === s ? 'bg-accent/10 border-accent text-accent' : 'bg-transparent border-slate-200 dark:border-slate-700 text-slate-500 hover:border-slate-300'}`}
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1"><Layout size={14} /> Aspect Ratio</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {aspectRatios.map(ar => (
                                                <button
                                                    key={ar.value}
                                                    onClick={() => setAspectRatio(ar.value)}
                                                    className={`text-xs p-2 rounded-lg font-bold border transition-colors ${aspectRatio === ar.value ? 'bg-accent/10 border-accent text-accent' : 'bg-transparent border-slate-200 dark:border-slate-700 text-slate-500 hover:border-slate-300'}`}
                                                >
                                                    {ar.value}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1"><Palette size={14} /> Brand Color</label>
                                        <div className="flex items-center gap-2 mt-1">
                                            <input 
                                                type="color" 
                                                value={colorHint} 
                                                onChange={(e) => setColorHint(e.target.value)}
                                                className="w-10 h-10 p-0 border-0 rounded overflow-hidden cursor-pointer bg-transparent"
                                            />
                                            <span className="text-xs font-mono font-bold text-slate-500 uppercase">{colorHint}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                {mode === 'copy' ? 'Content Instructions' : 'Visual Concept'}
                            </label>
                            <textarea 
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder={`Describe the ${mode === 'copy' ? 'social post' : 'image'} you want to generate...`}
                                className="w-full p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl h-32 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-sm resize-none transition-all"
                            />
                            {activeClient && (
                                <div className="mt-3 flex items-start gap-2 text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700">
                                    <Dna size={14} className="text-accent mt-0.5 flex-shrink-0" />
                                    <p>Inheriting <span className="text-slate-900 dark:text-white">{activeClient.brandTone}</span> tone for <span className="text-slate-900 dark:text-white">{activeClient.industry}</span> audiences.</p>
                                </div>
                            )}
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
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm h-full min-h-[500px] flex flex-col overflow-hidden">
                        <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 flex justify-between items-center">
                            <h3 className="font-bold text-slate-700 dark:text-slate-300">Preview Canvas</h3>
                            {result && (
                                <button className="text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-accent flex items-center gap-2 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800">
                                    <Download size={14} /> Export
                                </button>
                            )}
                        </div>

                        <div className="flex-1 p-8 flex items-center justify-center bg-slate-50 dark:bg-slate-950/30">
                            {!result ? (
                                <div className="text-center text-slate-400 max-w-sm">
                                    <div className="bg-white dark:bg-slate-900 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100 dark:border-slate-800 shadow-sm">
                                        <Wand2 size={32} className="text-slate-300" />
                                    </div>
                                    <p className="font-medium text-slate-500 dark:text-slate-400 mb-1">Your canvas is empty</p>
                                    <p className="text-sm">Enter instructions on the left to generate new AI content and media assets.</p>
                                </div>
                            ) : (
                                <div className="w-full max-w-xl animate-in zoom-in-95 duration-300">
                                    {result.type === 'copy' ? (
                                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-lg">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-10 h-10 bg-accent/10 text-accent rounded-full flex items-center justify-center font-bold">AI</div>
                                                <div>
                                                    <p className="font-bold text-slate-900 dark:text-white text-sm">CreativeOS AI</p>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400">Drafted just now</p>
                                                </div>
                                            </div>
                                            <div className="space-y-4">
                                                {result.data.items?.map((item: any, i: number) => (
                                                    <div key={i} className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                                                        <span className="text-xs font-bold text-accent uppercase tracking-wider mb-2 block">{item.platform}</span>
                                                        <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap text-sm">{item.text}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 rounded-2xl shadow-lg w-full">
                                            <div 
                                                className="bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center relative overflow-hidden group mx-auto"
                                                style={{ aspectRatio: result.data.dimensions ? `${result.data.dimensions.width}/${result.data.dimensions.height}` : aspectRatio.replace(':', '/') }}
                                            >
                                                {result.data.url ? (
                                                    <img src={result.data.url} alt="Generated Asset" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-purple-500/10 flex flex-col items-center justify-center space-y-4">
                                                        <Sparkles size={48} className="text-accent/50 drop-shadow-lg" />
                                                        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 max-w-[200px] text-center">
                                                            Awaiting backend processing. 
                                                        </p>
                                                    </div>
                                                )}
                                                <div className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur p-4 rounded-lg shadow-sm transform translate-y-[120%] group-hover:translate-y-0 transition-transform duration-300 hidden group-hover:block z-20">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <p className="text-xs font-bold text-slate-900 dark:text-white mb-1">Asset Generated</p>
                                                            <div className="flex gap-2">
                                                                <span className="text-[10px] bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded font-bold text-slate-600 dark:text-slate-300">{result.data.style || imageStyle}</span>
                                                                <span className="text-[10px] bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded font-bold text-slate-600 dark:text-slate-300">{result.data.dimensions ? `${result.data.dimensions.width}x${result.data.dimensions.height}` : aspectRatio}</span>
                                                            </div>
                                                        </div>
                                                        <button className="bg-accent text-white p-2 rounded-full hover:bg-accent/90 transition">
                                                            <Download size={14} />
                                                        </button>
                                                    </div>
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
