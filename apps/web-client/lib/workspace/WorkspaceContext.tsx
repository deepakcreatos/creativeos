'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { dnaApi } from '@/lib/api/client';
import { useAuth } from '@/lib/auth/AuthContext';

interface ClientDNA {
  id: string;
  clientName: string;
  industry: string;
  [key: string]: any;
}

interface WorkspaceContextType {
  clients: ClientDNA[];
  activeClient: ClientDNA | null;
  setActiveClientId: (id: string | null) => void;
  refreshClients: () => Promise<void>;
  isLoading: boolean;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [clients, setClients] = useState<ClientDNA[]>([]);
  const [activeClientId, setActiveClientId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const refreshClients = async () => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    try {
      const data = await dnaApi.getAll();
      setClients(data);
      // Auto-select first client if none selected
      if (data.length > 0 && !activeClientId) {
        setActiveClientId(data[0].id);
      } else if (data.length === 0) {
        setActiveClientId(null);
      }
    } catch (error) {
      console.error('Failed to load clients', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      refreshClients();
    } else {
      setClients([]);
      setActiveClientId(null);
    }
  }, [isAuthenticated]);

  const activeClient = clients.find((c) => c.id === activeClientId) || null;

  return (
    <WorkspaceContext.Provider
      value={{
        clients,
        activeClient,
        setActiveClientId,
        refreshClients,
        isLoading,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within WorkspaceProvider');
  }
  return context;
}
