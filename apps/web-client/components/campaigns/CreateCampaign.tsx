'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { dnaApi, campaignApi } from '@/lib/api/client';
import { ClientDNA } from '@/types/dna';

export function CreateCampaign() {
  const router = useRouter();
  const [clients, setClients] = useState<ClientDNA[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    objective: '',
    clientDnaId: '',
    platforms: [] as string[],
    dateRange: {
      start: '',
      end: '',
    },
  });

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      const data = await dnaApi.getAll();
      setClients(data);
    } catch (error) {
      console.error('Error loading clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const platformOptions = [
    { id: 'meta', name: 'Meta (Facebook & Instagram)', icon: '📘' },
    { id: 'linkedin', name: 'LinkedIn', icon: '💼' },
    { id: 'youtube', name: 'YouTube', icon: '▶️' },
    { id: 'google', name: 'Google Ads', icon: '🔍' },
    { id: 'twitter', name: 'Twitter/X', icon: '🐦' },
    { id: 'tiktok', name: 'TikTok', icon: '🎵' },
  ];

  const togglePlatform = (platformId: string) => {
    setFormData((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platformId)
        ? prev.platforms.filter((p) => p !== platformId)
        : [...prev.platforms, platformId],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.objective || !formData.clientDnaId) {
      alert('Please fill all required fields');
      return;
    }

    if (formData.platforms.length === 0) {
      alert('Please select at least one platform');
      return;
    }

    setSubmitting(true);
    try {
      const campaign = await campaignApi.create(formData);
      console.log('✅ Campaign Created:', campaign);
      alert('Campaign created successfully!');
      router.push('/campaigns');
    } catch (error) {
      console.error('Error creating campaign:', error);
      alert('Error creating campaign. Check console.');
    } finally {
      setSubmitting(false);
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

  if (clients.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm p-12 text-center">
            <div className="text-6xl mb-4">🧬</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No Client DNA Found
            </h2>
            <p className="text-gray-600 mb-6">
              You need to create a Client DNA profile before creating campaigns
            </p>
            <Button onClick={() => router.push('/clients/new')}>
              Create Client DNA First
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button variant="outline" onClick={() => router.push('/campaigns')}>
            ← Back to Campaigns
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Create New Campaign
          </h1>
          <p className="text-gray-600">
            Build an AI-powered marketing campaign
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8">
          <div className="space-y-6">
            {/* Campaign Name */}
            <Input
              label="Campaign Name *"
              placeholder="e.g., Q1 2025 Brand Awareness"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              required
            />

            {/* Select Client DNA */}
            <Select
              label="Client *"
              value={formData.clientDnaId}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, clientDnaId: e.target.value }))
              }
              options={clients.map((client) => ({
                value: client.id!,
                label: `${client.clientName} (${client.industry})`,
              }))}
              required
            />

            {/* Objective */}
            <Select
              label="Campaign Objective *"
              value={formData.objective}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, objective: e.target.value }))
              }
              options={[
                { value: 'awareness', label: 'Brand Awareness' },
                { value: 'engagement', label: 'Engagement' },
                { value: 'conversion', label: 'Conversions' },
                { value: 'leads', label: 'Lead Generation' },
              ]}
              required
            />

            {/* Platforms */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Platforms *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {platformOptions.map((platform) => (
                  <button
                    key={platform.id}
                    type="button"
                    onClick={() => togglePlatform(platform.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      formData.platforms.includes(platform.id)
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-3xl mb-1">{platform.icon}</div>
                    <div className="text-sm font-medium text-gray-900">
                      {platform.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Date Range */}
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Start Date *"
                type="date"
                value={formData.dateRange.start}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    dateRange: { ...prev.dateRange, start: e.target.value },
                  }))
                }
                required
              />
              <Input
                label="End Date *"
                type="date"
                value={formData.dateRange.end}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    dateRange: { ...prev.dateRange, end: e.target.value },
                  }))
                }
                required
              />
            </div>

            {/* Info Box */}
            {formData.objective && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="text-2xl mr-3">💡</div>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">
                      AI-Powered Content Pillars
                    </h4>
                    <p className="text-sm text-blue-800">
                      Our AI will automatically generate content pillars based on your{' '}
                      <strong>{formData.objective}</strong> objective and selected
                      platforms
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="mt-8 pt-6 border-t">
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={submitting}
            >
              {submitting ? 'Creating Campaign...' : 'Create Campaign'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}