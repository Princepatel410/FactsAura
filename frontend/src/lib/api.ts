import type { Incident } from "../types";

const API_BASE_URL = "http://localhost:8000/api";

export async function fetchIncidents(): Promise<Incident[]> {
    const response = await fetch(`${API_BASE_URL}/incidents`);
    if (!response.ok) {
        throw new Error("Failed to fetch incidents");
    }
    return response.json();
}

export async function fetchIncidentById(id: string): Promise<Incident> {
    const response = await fetch(`${API_BASE_URL}/incidents/${id}`);
    if (!response.ok) {
        throw new Error("Failed to fetch incident");
    }
    return response.json();
}

export async function fetchPostsByIncident(incidentId: string): Promise<any[]> {
    const response = await fetch(`${API_BASE_URL}/incidents/${incidentId}/posts`);
    if (!response.ok) {
        throw new Error("Failed to fetch posts");
    }
    return response.json();
}

export async function fetchPostDiff(postId: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/diff`);
    if (!response.ok) {
        throw new Error("Failed to fetch post diff");
    }
    return response.json();
}

export async function voteOnPost(postId: string, isCredible: boolean): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isCredible }),
    });
    if (!response.ok) {
        throw new Error("Failed to vote on post");
    }
    return response.json();
}

export async function fetchComments(postId: string): Promise<any[]> {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`);
    if (!response.ok) {
        throw new Error("Failed to fetch comments");
    }
    return response.json();
}

export async function createComment(postId: string, author: string, content: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author, content }),
    });
    if (!response.ok) {
        throw new Error("Failed to create comment");
    }
    return response.json();
}

// Demo Control API
export async function fetchDemoState(): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/demo/state`);
    if (!response.ok) {
        throw new Error("Failed to fetch demo state");
    }
    return response.json();
}

export async function updateDemoSpeed(speed: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/demo/speed`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ speed }),
    });
    if (!response.ok) {
        throw new Error("Failed to update demo speed");
    }
}

export async function pauseDemo(): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/demo/pause`, {
        method: "POST",
    });
    if (!response.ok) {
        throw new Error("Failed to pause demo");
    }
}

export async function resumeDemo(): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/demo/resume`, {
        method: "POST",
    });
    if (!response.ok) {
        throw new Error("Failed to resume demo");
    }
}

export async function resetDemo(): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/demo/reset`, {
        method: "POST",
    });
    if (!response.ok) {
        throw new Error("Failed to reset demo");
    }
}
