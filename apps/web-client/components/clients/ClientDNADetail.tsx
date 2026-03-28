'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { dnaApi } from '@/lib/api/client';
import { ClientDNA } from '@/types/dna';
import { Button } from '@/components/ui/button';

interface ClientDNADetailProps {
  id: string;
}

export function ClientDNADetail({ id }: ClientDNADetailProps) {
  const router = useRouter();
  const [client, setClient] = useState<ClientDNA | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadClient();
  }, [id]);

  const loadClient = async () => {
    try {
      const data = await dnaApi.getOne(id);
      setClient(data);
    } catch (err) {
      console.error(err);
      alert('Failed to load client');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-red-600">Client not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Button variant="outline" onClick={() => router.push('/dashboard')}>
            ← Back to Dashboard
          </Button>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8">
          {/* Title */}
          <div className="flex items-start justify-between mb-8 pb-6 border-b">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {client.clientName}
              </h1>
              <div className="flex gap-3">
                <span className="px-4 py-1 bg-blue-100 text-blue-800 font-medium rounded-full">
                  {client.industry}
                </span>
                <span className="px-4 py-1 bg-gray-100 text-gray-800 font-medium rounded-full">
                  Version {client.version}
                </span>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Basic Info */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Brand Information
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">
                    Brand Tone
                  </p>
                  <p className="text-lg text-gray-900">{client.brandTone}</p>
                </div>
              </div>
            </div>

            {/* Geography */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Geographic Information
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">
                    Location
                  </p>
                  <p className="text-lg text-gray-900">
                    {client.geography.city && `${client.geography.city}, `}
                    {client.geography.state && `${client.geography.state}, `}
                    {client.geography.country}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Area Type: {client.geography.urbanRural}
                  </p>
                </div>
              </div>
            </div>

            {/* Target Audience */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Target Audience
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">
                    Demographics
                  </p>
                  <p className="text-lg text-gray-900">
                    {client.targetAudience.gender}, Age {client.targetAudience.ageRange}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">
                    Interests
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {client.targetAudience.interests?.map((interest, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">
                    Pain Points
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {client.targetAudience.painPoints?.map((pain, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full"
                      >
                        {pain}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Psychographics */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Psychographics
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">
                    Core Values
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {client.psychographics.values?.map((value, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full"
                      >
                        {value}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">
                    Lifestyle
                  </p>
                  <p className="text-lg text-gray-900">{client.psychographics.lifestyle}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">
                    Buying Behavior
                  </p>
                  <p className="text-lg text-gray-900">
                    {client.psychographics.buyingBehavior}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div className="mt-8 pt-6 border-t">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Created</p>
                <p className="text-gray-900 font-medium">
                  {new Date(client.createdAt!).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Last Updated</p>
                <p className="text-gray-900 font-medium">
                  {new Date(client.updatedAt!).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}