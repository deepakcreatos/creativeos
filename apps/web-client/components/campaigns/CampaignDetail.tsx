'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { campaignApi } from '@/lib/api/client';
import { Campaign } from '@/types/campaign';
import { Button } from '@/components/ui/button';

interface CampaignDetailProps {
  id: string;
}

export function CampaignDetail({ id }: CampaignDetailProps) {
  const router = useRouter();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCampaign();
  }, [id]);

  const loadCampaign = async () => {
    try {
      const data = await campaignApi.getOne(id);
      setCampaign(data);
    } catch (error) {
      console.error('Error loading campaign:', error);
      alert('Campaign not found');
      router.push('/campaigns');
    } finally {
      setLoading(false);
    }
  };

  const getObjectiveInfo = (objective: string) => {
    const info = {
      awareness: {
        color: 'blue',
        icon: '📢',
        description: 'Build brand recognition and reach',
      },
      engagement: {
        color: 'green',
        icon: '💬',
        description: 'Foster interaction and community',
      },
      conversion: {
        color: 'purple',
        icon: '🎯',
        description: 'Drive sales and conversions',
      },
      leads: {
        color: 'orange',
        icon: '🔥',
        description: 'Generate qualified leads',
      },
    };
    return info[objective as keyof typeof info] || info.awareness;
  };

  const getPlatformIcon = (platform: string) => {
    const icons: Record<string, string> = {
      meta: '📘',
      linkedin: '💼',
      youtube: '▶️',
      google: '🔍',
      twitter: '🐦',
      tiktok: '🎵',
    };
    return icons[platform] || '📱';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!campaign) {
    return null;
  }

  const objectiveInfo = getObjectiveInfo(campaign.objective);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 dark:from-slate-950 dark:to-slate-900 w-full animate-in fade-in duration-500">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="outline" onClick={() => router.push('/campaigns')}>
            ← Back to Campaigns
          </Button>
        </div>

        {/* Campaign Header */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {campaign.name}
              </h1>
              <p className="text-lg text-gray-600">
                {campaign.clientDna?.clientName} • {campaign.clientDna?.industry}
              </p>
            </div>
            <div className="flex gap-2">
              <span className={`px-4 py-2 bg-${objectiveInfo.color}-100 text-${objectiveInfo.color}-800 font-medium rounded-full`}>
                {objectiveInfo.icon} {campaign.objective.charAt(0).toUpperCase() + campaign.objective.slice(1)}
              </span>
              <span className="px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-full">
                {campaign.status}
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 p-6 bg-gray-50 rounded-xl">
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">
                Duration
              </p>
              <p className="text-lg font-semibold text-gray-900">
                {new Date(campaign.dateRange.start).toLocaleDateString()} -{' '}
                {new Date(campaign.dateRange.end).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">
                Platforms
              </p>
              <p className="text-lg font-semibold text-gray-900">
                {campaign.platforms.length} Platform{campaign.platforms.length > 1 ? 's' : ''}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">
                Content Pillars
              </p>
              <p className="text-lg font-semibold text-gray-900">
                {campaign.contentPillars.length} Pillars
              </p>
            </div>
          </div>
        </div>

        {/* Campaign Blueprint */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="mr-3">🎯</span>
            Campaign Blueprint
          </h2>

          {/* Visual Mind Map */}
          <div className="relative">
            {/* Center: Client DNA */}
            <div className="flex justify-center mb-12">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl p-8 shadow-xl max-w-sm">
                <div className="text-center">
                  <div className="text-4xl mb-3">🧬</div>
                  <h3 className="text-xl font-bold mb-2">Client DNA</h3>
                  <p className="text-blue-100">{campaign.clientDna?.clientName}</p>
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <p className="text-sm text-blue-100">
                      {campaign.clientDna?.industry} • {campaign.clientDna?.brandTone}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Objective */}
            <div className="flex justify-center mb-12">
              <div className={`bg-${objectiveInfo.color}-50 border-2 border-${objectiveInfo.color}-200 rounded-xl p-6 max-w-md`}>
                <div className="text-center">
                  <div className="text-3xl mb-2">{objectiveInfo.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {campaign.objective.charAt(0).toUpperCase() + campaign.objective.slice(1)}
                  </h3>
                  <p className="text-sm text-gray-600">{objectiveInfo.description}</p>
                </div>
              </div>
            </div>

            {/* Platforms Grid */}
            <div className="mb-12">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                Target Platforms
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {campaign.platforms.map((platform: string) => (
                  <div
                    key={platform}
                    className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-4 text-center hover:shadow-md transition-shadow"
                  >
                    <div className="text-3xl mb-2">{getPlatformIcon(platform)}</div>
                    <p className="text-sm font-medium text-gray-900 capitalize">
                      {platform}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Pillars */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                AI-Generated Content Pillars
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {campaign.contentPillars.map((pillar: string, idx: number) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start">
                      <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0">
                        {idx + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">{pillar}</h4>
                        <p className="text-xs text-gray-600">
                          Content theme for {campaign.objective}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* KPIs Section */}
        {campaign.kpis && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="mr-3">📊</span>
              Key Performance Indicators
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {Object.entries(campaign.kpis).map(([key, value]: [string, any]) => (
                <div
                  key={key}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100"
                >
                  <p className="text-sm text-gray-600 uppercase tracking-wide mb-1">
                    {key.replace(/_/g, ' ')}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mb-1">
                    {value.target}
                  </p>
                  <p className="text-sm text-gray-600">{value.unit}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}