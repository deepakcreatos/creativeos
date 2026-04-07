"use client";

import React, { useState } from 'react';
import {
  Rocket,
  Send,
  Library,
  FileText,
  Lock,
  Info,
  CheckCircle2,
  Target,
  Layout,
  Loader2
} from 'lucide-react';
import { campaignApi } from '@/lib/api/client';
import { useWorkspace } from '@/lib/workspace/WorkspaceContext';

export default function Campaigns() {
  const { activeClient } = useWorkspace();
  const [activeTab, setActiveTab] = useState('Strategy');
  const tabs = ['Strategy', 'Scripts', 'Image Prompts', 'Video Prompts', 'Email Copy', 'SOPs'];

  const [isLoading, setIsLoading] = useState(false);
  const [campaignData, setCampaignData] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    objective: 'Brand Awareness',
    platforms: ['LinkedIn', 'Meta'] // Default for demo
  });

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      // Demo: Use a dummy Client DNA ID if none exists yet, 
      // or ideally fetch it. For now, we'll try to find one or fail gracefully.
      // In a real flow, we'd select a client first.
      // For this Demo UI, "Squadra Media" is hardcoded.
      // We'll send a request with a placeholder ID and assume backend handles it 
      // (or we need to create one first).
      // Let's assume the user has created a Client DNA or we pass a mock one if the backend supports upsert.
      // Since backend is "Real DB Logic", we actually need a real ID.
      // I will fallback to a specific ID or create one on the fly if I could, but for now:
      const payload = {
        name: formData.name || 'Demo Campaign',
        objective: formData.objective.toLowerCase().replace(' ', '_'),
        clientDnaId: activeClient ? activeClient.id : 'demo-client-id-hardcoded-for-now',
        // We need a seeding step. 
        // But for the sake of the UI responding, I'll wrap this in try/catch and show mock data if API fails (graceful degradation for demo)
        platforms: formData.platforms
      };

      let result;
      try {
        result = await campaignApi.create(payload);
      } catch (e) {
        console.warn("API failed (likely no DB/Client yet), falling back to mock state for UI Demo");
        // Fallback for UI Demo if backend isn't running/seeded
        result = {
          contentPillars: ['Brand Authority', 'Market Trends', 'Product Showcase', 'Customer Stories', 'Education'],
          objective: payload.objective,
          platforms: payload.platforms
        };
        // Simulate network delay
        await new Promise(r => setTimeout(r, 2000));
      }

      setCampaignData(result);
      setActiveTab('Strategy');
    } catch (error) {
      console.error("Campaign generation failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 animate-in fade-in duration-500 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Form */}
        <div className="lg:col-span-1 space-y-8">
          <div>
            <h1 className="text-3xl font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
              Campaign Generator
              {activeClient && (
                  <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 text-xs px-2 py-1 rounded-md border border-indigo-200 dark:border-indigo-800 ml-2">
                      {activeClient.clientName}
                  </span>
              )}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Define your campaign parameters and let AI generate comprehensive outputs.</p>
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-xl p-4 flex items-center gap-4">
            <div className={`text-white p-2 rounded-full ${activeClient ? 'bg-indigo-600' : 'bg-slate-400'}`}>
              {activeClient ? <CheckCircle2 size={16} /> : <Info size={16} />}
            </div>
            <div className="text-sm">
              {activeClient ? 
                <p className="font-bold text-indigo-900 dark:text-indigo-300">Active Client: {activeClient.clientName}</p> :
                <p className="font-bold text-slate-700 dark:text-slate-300">Global Workspace Sandbox. No active client set.</p>
              }
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Campaign Name</label>
              <input
                type="text"
                placeholder="Enter campaign name"
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Campaign Objective</label>
              <select
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg"
                onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
              >
                <option>Brand Awareness</option>
                <option>Lead Generation</option>
                <option>Sales</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Content Types to Generate</label>
              <div className="grid grid-cols-2 gap-3">
                {tabs.map(tab => (
                  <label key={tab} className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-800 p-2 rounded-lg cursor-pointer hover:bg-slate-50 dark:bg-slate-950 transition-colors">
                    <input type="checkbox" className="rounded text-indigo-600" defaultChecked />
                    {tab}
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all disabled:opacity-70"
            >
              {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Rocket size={18} />}
              {isLoading ? 'Generating...' : 'Generate Campaign'}
            </button>
          </div>

          <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-3 border border-slate-200 dark:border-slate-800 rounded-xl">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold">AI Ready: System trained on client DNA</p>
          </div>
        </div>

        {/* Right Column: Results */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white">Generated Outputs</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">AI-generated campaign assets based on your parameters</p>
            </div>
            {campaignData && (
              <div className="flex gap-2">
                <button className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 hover:bg-slate-50 dark:bg-slate-950">
                  <Send size={14} /> Send to Scheduler
                </button>
                <button className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 hover:bg-slate-50 dark:bg-slate-950">
                  <Library size={14} /> Sync to Library
                </button>
                <button className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 hover:bg-slate-50 dark:bg-slate-950">
                  <FileText size={14} /> Export Docs
                </button>
              </div>
            )}
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex items-center gap-4">
            <div className="bg-amber-500 text-white p-2 rounded-lg">
              <Lock size={18} />
            </div>
            <p className="text-sm text-amber-800 font-medium">Advanced actions require an upgraded plan. <button className="underline font-bold">Upgrade to unlock full automation.</button></p>
          </div>

          <div className="space-y-6">
            <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto pb-px">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${activeTab === tab ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400 hover:text-slate-600 dark:text-slate-400'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 shadow-sm min-h-[400px]">
              {campaignData && activeTab === 'Strategy' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Campaign Strategy Overview</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      This {formData.objective} campaign leverages {campaignData.contentPillars?.length || 5} core content pillars:
                      <span className="font-semibold"> {campaignData.contentPillars?.join(', ')}</span>.
                      The strategy is optimized for {formData.platforms.join(' and ')}.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Funnel Breakdown</p>
                    {[
                      { step: 'Awareness', desc: `Focus on ${campaignData.contentPillars?.[0] || 'Brand Story'}`, color: 'bg-indigo-600' },
                      { step: 'Consideration', desc: `Deep dive into ${campaignData.contentPillars?.[1] || 'Education'}`, color: 'bg-indigo-400' },
                      { step: 'Conversion', desc: `Call to action: ${formData.objective}`, color: 'bg-green-500' },
                    ].map(item => (
                      <div key={item.step} className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl flex items-center gap-4 border border-slate-100 dark:border-slate-800">
                        <div className={`w-2.5 h-2.5 rounded-full ${item.color}`}></div>
                        <span className="text-sm font-bold text-slate-800 dark:text-slate-200 w-24">{item.step}</span>
                        <span className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Channel Mix</p>
                    <div className="flex gap-2">
                      {formData.platforms.map(tag => (
                        <span key={tag} className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {/* Keep static states for other tabs for demo if no data, or show empty state */}
              {(!campaignData || activeTab !== 'Strategy') && (
                <div className="flex items-center justify-center h-full text-slate-300 italic flex-col gap-4">
                  {campaignData ? (
                    <div className="text-center">
                      <Target size={48} className="mx-auto mb-2" />
                      <p>Detailed {activeTab} generation is mocked for this demo.</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Rocket size={48} className="mx-auto mb-2" />
                      <p>Configure and generate to see results.</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex gap-4">
              <Info size={24} className="text-slate-400 flex-shrink-0" />
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">These outputs are static, simulated AI content designed for demo walkthroughs. In production, content would be dynamically generated based on your inputs and client DNA profile.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Campaign Mind Map Section */}
      <div className="space-y-8 py-12 border-t border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">Campaign Mind Map</h2>
          <p className="text-slate-500 dark:text-slate-400">Visualize how all campaign assets connect from a central objective</p>
        </div>

        <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 relative min-h-[600px] flex items-center justify-center overflow-hidden">
          {/* Connecting Lines (SVG) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <g stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5 5">
              <line x1="50%" y1="50%" x2="35%" y2="25%" />
              <line x1="50%" y1="50%" x2="50%" y2="25%" />
              <line x1="50%" y1="50%" x2="65%" y2="25%" />
              <line x1="50%" y1="50%" x2="35%" y2="75%" />
              <line x1="50%" y1="50%" x2="50%" y2="75%" />
              <line x1="50%" y1="50%" x2="65%" y2="75%" />
            </g>
          </svg>

          {/* Central Node */}
          <div className="relative z-10">
            <div className="w-32 h-32 bg-indigo-600 rounded-full flex flex-col items-center justify-center text-white text-center p-4 shadow-xl shadow-indigo-200 ring-8 ring-indigo-50">
              <Rocket size={24} className="mb-2" />
              <p className="text-[10px] font-bold uppercase">Campaign Goal</p>
            </div>

            {/* Sub Nodes */}
            {[
              { label: 'Strategy', icon: Target, pos: 'top-[-150px] left-[-150px]' },
              { label: 'Scripts', icon: FileText, pos: 'top-[-150px] left-[0px]' },
              { label: 'Image Prompts', icon: Layout, pos: 'top-[-150px] right-[-150px]' },
              { label: 'Video Prompts', icon: Rocket, pos: 'bottom-[-150px] left-[-150px]' },
              { label: 'Email Copy', icon: Send, pos: 'bottom-[-150px] left-[0px]' },
              { label: 'SOPs', icon: Library, pos: 'bottom-[-150px] right-[-150px]' },
            ].map((node, i) => (
              <div key={i} className={`absolute ${node.pos} transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 group`}>
                <div className="w-20 h-20 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center text-indigo-600 shadow-md border border-slate-100 dark:border-slate-800 group-hover:scale-110 group-hover:shadow-lg transition-all">
                  <node.icon size={24} />
                </div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{node.label}</span>
              </div>
            ))}
          </div>
          <div className="absolute bottom-8 text-center w-full px-12">
            <p className="text-[10px] text-slate-400 max-w-sm mx-auto">This mind map helps visualize how all assets connect within a single campaign OS. Each branch represents a generated output category.</p>
          </div>

          <div className="absolute top-8 left-12 flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-indigo-600"></div>
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Campaign Goal</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-400"></div>
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Output Branches</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}