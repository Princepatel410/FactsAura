import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchDemoState, updateDemoSpeed, pauseDemo, resumeDemo, resetDemo } from '../lib/api';
import type { DemoState } from '../types';

export function useDemoControls() {
    const queryClient = useQueryClient();

    // Poll demo state every 2 seconds
    const { data: demoState } = useQuery<DemoState>({
        queryKey: ['demoState'],
        queryFn: fetchDemoState,
        refetchInterval: 2000,
        initialData: { speed: 1, isPaused: false, progress: 0 },
    });

    const speedMutation = useMutation({
        mutationFn: updateDemoSpeed,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['demoState'] });
        },
    });

    const pauseMutation = useMutation({
        mutationFn: pauseDemo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['demoState'] });
        },
    });

    const resumeMutation = useMutation({
        mutationFn: resumeDemo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['demoState'] });
        },
    });

    const resetMutation = useMutation({
        mutationFn: resetDemo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['demoState'] });
            queryClient.invalidateQueries({ queryKey: ['incidents'] });
        },
    });

    return {
        demoState: demoState!,
        updateSpeed: speedMutation.mutate,
        pause: pauseMutation.mutate,
        resume: resumeMutation.mutate,
        reset: resetMutation.mutate,
    };
}
