"use client";

import React, { useEffect, useState } from 'react';
import { knowledgeApi } from '@/lib/api/client';
import { Network, Database, GitMerge, RefreshCw } from 'lucide-react';

export default function KnowledgeGraph() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate graph structure loading delay
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full animate-in fade-in duration-500 space-y-8">
            <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-heading text-slate-900 flex items-center gap-3">
                        <Network className="text-fuchsia-500" size={32} />
                        Knowledge Graph
                    </h1>
                    <p className="text-slate-500 mt-2">Neo4j intelligence routing and semantic relationship mapping.</p>
                </div>
                <button 
                    className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 transition-colors disabled:opacity-50"
                >
                    <RefreshCw size={18} /> Sync Graph
                </button>
            </div>

            <div className="bg-white border border-slate-200 shadow-sm rounded-2xl min-h-[600px] relative overflow-hidden flex flex-col">
                <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center z-10">
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                        <Database size={16} /> Neo4j Simulated Topology
                    </div>
                    <div className="flex gap-4 text-xs font-bold">
                        <span className="flex items-center gap-1 text-blue-500"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Client DNA</span>
                        <span className="flex items-center gap-1 text-purple-500"><div className="w-2 h-2 rounded-full bg-purple-500"></div> Campaign</span>
                        <span className="flex items-center gap-1 text-amber-500"><div className="w-2 h-2 rounded-full bg-amber-500"></div> Assets</span>
                    </div>
                </div>

                <div className="flex-1 bg-slate-50/50 p-8 relative flex items-center justify-center overflow-hidden">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center text-slate-400">
                            <Network size={48} className="animate-pulse mb-4 text-fuchsia-200" />
                            <p className="font-bold">Indexing semantic relationships...</p>
                        </div>
                    ) : (
                        <div className="relative w-full max-w-3xl h-full min-h-[400px]">
                            {/* SVG Edges layer */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-slate-200 animate-in fade-in duration-1000" style={{ strokeWidth: 2 }}>
                                <line x1="50%" y1="20%" x2="30%" y2="50%" />
                                <line x1="50%" y1="20%" x2="70%" y2="50%" />
                                <line x1="30%" y1="50%" x2="20%" y2="80%" />
                                <line x1="30%" y1="50%" x2="40%" y2="80%" />
                                <line x1="70%" y1="50%" x2="60%" y2="80%" />
                                <line x1="70%" y1="50%" x2="80%" y2="80%" />
                            </svg>

                            {/* Node representations */}
                            <div className="absolute top-[20%] left-[50%] -translate-x-1/2 -translate-y-1/2 animate-in zoom-in-95 duration-500">
                                <div className="bg-blue-500 text-white p-3 rounded-2xl shadow-lg border-2 border-white flex flex-col items-center text-center cursor-pointer hover:scale-105 transition-transform">
                                    <span className="text-xs font-bold uppercase tracking-wider mb-1 opacity-80">DNA ROOT</span>
                                    <span className="font-bold whitespace-nowrap">Squadra Media</span>
                                </div>
                            </div>

                            <div className="absolute top-[50%] left-[30%] -translate-x-1/2 -translate-y-1/2 animate-in zoom-in-95 duration-700 delay-100 fill-mode-both">
                                <div className="bg-purple-500 text-white p-3 rounded-2xl shadow-lg border-2 border-white flex flex-col items-center text-center cursor-pointer hover:scale-105 transition-transform">
                                    <span className="text-xs font-bold uppercase tracking-wider mb-1 opacity-80">CAMPAIGN</span>
                                    <span className="font-bold whitespace-nowrap">Q3 Webinar</span>
                                </div>
                            </div>

                            <div className="absolute top-[50%] left-[70%] -translate-x-1/2 -translate-y-1/2 animate-in zoom-in-95 duration-700 delay-200 fill-mode-both">
                                <div className="bg-purple-500 text-white p-3 rounded-2xl shadow-lg border-2 border-white flex flex-col items-center text-center cursor-pointer hover:scale-105 transition-transform">
                                    <span className="text-xs font-bold uppercase tracking-wider mb-1 opacity-80">CAMPAIGN</span>
                                    <span className="font-bold whitespace-nowrap">Winter Sale</span>
                                </div>
                            </div>

                            <div className="absolute top-[80%] left-[20%] -translate-x-1/2 -translate-y-1/2 animate-in zoom-in-95 duration-700 delay-300 fill-mode-both">
                                <div className="bg-amber-500 text-white p-2 rounded-xl text-xs font-bold shadow-md">LinkedIn Copy</div>
                            </div>
                            <div className="absolute top-[80%] left-[40%] -translate-x-1/2 -translate-y-1/2 animate-in zoom-in-95 duration-700 delay-300 fill-mode-both">
                                <div className="bg-amber-500 text-white p-2 rounded-xl text-xs font-bold shadow-md">Email Sequence</div>
                            </div>

                            <div className="absolute top-[80%] left-[60%] -translate-x-1/2 -translate-y-1/2 animate-in zoom-in-95 duration-700 delay-500 fill-mode-both">
                                <div className="bg-amber-500 text-white p-2 rounded-xl text-xs font-bold shadow-md">Instagram Reel</div>
                            </div>
                            <div className="absolute top-[80%] left-[80%] -translate-x-1/2 -translate-y-1/2 animate-in zoom-in-95 duration-700 delay-500 fill-mode-both">
                                <div className="bg-amber-500 text-white p-2 rounded-xl text-xs font-bold shadow-md">TikTok Ad</div>
                            </div>

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
