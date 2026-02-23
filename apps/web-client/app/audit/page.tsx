"use client";

import React, { useState, useEffect } from 'react';
import { ShieldAlert, Activity, Shield, Terminal } from 'lucide-react';

export default function AuditLogs() {
    const [logs, setLogs] = useState<any[]>([]);

    useEffect(() => {
        // Mock system logs representing the API gateway interceptor
        setLogs([
            { id: 1, action: 'WRITE', endpoint: '/api/dna', user: 'ADMIN', status: 201, time: new Date(Date.now() - 1000 * 60 * 5) },
            { id: 2, action: 'READ', endpoint: '/api/campaigns', user: 'AGENCY', status: 200, time: new Date(Date.now() - 1000 * 60 * 15) },
            { id: 3, action: 'WRITE', endpoint: '/api/approval/request', user: 'AGENCY', status: 201, time: new Date(Date.now() - 1000 * 60 * 22) },
            { id: 4, action: 'WRITE', endpoint: '/api/billing/invoice', user: 'SYSTEM', status: 201, time: new Date(Date.now() - 1000 * 60 * 22) },
            { id: 5, action: 'DELETE', endpoint: '/api/dna/demo-123', user: 'CLIENT', status: 403, time: new Date(Date.now() - 1000 * 60 * 45) },
            { id: 6, action: 'READ', endpoint: '/api/knowledge', user: 'ADMIN', status: 200, time: new Date(Date.now() - 1000 * 60 * 60) },
        ]);
    }, []);

    const getStatusColor = (status: number) => {
        if (status >= 200 && status < 300) return 'text-green-500 bg-green-50';
        if (status >= 400 && status < 500) return 'text-amber-500 bg-amber-50';
        return 'text-red-500 bg-red-50';
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full animate-in fade-in duration-500 space-y-8">
            <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-heading text-slate-900 flex items-center gap-3">
                        <ShieldAlert className="text-rose-500" size={32} />
                        Audit Control
                    </h1>
                    <p className="text-slate-500 mt-2">Global system observability, RBAC logging, and security tracking.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-50 text-green-500 rounded-xl flex items-center justify-center font-bold">
                        <Activity size={24} />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-slate-900">4,120</div>
                        <div className="text-xs font-bold text-slate-500 uppercase">Requests (24h)</div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center font-bold">
                        <Shield size={24} />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-slate-900">12</div>
                        <div className="text-xs font-bold text-slate-500 uppercase">Blocked Actions</div>
                    </div>
                </div>
                <div className="md:col-span-2 bg-slate-900 p-6 rounded-2xl shadow-lg border border-slate-800 flex items-center gap-4 text-white">
                    <div className="w-12 h-12 bg-slate-800 text-slate-300 rounded-xl flex items-center justify-center font-bold">
                        <Terminal size={24} />
                    </div>
                    <div>
                        <div className="text-lg font-bold">Audit Interceptor Active</div>
                        <div className="text-xs text-slate-400 font-mono mt-1">Global Prefix: /api/* • All requests logged</div>
                    </div>
                </div>
            </div>

            <div className="bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden">
                <div className="p-4 bg-slate-50 border-b border-slate-100 font-bold text-slate-700 text-sm">
                    Live System Trace Log
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-white border-b border-slate-100 text-xs uppercase text-slate-500 font-bold">
                            <tr>
                                <th className="px-6 py-4">Timestamp</th>
                                <th className="px-6 py-4">Action</th>
                                <th className="px-6 py-4">Endpoint Tracker</th>
                                <th className="px-6 py-4">Actor (Role)</th>
                                <th className="px-6 py-4">Network Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {logs.map((log) => (
                                <tr key={log.id} className="hover:bg-slate-50 transition-colors pointer-events-none">
                                    <td className="px-6 py-4 text-slate-500 font-mono text-xs">
                                        {log.time.toISOString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`font-bold px-2 py-1 rounded text-[10px] ${log.action === 'WRITE' ? 'bg-indigo-100 text-indigo-700' : log.action === 'DELETE' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-700'}`}>
                                            {log.action}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-slate-700">
                                        {log.endpoint}
                                    </td>
                                    <td className="px-6 py-4 font-bold text-slate-600">
                                        {log.user}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`font-mono text-xs px-2 py-1 rounded-md font-bold ${getStatusColor(log.status)}`}>
                                            HTTP {log.status}
                                        </span>
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
