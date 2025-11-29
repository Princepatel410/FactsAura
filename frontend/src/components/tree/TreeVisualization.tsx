import { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
    Background,
    Controls,
    MiniMap,
    useNodesState,
    useEdgesState,
    type Node,
    type NodeTypes,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { PostNode } from './PostNode';
import { getLayoutedElements } from '../../lib/treeUtils';
import { DiffPanel } from './DiffPanel';
import type { Post } from '../../types';

const nodeTypes: NodeTypes = {
    postNode: PostNode,
};

interface TreeVisualizationProps {
    posts: Post[];
    isLoading: boolean;
}

export function TreeVisualization({ posts, isLoading }: TreeVisualizationProps) {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

    // Recalculate layout when posts change
    useEffect(() => {
        if (posts.length === 0) {
            setNodes([]);
            setEdges([]);
            return;
        }
        const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(posts);
        setNodes(layoutedNodes);
        setEdges(layoutedEdges);
    }, [posts]);

    const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
        setSelectedPostId(node.id);
    }, []);

    if (isLoading) {
        return (
            <div className="h-[700px] w-full glass-panel border border-slate-700/50 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto border-4 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                    <p className="text-emerald-400 font-medium">Loading phylogenetic tree...</p>
                    <p className="text-slate-500 text-sm">Analyzing mutation patterns</p>
                </div>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="h-[700px] w-full glass-panel border border-slate-700/50 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-slate-800 flex items-center justify-center">
                        <svg className="w-8 h-8 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                    </div>
                    <p className="text-slate-400 font-medium">No data available</p>
                    <p className="text-slate-600 text-sm">No posts found for this incident</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-[700px] w-full glass-panel border border-slate-700/50 overflow-hidden relative group">
            {/* Hover glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-cyan-500/0 group-hover:from-emerald-500/5 group-hover:to-cyan-500/5 transition-all duration-500 pointer-events-none rounded-xl" />
            
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onNodeClick={onNodeClick}
                nodeTypes={nodeTypes}
                fitView
                attributionPosition="bottom-right"
                className="rounded-xl"
            >
                <Background color="#334155" gap={16} />
                <Controls className="!bg-slate-800/90 !border-slate-700 !shadow-lg backdrop-blur-sm" />
                <MiniMap
                    nodeColor={() => '#10b981'}
                    className="!bg-slate-800/90 !border-slate-700 !shadow-lg backdrop-blur-sm"
                />
            </ReactFlow>

            <DiffPanel
                selectedPostId={selectedPostId}
                onClose={() => setSelectedPostId(null)}
            />

            {/* Legend */}
            <div className="absolute top-4 left-4 z-10 glass-panel p-3 border border-slate-700/50 backdrop-blur-md">
                <h3 className="text-sm font-bold text-slate-200 mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Mutation Legend
                </h3>
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50" />
                        <span className="text-xs text-slate-300">Verified (&lt;10%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50" />
                        <span className="text-xs text-slate-300">Modified (10-40%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/50" />
                        <span className="text-xs text-slate-300">Fabricated (&gt;40%)</span>
                    </div>
                </div>
            </div>

            {/* Post count badge */}
            <div className="absolute top-4 right-4 z-10 glass-panel px-3 py-2 border border-slate-700/50 backdrop-blur-md">
                <p className="text-xs text-slate-400">
                    <span className="text-emerald-400 font-bold text-lg">{posts.length}</span> posts
                </p>
            </div>
        </div>
    );
}
