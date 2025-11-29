import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchPostsByIncident, fetchDemoState } from '../lib/api';
import type { Post } from '../types';

export function useIncidentSocket(incidentId: string | null) {
    // Get demo state to check if paused
    const { data: demoState } = useQuery({
        queryKey: ['demoState'],
        queryFn: fetchDemoState,
        refetchInterval: 2000,
        initialData: { speed: 1, isPaused: false, progress: 0 },
    });

    // Use polling instead of WebSocket for reliability
    const { data: posts = [], isLoading } = useQuery({
        queryKey: ['posts', incidentId],
        queryFn: () => incidentId ? fetchPostsByIncident(incidentId) : Promise.resolve([]),
        enabled: !!incidentId,
        // Only refetch if not paused
        refetchInterval: demoState?.isPaused ? false : 3000,
    });

    return { posts, isLoading };
}
