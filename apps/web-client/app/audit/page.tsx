"use client";

import React, { useState, useEffect } from 'react';
import { useWorkspace } from '@/lib/workspace/WorkspaceContext';
import { ShieldAlert, Activity, Shield, Terminal, AlertCircle } from 'lucide-react';

export default function AuditLogs() {
    const { activeClient } = useWorkspace();
    const [logs, setLogs] = useState<any[]>([]);

    useEffect(() => {
        // Mock system logs representing the API gateway interceptor. Respects active client context.
        const baseEndpoint = activeClient ? `/api/${activeClient.id}` : '/api';
        
        setLogs([
            { id: 1, action: 'WRITE', endpoint: `${baseEndpoint}/dna`, user: 'ADMIN', status: 201, time: new Date(Date.now() - 1000 * 60 * 5) },
            { id: 2, action: 'READ', endpoint: `${baseEndpoint}/campaigns`, user: 'AGENCY', status: 200, time: new Date(Date.now() - 1000 * 60 * 15) },
            { id: 3, action: 'WRITE', endpoint: `${baseEndpoint}/approval/request`, user: 'AGENCY', status: 201, time: new Date(Date.now() - 1000 * 60 * 22) },
            { id: 4, action: 'WRITE', endpoint: `/api/billing/invoice`, user: 'SYSTEM', status: 201, time: new Date(Date.now() - 1000 * 60 * 22) },
            { id: 5, action: 'DELETE', endpoint: `${baseEndpoint}/dna/demo-123`, user: 'CLIENT', status: 403, time: new Date(Date.now() - 1000 * 60 * 45) },
            { id: 6, action: 'READ', endpoint: `/api/knowledge`, user: 'ADMIN', status: 200, time: new Date(Date.now() - 1000 * 60 * 60) },
        ]);
    }, [activeClient]);

    const getStatusColor = (status: number) => {
        if (status >= 200 && status < 300) return 'text-green-500 bg-green-50';
        if (status >= 400 && status < 500) return 'text-amber-500 bg-amber-50';
        return 'text-red-500 bg-red-50';
    };

    return (
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500 space-y-8 min-h-screen">
            <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-heading text-slate-900 dark:text-white flex items-center gap-3">
                        <ShieldAlert className="text-rose-500" size={32} />
                        Audit Control
                        {activeClient && (
                            <span className="bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 text-xs px-2 py-1 rounded-md border border-rose-200 dark:border-rose-800 ml-2">
                                {activeClient.clientName}
                            </span>
                        )}
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2">
                        {activeClient ? `Isolated system observability, RBAC logging, and security tracking for ${activeClient.clientName}.` : 'Global workspace system observability, RBAC logging, and security tracking.'}
                    </p>
                    {!activeClient && (
                         <div className="mt-4 flex items-center gap-2 text-amber-600 dark:text-amber-500 text-xs font-bold bg-amber-50 dark:bg-amber-900/20 px-3 py-2 rounded-lg">
                             <AlertCircle size={16} />
                             No Client DNA selected. Viewing unsecured system-wide gateway traces across all tenants.
                         </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-50 text-green-500 rounded-xl flex items-center justify-center font-bold">
                        <Activity size={24} />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-slate-900 dark:text-white">4,120</div>
                        <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Requests (24h)</div>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center font-bold">
                        <Shield size={24} />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-slate-900 dark:text-white">12</div>
                        <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Blocked Actions</div>
                    </div>
                </div>
                <div className="md:col-span-2 bg-slate-900 p-6 rounded-2xl shadow-lg border border-slate-800 flex items-center gap-4 text-white">
                    <div className="w-12 h-12 bg-slate-800 text-slate-300 rounded-xl flex items-center justify-center font-bold">
                        <Terminal size={24} />
                    </div>
                    <div>
                        <div className="text-lg font-bold">Audit Interceptor Active</div>
                        <div className="text-xs text-slate-400 font-mono mt-1">
                            {activeClient ? `Tenant Prefix: /api/${activeClient.id}/* • Only logging active tenant` : `Global Prefix: /api/* • All requests logged`}
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm rounded-2xl overflow-hidden">
                <div className="p-4 bg-slate-50 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 font-bold text-slate-700 dark:text-slate-300 text-sm">
                    Live System Trace Log
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 text-xs uppercase text-slate-500 dark:text-slate-400 font-bold">
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
                                <tr key={log.id} className="hover:bg-slate-50 dark:bg-slate-950 transition-colors pointer-events-none">
                                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400 font-mono text-xs">
                                        {log.time.toISOString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`font-bold px-2 py-1 rounded text-[10px] ${log.action === 'WRITE' ? 'bg-indigo-100 text-indigo-700' : log.action === 'DELETE' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>
                                            {log.action}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-slate-700 dark:text-slate-300">
                                        {log.endpoint}
                                    </td>
                                    <td className="px-6 py-4 font-bold text-slate-600 dark:text-slate-400">
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
