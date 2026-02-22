
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Check, Info } from 'lucide-react';

export default function Pricing() {
    const [isYearly, setIsYearly] = useState(false);

    const plans = [
        {
            name: 'Basic Plan',
            desc: 'Simple tools for small teams.',
            price: isYearly ? '$22' : '$29',
            features: [
                'Manage up to 20 clients',
                'Basic ad copy generation',
                'Standard campaign templates',
                'Daily performance emails',
                'Email support',
            ],
            cta: 'Get Started',
            accent: 'border-slate-100',
            btn: 'bg-white border border-slate-200 text-slate-900',
            href: '/auth/register'
        },
        {
            name: 'Pro Plan',
            desc: 'Automation for growing agencies.',
            price: isYearly ? '$55' : '$69',
            features: [
                'Manage up to 100 clients',
                'AI Client DNA analysis',
                'Custom ad set generation',
                'Real-time analytics dashboard',
                'Automated scheduler',
                'Priority support',
            ],
            cta: 'Start Free Trial',
            popular: true,
            accent: 'border-[#0061FF] ring-4 ring-blue-50',
            btn: 'bg-[#0061FF] text-white',
            href: '/auth/register'
        },
        {
            name: 'Enterprise Plan',
            desc: 'Full control for large scale ops.',
            price: isYearly ? '$105' : '$129',
            features: [
                'Unlimited clients & assets',
                'Advanced financial insights',
                'Custom AI model training',
                'Third-party API integration',
                'Dedicated account manager',
                '24/7 priority support',
            ],
            cta: 'Contact Sales',
            accent: 'border-slate-100',
            btn: 'bg-white border border-slate-200 text-slate-900',
            href: '#'
        },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-20 animate-in fade-in duration-500 w-full">
            <div className="text-center space-y-4">
                <h1 className="text-5xl font-bold font-heading text-slate-900">Flexible Pricing Plans</h1>
                <p className="text-slate-500 max-w-2xl mx-auto text-lg">Choose the perfect plan for your business—whether you're just starting or managing multiple clients.</p>

                <div className="flex items-center justify-center gap-4 pt-8">
                    <span className={`text-sm font-bold ${!isYearly ? 'text-slate-900' : 'text-slate-400'}`}>Monthly Plan</span>
                    <button
                        onClick={() => setIsYearly(!isYearly)}
                        className="w-14 h-8 bg-[#0061FF] rounded-full relative p-1 transition-colors"
                    >
                        <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-all ${isYearly ? 'translate-x-6' : 'translate-x-0'}`}></div>
                    </button>
                    <div className="flex items-center gap-2">
                        <span className={`text-sm font-bold ${isYearly ? 'text-slate-900' : 'text-slate-400'}`}>Yearly Plan</span>
                        <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Save 20%</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {plans.map((plan, i) => (
                    <div key={i} className={`bg-white p-10 rounded-3xl border flex flex-col space-y-8 relative ${plan.accent}`}>
                        {plan.popular && (
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0061FF] text-white text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-widest shadow-lg">
                                Most Popular
                            </div>
                        )}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                            <p className="text-sm text-slate-500">{plan.desc}</p>
                            <div className="flex items-end gap-1">
                                <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                                <span className="text-slate-400 font-medium pb-1">/month</span>
                            </div>
                        </div>

                        <div className="space-y-4 flex-1">
                            {plan.features.map((f, j) => (
                                <div key={j} className="flex items-center gap-3 text-sm font-medium text-slate-600">
                                    <Check size={18} className="text-[#0061FF] flex-shrink-0" />
                                    {f}
                                </div>
                            ))}
                        </div>

                        <Link href={plan.href} className={`w-full py-4 rounded-xl font-bold text-sm transition-all hover:scale-[1.02] shadow-sm flex items-center justify-center ${plan.btn}`}>
                            {plan.cta}
                        </Link>
                    </div>
                ))}
            </div>

            <section className="max-w-4xl mx-auto pt-20">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl font-bold text-slate-900">Frequently Asked Questions</h2>
                </div>
                <div className="space-y-6">
                    {[
                        { q: 'What is CreativeOS?', a: 'CreativeOS is a marketing management platform designed to simplify operations, automate creative briefs, and provide real-time campaign insights.' },
                        { q: 'Does it support multiple clients?', a: 'Yes! CreativeOS lets you efficiently manage multiple client profiles with ease, ensuring brand consistency across all accounts.' },
                        { q: 'How does the Client DNA feature work?', a: 'The Client DNA feature captures brand voice, goals, and audience data to inform AI-driven content generation for highly relevant assets.' },
                    ].map((faq, i) => (
                        <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="bg-slate-50 p-2 rounded-lg text-slate-400"><Info size={18} /></div>
                                <h4 className="font-bold text-slate-900">{faq.q}</h4>
                            </div>
                            <p className="text-sm text-slate-500 leading-relaxed ml-11">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
