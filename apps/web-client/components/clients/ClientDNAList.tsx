'use client';

import { useEffect, useState } from 'react';
import { dnaApi } from '@/lib/api/client';
import { ClientDNA } from '@/types/dna';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function ClientDNAList() {
  const [clients, setClients] = useState<ClientDNA[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      setLoading(true);
      const data = await dnaApi.getAll();
      setClients(data);
      setError(null);
    } catch (err) {
      setError('Failed to load clients');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this client DNA?')) {
      return;
    }

    try {
      await dnaApi.delete(id);
      await loadClients(); // Reload list
      alert('Client DNA deleted successfully');
    } catch (err) {
      alert('Failed to delete client DNA');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading clients...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 text-xl mb-4">{error}</p>
          <Button onClick={loadClients}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Client DNA Library</h1>
            <p className="text-gray-600 mt-1">
              {clients.length} {clients.length === 1 ? 'client' : 'clients'} in your database
            </p>
          </div>
          <Link href="/clients/new">
            <Button size="lg">+ New Client DNA</Button>
          </Link>
        </div>

        {/* Empty State */}
        {clients.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm p-12 text-center">
            <div className="text-6xl mb-4">🧬</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              No Client DNA Yet
            </h2>
            <p className="text-gray-600 mb-6">
              Create your first client DNA profile to get started
            </p>
            <Link href="/clients/new">
              <Button size="lg">Create First Client DNA</Button>
            </Link>
          </div>
        ) : (
          /* Client Grid */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clients.map((client) => (
              <div
                key={client.id}
                className="bg-white dark:bg-slate-900 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-200"
              >
                {/* Client Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {client.clientName}
                    </h3>
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                      {client.industry}
                    </span>
                  </div>
                  <div className="text-gray-400 text-sm">
                    v{client.version}
                  </div>
                </div>

                {/* Client Details */}
                <div className="space-y-3 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                      Tone
                    </p>
                    <p className="text-sm text-gray-900">{client.brandTone}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                      Location
                    </p>
                    <p className="text-sm text-gray-900">
                      {client.geography.city && `${client.geography.city}, `}
                      {client.geography.country}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                      Target Audience
                    </p>
                    <p className="text-sm text-gray-900">
                      {client.targetAudience.gender}, {client.targetAudience.ageRange}
                    </p>
                  </div>
                </div>

                {/* Metadata */}
                <div className="border-t pt-4 mb-4">
                  <p className="text-xs text-gray-500">
                    Created: {new Date(client.createdAt!).toLocaleDateString()}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link href={`/clients/${client.id}`} className="flex-1">
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </Link>
                  <Button
                    variant="secondary"
                    onClick={() => handleDelete(client.id!)}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}