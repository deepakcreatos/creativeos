
"use client";

import React from 'react';
import Link from 'next/link';
import {
  Plus,
  ExternalLink,
  Zap,
  ShieldCheck,
  Dna,
  Rocket,
  Calendar,
  BarChart3,
  ChevronRight,
  Cloud,
  Share2,
  Users,
  Eye,
  MousePointer2
} from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-in fade-in duration-500">
      {/* Welcome Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading text-slate-900">Workspace Overview</h1>
          <p className="text-slate-500">Welcome back, Admin. Here's what's happening today.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-slate-200 text-slate-900 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-50 shadow-sm">Export Data</button>
          <Link
            href="/campaigns"
            className="bg-[#0061FF] text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-700 shadow-lg shadow-blue-200 inline-flex items-center gap-2"
          >
            + New Campaign
          </Link>
        </div>
      </div>

      {/* Grid: Daily Operations & Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Daily Operations Card */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm p-8 space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-900">Daily Operations</h2>
            <span className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">5 Critical Tasks</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { label: 'Active Clients', count: 12, sub: '+2 this month', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Pending Briefs', count: 4, sub: 'Due today', icon: Dna, color: 'text-purple-600', bg: 'bg-purple-50' },
              { label: 'Campaigns', count: 8, sub: 'Active now', icon: Rocket, color: 'text-green-600', bg: 'bg-green-50' },
            ].map((stat, i) => (
              <div key={i} className={`${stat.bg} p-6 rounded-2xl space-y-2`}>
                <div className={`${stat.color} mb-2`}><stat.icon size={20} /></div>
                <p className="text-3xl font-bold text-slate-900">{stat.count}</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                <p className="text-[10px] text-slate-500">{stat.sub}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Performance Over Time</h3>
            <div className="h-48 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center italic text-slate-400">
              [Performance Graph Visualization]
            </div>
          </div>
        </div>

        {/* Insights/Quick Actions */}
        <div className="space-y-8">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 text-[#0061FF] p-2 rounded-lg"><Zap size={20} /></div>
              <h2 className="text-lg font-bold text-slate-900">AI Insights</h2>
            </div>
            <div className="space-y-4">
              {[
                { type: 'Optimization', text: 'Increase budget on Meta ad set #42. It has 3.4x ROI.' },
                { type: 'Alert', text: 'Client DNA for "Squadra" is incomplete. Update to improve results.' },
              ].map((insight, i) => (
                <div key={i} className="p-4 border border-slate-50 rounded-xl bg-slate-50/50 space-y-1">
                  <span className="text-[10px] font-bold text-[#0061FF] uppercase">{insight.type}</span>
                  <p className="text-xs text-slate-600 leading-relaxed">{insight.text}</p>
                </div>
              ))}
            </div>
            <button className="w-full text-xs font-bold text-[#0061FF] hover:underline">View All Insights →</button>
          </div>

          <div className="bg-[#0061FF] rounded-3xl p-8 text-white space-y-4 relative overflow-hidden shadow-xl shadow-blue-200">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            <h3 className="text-lg font-bold">Pro Features</h3>
            <p className="text-blue-100 text-xs leading-relaxed">Unlock advanced reporting, unlimited team members, and white-labeled client dashboards.</p>
            <button className="bg-white text-[#0061FF] px-4 py-2 rounded-lg font-bold text-xs">Upgrade Now</button>
          </div>
        </div>
      </div>

      {/* Campaign Status Table */}
      <div className="space-y-6">
        <div className="flex justify-between items-center px-4">
          <h2 className="text-xl font-bold text-slate-900">Active Campaign Status</h2>
          <Link href="/campaigns" className="text-[#0061FF] text-sm font-bold hover:underline">View All</Link>
        </div>
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-100 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
              <tr>
                <th className="px-8 py-4">Campaign</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4">Reach</th>
                <th className="px-8 py-4">Efficiency</th>
                <th className="px-8 py-4">Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-600 font-medium">
              {[
                { name: 'Squadra Spring Launch', status: 'Running', reach: '42K', eff: '92%', progress: 65, color: 'bg-blue-500' },
                { name: 'EcoStay Retargeting', status: 'Draft', reach: '0', eff: '-', progress: 12, color: 'bg-slate-300' },
                { name: 'Vistaline Q2 Promo', status: 'Paused', reach: '124K', eff: '84%', progress: 100, color: 'bg-green-500' },
              ].map((c, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors cursor-pointer group">
                  <td className="px-8 py-6">
                    <p className="font-bold text-slate-900 group-hover:text-[#0061FF] transition-colors">{c.name}</p>
                    <p className="text-xs text-slate-400">ID: CAM-00{i + 1}</p>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${c.status === 'Running' ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-400'}`}>{c.status}</span>
                  </td>
                  <td className="px-8 py-6">{c.reach}</td>
                  <td className="px-8 py-6">{c.eff}</td>
                  <td className="px-8 py-6">
                    <div className="w-32 space-y-1.5">
                      <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                        <span>Progress</span>
                        <span>{c.progress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full ${c.color}`} style={{ width: `${c.progress}%` }}></div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}