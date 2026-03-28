"use client";

import React, { useState } from 'react';
import { billingApi } from '@/lib/api/client';
import { CreditCard, Receipt, TrendingUp, Download, CheckCircle2 } from 'lucide-react';

export default function BillingDashboard() {
    const [generating, setGenerating] = useState(false);
    const [invoices, setInvoices] = useState<any[]>([]);

    const handleGenerateInvoice = async () => {
        setGenerating(true);
        try {
            const res = await billingApi.invoice({ 
                clientId: 'demo-client-123',
                metrics: {
                    assetsGenerated: Math.floor(Math.random() * 50) + 10,
                    campaignsLaunched: 2,
                    revisions: Math.floor(Math.random() * 15)
                }
            });
            // API returns { node, invoice: {...} } — safely extract invoice or use whole res
            const invoiceData = res?.invoice ?? res?.data ?? res ?? {};
            setInvoices(prev => [invoiceData, ...prev]);
        } catch (err) {
            console.error(err);
        } finally {
            setGenerating(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full animate-in fade-in duration-500 space-y-8">
            <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-heading text-slate-900 dark:text-white flex items-center gap-3">
                        <CreditCard className="text-indigo-500" size={32} />
                        Billing Manager
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2">Real-time cost processing and automated invoicing.</p>
                </div>
                <button 
                    onClick={handleGenerateInvoice}
                    disabled={generating}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 transition-colors disabled:opacity-50"
                >
                    <Receipt size={18} /> {generating ? 'Processing...' : 'Run Billing Cycle'}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 mb-2 font-bold text-sm">
                        <TrendingUp size={16} className="text-indigo-500" /> Current Month Spend
                    </div>
                    <div className="text-3xl font-bold text-slate-900 dark:text-white">$2,450.00</div>
                    <div className="text-xs text-green-500 font-bold mt-2">+12% vs last month</div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 mb-2 font-bold text-sm">
                        <CheckCircle2 size={16} className="text-emerald-500" /> Active Subscriptions
                    </div>
                    <div className="text-3xl font-bold text-slate-900 dark:text-white">Agency Pro</div>
                    <div className="text-xs text-slate-400 font-medium mt-2">Renews Oct 1st</div>
                </div>
                <div className="bg-gradient-to-br from-slate-900 to-indigo-900 p-6 rounded-2xl shadow-lg relative overflow-hidden text-white">
                    <CreditCard className="absolute right-[-20px] bottom-[-20px] opacity-10" size={120} />
                    <div className="text-indigo-200 mb-2 font-bold text-sm">Payment Method</div>
                    <div className="text-xl font-mono tracking-widest mt-4 mb-2">**** **** **** 4242</div>
                    <div className="text-xs text-indigo-200 font-medium uppercase">Visa ending in 4242</div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden mt-8">
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50">
                    <h3 className="font-bold text-slate-900 dark:text-white">Recent Invoices (System Logs)</h3>
                </div>
                {invoices.length === 0 ? (
                    <div className="p-12 text-center text-slate-400">
                        <Receipt size={32} className="mx-auto mb-3 opacity-20" />
                        <p>No billing cycles run yet. Click "Run Billing Cycle" to simulate billing transactions.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-100">
                        {invoices.map((inv, i) => (
                            <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:bg-slate-950 transition-colors animate-in slide-in-from-top-2">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center font-bold">
                                        <Receipt size={20} />
                                    </div>
                                    <div>
                                        <div className="font-bold text-sm text-slate-900 dark:text-white">Invoice #{inv.transactionId?.split('-')[0] || 'INV-100'}</div>
                                        <div className="text-xs text-slate-500 dark:text-slate-400">System Trigger: Billing Processing</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="text-right">
                                        <div className="font-bold text-slate-900 dark:text-white">${inv.amount?.toFixed(2) || '450.00'}</div>
                                        <div className="text-xs text-emerald-500 font-bold bg-emerald-50 px-2 py-0.5 rounded">PAID</div>
                                    </div>
                                    <button className="text-slate-400 hover:text-indigo-600 transition-colors">
                                        <Download size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
