
"use client";

import React from 'react';
import Link from 'next/link';
import {
  Rocket,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Layout,
  BarChart3,
  CloudLightning as Sparkles,
  ArrowRight,
  Plus
} from 'lucide-react';

export default function Landing() {
  return (
    <div className="space-y-32">
      {/* Hero Section */}
      <section className="pt-20 text-center px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-[#0061FF] px-4 py-2 rounded-full text-sm font-bold animate-bounce">
            <Zap size={16} /> Optimize Campaigns by 30%
          </div>
          <h1 className="text-5xl md:text-7xl font-bold font-heading text-slate-900 leading-[1.1]">
            Streamline Marketing Operations with a <span className="text-[#0061FF]">Smart Dashboard</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Manage clients, generate creative briefs, and optimize campaigns—all from one intuitive AI-powered dashboard.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/dashboard"
              className="bg-[#0061FF] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 w-full sm:w-auto inline-block"
            >
              Get Started
            </Link>
            <button className="bg-white border border-slate-200 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all w-full sm:w-auto">
              Get a Demo
            </button>
          </div>
          <div className="pt-8 flex flex-col items-center gap-4">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Works with:</p>
            <div className="flex gap-8 items-center opacity-40 grayscale">
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Facebook_Logo.png" className="h-6" alt="FB" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/e/e9/Instagram_logo_2016.svg" className="h-6" alt="IG" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" className="h-6" alt="LI" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Google_Ads_logo.svg" className="h-6" alt="Ads" />
            </div>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="mt-20 max-w-6xl mx-auto relative px-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-4 transform hover:scale-[1.01] transition-transform duration-500">
            <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80" alt="Dashboard Preview" className="rounded-2xl w-full" />
            <div className="absolute -bottom-10 -right-10 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 hidden lg:block">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-green-100 p-2 rounded-lg text-green-600"><Zap size={20} /></div>
                <div>
                  <p className="text-xs font-bold text-slate-400">AI OPTIMIZATION</p>
                  <p className="text-sm font-bold text-slate-900">Campaign Ready</p>
                </div>
              </div>
              <div className="w-48 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="w-4/5 h-full bg-green-500"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-12 text-center border-y border-slate-100 py-16">
        {[
          { label: 'More direct conversions', val: '+30%' },
          { label: 'Client satisfaction rate', val: '98%' },
          { label: 'Monthly ad volume', val: '5M+' },
          { label: 'Revenue insights tracked', val: '50B' },
        ].map((stat, i) => (
          <div key={i} className="space-y-1">
            <p className="text-4xl font-bold text-slate-900">{stat.val}</p>
            <p className="text-sm text-slate-400 font-medium">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Advantage Grid */}
      <section className="max-w-7xl mx-auto px-4 space-y-20">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-slate-900">The CreativeOS Advantage</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">Optimize campaigns, enhance client experiences, and boost ROI with our all-in-one marketing platform.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Centralized Control Panel', desc: 'Manage clients, budgets, and creative assets efficiently in one workspace.', icon: Layout },
            { title: 'Advanced AI Analytics', desc: 'Get deep insights into campaign performance, audience trends, and ROI.', icon: BarChart3 },
            { title: 'Secure Client Data Management', desc: 'Protect sensitive client DNA with high-grade encryption and access control.', icon: ShieldCheck },
          ].map((item, i) => (
            <div key={i} className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="bg-blue-50 text-[#0061FF] w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <item.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Alternating Feature Sections */}
      <section className="space-y-40 overflow-hidden">
        {/* Feature 1 */}
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div className="bg-blue-50 text-[#0061FF] w-10 h-10 rounded-lg flex items-center justify-center"><Sparkles size={20} /></div>
            <h2 className="text-4xl font-bold text-slate-900 leading-tight">Optimize Staff Productivity & Performance with Insights</h2>
            <p className="text-slate-500 leading-relaxed">Easily track work hours, completed tasks, and campaign progress in real-time to optimize efficiency, accountability, and seamless team operations.</p>
            <button className="bg-[#0061FF] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all">Learn More <ArrowRight size={18} /></button>
          </div>
          <div className="relative">
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 transform rotate-2">
              <div className="flex justify-between items-center mb-8">
                <h4 className="font-bold text-slate-900">Team Status</h4>
                <button className="p-2 bg-slate-50 rounded-lg"><Plus size={16} /></button>
              </div>
              <div className="space-y-4">
                {[
                  { name: 'Eleanor Pena', task: 'Ad Copy', progress: 82, color: 'bg-[#0061FF]' },
                  { name: 'Robert Fox', task: 'Creative Assets', progress: 45, color: 'bg-purple-500' },
                  { name: 'Jane Cooper', task: 'Client DNA', progress: 100, color: 'bg-green-500' },
                ].map((u, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100"></div>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between text-xs font-bold">
                        <span>{u.name}</span>
                        <span>{u.progress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full ${u.color}`} style={{ width: `${u.progress}%` }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 transform -rotate-2">
              <div className="space-y-6">
                <h4 className="font-bold text-slate-900">Campaign Timeline</h4>
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center gap-4 p-4 border border-slate-100 rounded-xl">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <div className="text-sm font-medium text-slate-600">Generated Ad Set #{i}</div>
                      <div className="ml-auto text-xs font-bold text-slate-400">10:45 AM</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-8 order-1 lg:order-2">
            <div className="bg-blue-50 text-[#0061FF] w-10 h-10 rounded-lg flex items-center justify-center"><CheckCircle2 size={20} /></div>
            <h2 className="text-4xl font-bold text-slate-900 leading-tight">Effortless Seamless Client DNA Management</h2>
            <p className="text-slate-500 leading-relaxed">Effortlessly capture client brand voices, goals, and audiences with an intuitive system that reduces onboarding friction and improves asset relevancy.</p>
            <button className="bg-[#0061FF] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all">Explore DNA <ArrowRight size={18} /></button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-slate-50 py-32 px-4">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-slate-900">What Marketers Say About CreativeOS</h2>
            <p className="text-slate-500">See how CreativeOS helps teams streamline operations and enhance client results.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Sophia Ramirez', role: 'CEO Azure Bay Resort', quote: 'Since implementing CreativeOS, we\'ve seen a noticeable improvement in team productivity.' },
              { name: 'Daniel Chandra', role: 'Director Palm Heights', quote: 'CreativeOS made it easy for our staff to stay on top of ad copy, guest needs, and client DNA.' },
              { name: 'Lena Wong', role: 'CEO MonoStay Suites', quote: 'CreativeOS helped us cut onboarding times by 40% and improved internal communication.' },
              { name: 'Isabelle Laurent', role: 'CEO Emerald Hotel', quote: 'The platform integrates perfectly with our guest-first philosophy. It\'s clean, fast, and reliable.' },
              { name: 'Albert Flores', role: 'Owner Grand Hotel', quote: 'CreativeOS is a game changer for our agency operations. Highly recommended.' },
              { name: 'Amara Yusuf', role: 'Owner The Willow & Ivy', quote: 'As a boutique marketing agency, personalization is everything. CreativeOS gives us the tools.' },
              { name: 'Gianni Ferretti', role: 'Director Vistaline Hotels', quote: 'CreativeOS has scaled perfectly across our multiple properties. It is intuitive and reliable.' },
              { name: 'Luca Romano', role: 'CEO Ocean Dune Resort', quote: 'Managing a large team means juggling a lot. CreativeOS keeps everything organized.' },
            ].map((t, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{t.name}</p>
                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">{t.role}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed italic">"{t.quote}"</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button className="bg-[#0061FF] text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-all">Load More Reviews</button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-7xl mx-auto px-4 pb-32">
        <div className="bg-[#0061FF] rounded-3xl p-12 lg:p-20 text-center text-white space-y-8 relative overflow-hidden shadow-2xl shadow-blue-300">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full -ml-48 -mb-48 blur-3xl"></div>

          <h2 className="text-4xl lg:text-5xl font-bold font-heading relative z-10">Transform the Way You Run Operations</h2>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto relative z-10">Streamline every aspect of your business with powerful tools built for performance, clarity, and growth.</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <Link
              href="/dashboard"
              className="bg-white text-[#0061FF] px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all w-full sm:w-auto shadow-lg inline-block"
            >
              Start Free Trial
            </Link>
            <button className="bg-[#0061FF] border border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all w-full sm:w-auto">
              Book Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}