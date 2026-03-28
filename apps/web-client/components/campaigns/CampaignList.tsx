'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { campaignApi } from '@/lib/api/client';
import { Campaign } from '@/types/campaign';
import { Button } from '@/components/ui/button';

export function CampaignList() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    try {
      const data = await campaignApi.getAll();
      setCampaigns(data);
    } catch (error) {
      console.error('Error loading campaigns:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this campaign?')) return;

    try {
      await campaignApi.delete(id);
      await loadCampaigns();
      alert('Campaign deleted successfully');
    } catch (error) {
      alert('Error deleting campaign');
    }
  };

  const getObjectiveColor = (objective: string) => {
    const colors = {
      awareness: 'bg-blue-100 text-blue-800',
      engagement: 'bg-green-100 text-green-800',
      conversion: 'bg-purple-100 text-purple-800',
      leads: 'bg-orange-100 text-orange-800',
    };
    return colors[objective as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Campaigns</h1>
            <p className="text-gray-600 mt-1">
              {campaigns.length} {campaigns.length === 1 ? 'campaign' : 'campaigns'}
            </p>
          </div>
          <Link href="/campaigns/new">
            <Button size="lg">+ New Campaign</Button>
          </Link>
        </div>

        {/* Empty State */}
        {campaigns.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm p-12 text-center">
            <div className="text-6xl mb-4">🚀</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              No Campaigns Yet
            </h2>
            <p className="text-gray-600 mb-6">
              Create your first AI-powered marketing campaign
            </p>
            <Link href="/campaigns/new">
              <Button size="lg">Create First Campaign</Button>
            </Link>
          </div>
        ) : (
          /* Campaign Grid */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="bg-white dark:bg-slate-900 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-200"
              >
                {/* Header */}
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {campaign.name}
                  </h3>
                  <div className="flex gap-2">
                    <span
                      className={`px-3 py-1 text-sm font-medium rounded-full ${getObjectiveColor(
                        campaign.objective
                      )}`}
                    >
                      {campaign.objective.charAt(0).toUpperCase() +
                        campaign.objective.slice(1)}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full">
                      {campaign.status}
                    </span>
                  </div>
                </div>

                {/* Client */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                    Client
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {campaign.clientDna?.clientName || 'Unknown'}
                  </p>
                </div>

                {/* Platforms */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                    Platforms
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {campaign.platforms.map((platform: string) => (
                      <span
                        key={platform}
                        className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded"
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content Pillars */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                    Content Pillars
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {campaign.contentPillars?.slice(0, 3).map((pillar: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded"
                      >
                        {pillar}
                      </span>
                    ))}
                    {campaign.contentPillars?.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        +{campaign.contentPillars.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Date Range */}
                <div className="mb-4 pb-4 border-b">
                  <p className="text-xs text-gray-500">
                    {new Date(campaign.dateRange.start).toLocaleDateString()} -{' '}
                    {new Date(campaign.dateRange.end).toLocaleDateString()}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link href={`/campaigns/${campaign.id}`} className="flex-1">
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </Link>
                  <Button
                    variant="secondary"
                    onClick={() => handleDelete(campaign.id!)}
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