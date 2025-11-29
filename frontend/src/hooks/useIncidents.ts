import { useQuery } from "@tanstack/react-query";
import { fetchIncidents, fetchDemoState } from "../lib/api";
import type { Incident } from "../types";

export function useIncidents() {
    // Get demo state to check if paused
    const { data: demoState } = useQuery({
        queryKey: ["demoState"],
        queryFn: fetchDemoState,
        refetchInterval: 2000,
        initialData: { speed: 1, isPaused: false, progress: 0 },
    });

    return useQuery<Incident[]>({
        queryKey: ["incidents"],
        queryFn: fetchIncidents,
        // Only poll if not paused
        refetchInterval: demoState?.isPaused ? false : 3000,
    });
}
