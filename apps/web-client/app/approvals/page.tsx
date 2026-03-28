"use client";

import React, { useState } from 'react';
import { approvalApi, revisionApi } from '@/lib/api/client';
import { CheckCircle2, MessageSquare, AlertCircle, Clock, Send } from 'lucide-react';

export default function ApprovalGatekeeper() {
    const [feedback, setFeedback] = useState('');
    const [processing, setProcessing] = useState(false);
    const [actionLog, setActionLog] = useState<any[]>([]);

    const handleApprove = async () => {
        setProcessing(true);
        try {
            const res = await approvalApi.request({ entityId: 'demo-asset-123', entityType: 'CONTENT_ASSET' });
            setActionLog(prev => [{ type: 'APPROVE', data: res.data, time: new Date() }, ...prev]);
        } catch (err) {
            console.error(err);
        } finally {
            setProcessing(false);
        }
    };

    const handleRevise = async () => {
        if (!feedback) return;
        setProcessing(true);
        try {
            const res = await revisionApi.process({ 
                entityId: 'demo-asset-123', 
                entityType: 'CONTENT_ASSET',
                feedbackString: feedback
            });
            setActionLog(prev => [{ type: 'REVISE', data: res.data, feedback, time: new Date() }, ...prev]);
            setFeedback('');
        } catch (err) {
            console.error(err);
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full animate-in fade-in duration-500 space-y-8">
            <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-heading text-slate-900 dark:text-white flex items-center gap-3">
                        <CheckCircle2 className="text-green-500" size={32} />
                        Approval Gatekeeper
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2">Review generated assets, request AI revisions, or lock for scheduling.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {/* Mock Asset under review */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Currently Reviewing</span>
                            <span className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-50 px-2 py-1 rounded-md">
                                <Clock size={14} /> PENDING CLIENT
                            </span>
                        </div>
                        <div className="p-8">
                            <div className="flex gap-6 items-start">
                                <div className="w-32 h-32 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center flex-shrink-0">
                                    <span className="text-slate-400 text-sm font-bold">Generated<br/>Image</span>
                                </div>
                                <div className="space-y-4 flex-1">
                                    <div>
                                        <h3 className="font-bold text-slate-900 dark:text-white">Winter Collection Launch #4</h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">Instagram Feed Post • Campaign: Holiday Q4</p>
                                    </div>
                                    <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl text-sm text-slate-700 dark:text-slate-300 italic border border-slate-100 dark:border-slate-800">
                                        "Discover the magic of winter with our new exclusive collection. Available now in stores and online. ❄️✨"
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-4">
                            <div className="space-y-3">
                                <textarea 
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    placeholder="Enter revision feedback for the AI (e.g., 'Make the tone more exciting')..."
                                    className="w-full text-sm p-3 border border-slate-200 dark:border-slate-800 rounded-lg h-24 resize-none focus:ring-2 focus:ring-accent/20 focus:outline-none"
                                />
                                <button 
                                    onClick={handleRevise}
                                    disabled={processing || !feedback}
                                    className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                                >
                                    <MessageSquare size={16} /> Request AI Revision
                                </button>
                            </div>
                            <div className="flex flex-col justify-end">
                                <button 
                                    onClick={handleApprove}
                                    disabled={processing}
                                    className="w-full py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-bold rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 h-10"
                                >
                                    <CheckCircle2 size={16} /> Approve & Lock Asset
                                </button>
                                <p className="text-[10px] text-center text-slate-400 mt-2">Approving this asset will cue it for the Scheduler and trigger a Billing event.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Audit / Action Log */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm h-full flex flex-col">
                        <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50">
                            <h3 className="font-bold text-slate-700 dark:text-slate-300">Action Stream</h3>
                        </div>
                        <div className="p-4 flex-1 space-y-4 max-h-[500px] overflow-y-auto">
                            {actionLog.length === 0 ? (
                                <div className="text-center text-slate-400 py-10">
                                    <AlertCircle size={24} className="mx-auto mb-2 opacity-50" />
                                    <p className="text-sm">No actions recorded yet.</p>
                                </div>
                            ) : (
                                actionLog.map((log, i) => (
                                    <div key={i} className={`p-3 rounded-lg border text-sm animate-in slide-in-from-left-2 ${log.type === 'APPROVE' ? 'bg-green-50 border-green-100' : 'bg-amber-50 border-amber-100'}`}>
                                        <div className="flex items-center gap-2 font-bold mb-1">
                                            {log.type === 'APPROVE' ? <CheckCircle2 size={14} className="text-green-600" /> : <MessageSquare size={14} className="text-amber-600" />}
                                            <span className={log.type === 'APPROVE' ? 'text-green-700' : 'text-amber-700'}>
                                                {log.type === 'APPROVE' ? 'Asset Approved' : 'Revision Triggered'}
                                            </span>
                                            <span className="text-[10px] text-slate-400 font-normal ml-auto">
                                                {log.time.toLocaleTimeString()}
                                            </span>
                                        </div>
                                        {log.type === 'REVISE' && (
                                            <p className="text-slate-600 dark:text-slate-400 text-xs mt-1 italic">"{log.feedback}"</p>
                                        )}
                                        <div className="mt-2 text-[10px] bg-white dark:bg-slate-900/50 p-2 rounded border border-white/50 font-mono text-slate-500 dark:text-slate-400 overflow-hidden">
                                            {JSON.stringify(log.data)}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
