import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, XCircle, ExternalLink, Shield } from 'lucide-react';
import { AnimatedButton } from './AnimatedButton';

interface RelatedPost {
    id: string;
    title: string;
    similarity: number;
}

interface TruthScorecardProps {
    matchPercentage: number;
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
    relatedPosts: RelatedPost[];
    analysis?: string;
    onReset: () => void;
}

export const TruthScorecard: React.FC<TruthScorecardProps> = ({
    matchPercentage,
    riskLevel,
    relatedPosts,
    analysis,
    onReset
}) => {
    const getRiskColor = (level: string) => {
        switch (level) {
            case 'LOW': return 'text-emerald-400 border-emerald-500/50 bg-emerald-950/30';
            case 'MEDIUM': return 'text-yellow-400 border-yellow-500/50 bg-yellow-950/30';
            case 'HIGH': return 'text-red-400 border-red-500/50 bg-red-950/30';
            default: return 'text-gray-400 border-gray-500/50 bg-gray-950/30';
        }
    };

    const getRiskIcon = (level: string) => {
        switch (level) {
            case 'LOW': return <CheckCircle className="w-12 h-12 text-emerald-400" />;
            case 'MEDIUM': return <AlertTriangle className="w-12 h-12 text-yellow-400" />;
            case 'HIGH': return <XCircle className="w-12 h-12 text-red-400" />;
            default: return <Shield className="w-12 h-12 text-gray-400" />;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full bg-black/40 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden shadow-2xl"
        >
            {/* Header */}
            <div className={`p-6 border-b border-white/10 flex items-center justify-between ${getRiskColor(riskLevel).split(' ')[2]}`}>
                <div className="flex items-center space-x-4">
                    {getRiskIcon(riskLevel)}
                    <div>
                        <h2 className="text-2xl font-bold text-white">Analysis Complete</h2>
                        <p className={`text-sm font-mono ${getRiskColor(riskLevel).split(' ')[0]}`}>
                            RISK LEVEL: {riskLevel}
                        </p>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-4xl font-bold text-white">{matchPercentage}%</div>
                    <div className="text-xs text-gray-400 uppercase tracking-wider">Match Confidence</div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
                {/* AI Analysis */}
                {analysis && (
                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                            AI Analysis
                        </h3>
                        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                            <p className="text-gray-200 text-sm leading-relaxed">{analysis}</p>
                        </div>
                    </div>
                )}

                {/* Related Posts */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                        Knowledge Base Matches
                    </h3>
                    {relatedPosts.length > 0 ? (
                        <div className="space-y-3">
                            {relatedPosts.map((post, index) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ scale: 1.02, x: 5 }}
                                    className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer group relative overflow-hidden"
                                >
                                    {/* Hover gradient effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 to-cyan-500/0 group-hover:from-emerald-500/5 group-hover:to-cyan-500/5 transition-all duration-500" />
                                    
                                    <div className="flex items-center space-x-3 relative z-10">
                                        <div className={`w-1.5 h-1.5 rounded-full ${matchPercentage > 80 ? 'bg-red-500 animate-pulse' : 'bg-yellow-500'}`} />
                                        <span className="text-gray-200 font-medium truncate max-w-[200px] sm:max-w-xs group-hover:text-white transition-colors">
                                            {post.title}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-3 relative z-10">
                                        <span className="text-xs font-mono text-gray-400 group-hover:text-gray-300 transition-colors">
                                            {(post.similarity * 100).toFixed(1)}% SIMILARITY
                                        </span>
                                        <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-emerald-400 group-hover:scale-110 transition-all" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-4 rounded-lg bg-white/5 border border-white/10 text-center text-gray-400 italic">
                            No direct matches found in current database.
                        </div>
                    )}
                </div>

                {/* Action Button */}
                <AnimatedButton
                    onClick={onReset}
                    icon={Shield}
                    variant="secondary"
                    className="w-full"
                >
                    Analyze Another Text
                </AnimatedButton>
            </div>
        </motion.div>
    );
};
