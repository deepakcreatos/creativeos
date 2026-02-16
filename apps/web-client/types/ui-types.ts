
import React from 'react';

export type Page = 'landing' | 'dashboard' | 'client-dna' | 'campaigns' | 'scheduler' | 'analytics' | 'pricing' | 'login' | 'register';

export interface Campaign {
  id: string;
  name: string;
  status: 'Active' | 'Paused' | 'Draft' | 'Completed';
  objective: string;
  date: string;
}

export interface MetricCardProps {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
  color: string;
}
