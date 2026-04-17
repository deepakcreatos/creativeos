"use client";

import React, { useState } from 'react';
import './studio.css'; // The extracted DesignAI CSS fundamentals
import { contentApi, mediaApi } from '@/lib/api/client';
import { useWorkspace } from '@/lib/workspace/WorkspaceContext';
import { Wand2, Dna, Download } from 'lucide-react';

export default function ContentStudio() {
    const { activeClient } = useWorkspace();
    const [step, setStep] = useState(1);
    const [generating, setGenerating] = useState(false);
    
    // Core state mapped from designai
    const [productName, setProductName] = useState('');
    const [productDesc, setProductDesc] = useState('');
    const [industry, setIndustry] = useState('');
    const [purpose, setPurpose] = useState('Social Media Post');
    const [audience, setAudience] = useState<string[]>([]);
    const [mood, setMood] = useState<string[]>([]);
    const [imageStyle, setImageStyle] = useState('Photorealistic product photography, studio lighting');
    const [aspectRatio, setAspectRatio] = useState('1:1 square format, perfect for social media');
    const [colorHint, setColorHint] = useState('#7C3AED');
    
    const [result, setResult] = useState<any>(null);

    const toggleArray = (arr: string[], val: string, max?: number) => {
        if (arr.includes(val)) return arr.filter(i => i !== val);
        if (max && arr.length >= max) return arr;
        return [...arr, val];
    };

    const handleGenerate = async () => {
        if (!productName || !productDesc) return;
        setGenerating(true);
        const prompt = `Product: ${productName}. Description: ${productDesc}. Audience: ${audience.join(', ')}. Mood: ${mood.join(', ')}. Purpose: ${purpose}.`;
        
        try {
            const enhancedPrompt = activeClient 
                ? `Adhere strictly to a ${activeClient.brandTone} brand tone tailored for the ${activeClient.industry} industry. Instructions: ${prompt}`
                : prompt;

            // Generate Content & Media concurrently
            const mediaPrompt = `${enhancedPrompt}. Style: ${imageStyle}. Main color scheme involves: ${colorHint}.`;

            const res = await mediaApi.generate({ 
                prompt: mediaPrompt, 
                type: 'IMAGE', 
                dimensions: { width: 1080, height: 1080 },
                style: imageStyle,
                colorHint,
                contentId: 'demo-content-uuid'
            });
            
            setResult({ type: 'media', images: [res.data.url, res.data.url, res.data.url, res.data.url] }); // Demo mapping 4 grid spaces
            setStep(5); // Go to results
        } catch (err) {
            console.error(err);
            alert("Error generating asset. Check backend connection.");
        } finally {
            setGenerating(false);
        }
    };

    // Design Layout mapped from designai-complete
    return (
        <div className="design-studio-root" style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh', fontFamily: "'Satoshi', sans-serif" }}>
            <div className="wrap">
                {/* WIZARD LAYOUT */}
                <div className="wiz-layout">
                    
                    <div className="wiz-sidebar">
                        <div className="sidebar-card">
                            <div className="sidebar-title">Content Studio</div>
                            <div className="step-list">
                                {[1, 2, 3, 4].map(num => (
                                    <div key={num} onClick={() => setStep(num)} className={`step-item ${step > num ? 'done' : ''} ${step === num ? 'active' : ''}`}>
                                        <div className="si-num">{step > num ? '✓' : num}</div>
                                        <span className="si-name">
                                            {num===1 ? 'Basics' : num===2 ? 'Audience' : num===3 ? 'Style' : 'Format & Colors'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="sidebar-credits mt-6">
                                <div className="sc-label flex items-center gap-2"><Dna size={12}/> Client Constraints</div>
                                <div className="sc-info mt-2" style={{color: 'var(--accent3)'}}>
                                    {activeClient ? `Locked to ${activeClient.brandTone} tone.` : 'Global Default Mode'}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="wiz-main">
                        {/* STEP 1: BASICS */}
                        {step === 1 && (
                            <div className="step-panel on">
                                <div className="panel-header">
                                    <h2 className="panel-title">What are you creating? 🛍️</h2>
                                    <p className="panel-sub">Give us the basics — simple words work perfectly!</p>
                                </div>
                                <div className="field">
                                    <label className="field-label" style={{color: 'var(--text)'}}>Project Name</label>
                                    <input value={productName} onChange={e=>setProductName(e.target.value)} placeholder="e.g. FreshBrew Coffee Campaign" />
                                </div>
                                <div className="field">
                                    <label className="field-label" style={{color: 'var(--text)'}}>Describe it in simple words</label>
                                    <textarea value={productDesc} onChange={e=>setProductDesc(e.target.value)} placeholder="e.g. A premium cold-brew brand..."></textarea>
                                </div>
                                <div className="step-nav">
                                    <button className="btn-next-step" onClick={() => setStep(2)}>Continue to Audience →</button>
                                </div>
                            </div>
                        )}

                        {/* STEP 2: AUDIENCE */}
                        {step === 2 && (
                            <div className="step-panel on">
                                <div className="panel-header">
                                    <h2 className="panel-title">Who is your audience? 👥</h2>
                                    <p className="panel-sub">This shapes the graphic's energy and appeal.</p>
                                </div>
                                <div className="field">
                                    <label className="field-label" style={{color: 'var(--text)'}}>Brand Mood & Feel (pick up to 3)</label>
                                    <div className="chip-row">
                                        {['Bold & Energetic', 'Luxury', 'Modern Tech', 'Minimal', 'Playful', 'Elegant'].map(m => (
                                            <span key={m} onClick={() => setMood(toggleArray(mood, m, 3))} className={`chip ${mood.includes(m) ? 'sel' : ''}`}>{m}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="step-nav mt-8">
                                    <button className="btn-prev-step" onClick={() => setStep(1)}>← Back</button>
                                    <button className="btn-next-step" onClick={() => setStep(3)}>Continue to Style →</button>
                                </div>
                            </div>
                        )}

                        {/* STEP 3: STYLE */}
                        {step === 3 && (
                            <div className="step-panel on">
                                <div className="panel-header">
                                    <h2 className="panel-title">Pick your visual style ✨</h2>
                                </div>
                                <div className="style-grid">
                                    {[
                                        { nm: 'Photorealistic', ds: 'Real, lifelike', ico: '📷', val: 'Photorealistic product photography, studio lighting' },
                                        { nm: '3D / CGI', ds: 'Dimensional', ico: '🌐', val: '3D CGI render, modern volumetric lighting' },
                                        { nm: 'Minimalist', ds: 'Less is more', ico: '◻️', val: 'Minimalist design, generous white space' },
                                        { nm: 'Neon / Cyber', ds: 'Glowing, sci-fi', ico: '🌆', val: 'Cyberpunk neon, dark background' },
                                    ].map(s => (
                                        <div key={s.nm} onClick={() => setImageStyle(s.val)} className={`style-tile ${imageStyle === s.val ? 'sel' : ''}`}>
                                            <span className="st-ico">{s.ico}</span><span className="st-nm">{s.nm}</span><span className="st-ds">{s.ds}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="step-nav mt-8">
                                    <button className="btn-prev-step" onClick={() => setStep(2)}>← Back</button>
                                    <button className="btn-next-step" onClick={() => setStep(4)}>Continue to Formats →</button>
                                </div>
                            </div>
                        )}

                        {/* STEP 4: FORMAT & COLORS */}
                        {step === 4 && (
                            <div className="step-panel on">
                                <div className="panel-header">
                                    <h2 className="panel-title">Colors & Format 🎨</h2>
                                </div>
                                <div className="field">
                                    <label className="field-label" style={{color: 'var(--text)'}}>Brand Color Override</label>
                                    <div className="color-pickers-row">
                                        <div className="cpick">
                                            <input type="color" value={colorHint} onChange={e => setColorHint(e.target.value)} />
                                            <span className="cpick-hex" style={{color: 'var(--text)'}}>{colorHint}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="field mt-6">
                                    <label className="field-label" style={{color: 'var(--text)'}}>Aspect Ratio / Format</label>
                                    <div className="ratio-grid">
                                        {[
                                            { nm: 'Square', dim: '1:1', ico: '⬜' },
                                            { nm: 'Portrait', dim: '4:5', ico: '📱' },
                                            { nm: 'Landscape', dim: '16:9', ico: '🖥️' }
                                        ].map(r => (
                                            <div key={r.nm} onClick={() => setAspectRatio(r.dim)} className={`ratio-card ${aspectRatio === r.dim ? 'sel' : ''}`}>
                                                <span className="ratio-ico">{r.ico}</span>
                                                <div className="ratio-nm">{r.nm}</div><div className="ratio-dim">{r.dim}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                <div className="mt-10">
                                    <button className="btn-gen" onClick={handleGenerate} disabled={generating}>
                                        {generating ? 'Generating through Gateway...' : '🖼️ Generate High-Fidelity Assets'}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* STEP 5: RESULTS */}
                        {step === 5 && result && (
                            <div className="results-header" style={{display: 'block'}}>
                                <h2 className="results-title">Your Content & Designs are <span>Ready!</span> 🎉</h2>
                                <p className="results-sub mt-2">Driven by your deeply connected Client DNA parameters.</p>
                                
                                <div className="img-grid mt-6">
                                    {result.images?.map((url: string, i: number) => (
                                        <div key={i} className="img-card border border-slate-200 bg-white flex items-center justify-center p-0 text-center text-slate-500 overflow-hidden relative">
                                            <img src={url} alt="Generated UI" className="w-full h-full object-cover" />
                                            <div className="img-hover-actions absolute inset-0 bg-slate-900/50 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                                                <a href={url} download target="_blank" rel="noreferrer" className="iha-btn btn-dl bg-white text-slate-900 px-4 py-2 rounded-full font-bold flex items-center gap-2"><Download size={14} /> Download Image</a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="result-footer">
                                    <button className="btn-rf btn-rf-primary" onClick={() => handleGenerate()}>🔄 Regenerate All</button>
                                    <button className="btn-rf btn-rf-ghost" onClick={() => setStep(1)}>✨ New Concept</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
