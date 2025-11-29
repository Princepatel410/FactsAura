import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, GitBranch, TrendingUp, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { useIncidentSocket } from '../hooks/useIncidentSocket';
import { TreeVisualization } from '../components/tree/TreeVisualization';
import { AgentLog } from '../components/AgentLog';
import { motion } from 'framer-motion';
import { useMemo, useEffect } from 'react';

export function IncidentPage() {
  const { incidentId } = useParams<{ incidentId: string }>();
  const navigate = useNavigate();
  const { posts, isLoading } = useIncidentSocket(incidentId || null);

  useEffect(() => {
    document.title = `Tree Analysis - ${incidentId} - FactZAura`;
  }, [incidentId]);

  // Calculate tree statistics
  const stats = useMemo(() => {
    const totalPosts = posts.length;
    const rootPosts = posts.filter(p => !p.parentId).length;
    const avgMutation = posts.length > 0 
      ? posts.reduce((sum, p) => sum + (p.mutationScore || 0), 0) / posts.length 
      : 0;
    const fabrications = posts.filter(p => p.mutationType === 'FABRICATION').length;
    
    return { totalPosts, rootPosts, avgMutation, fabrications };
  }, [posts]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-12">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <motion.button
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate('/')}
              className="p-3 hover:bg-slate-800/50 rounded-xl transition-colors backdrop-blur-sm border border-slate-700/50"
              type="button"
            >
              <ArrowLeft className="w-6 h-6 text-slate-400" />
            </motion.button>
            <motion.div
              className="w-16 h-16 rounded-xl shadow-lg shadow-emerald-500/30 overflow-hidden bg-slate-900/50 flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img 
                src="/logo 2.png" 
                alt="FactZAura Logo" 
                className="w-24 h-24 object-cover scale-150"
                style={{ imageRendering: 'crisp-edges' }}
              />
            </motion.div>
            <div>
              <h1 className="text-4xl font-bold mb-2">
                <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Phylogenetic Tree Analysis
                </span>
              </h1>
              <p className="text-slate-400 text-lg">
                Tracking misinformation mutation patterns
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          {!isLoading && posts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-panel p-4 border-l-4 border-l-emerald-500 cursor-pointer group hover:shadow-lg hover:shadow-emerald-500/20 transition-all relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/10 group-hover:to-emerald-500/5 transition-all duration-500" />
                <div className="flex items-center justify-between relative z-10">
                  <div>
                    <p className="text-slate-400 text-sm group-hover:text-slate-300 transition-colors">Total Posts</p>
                    <p className="text-2xl font-bold text-emerald-400 group-hover:text-emerald-300 transition-colors">{stats.totalPosts}</p>
                  </div>
                  <GitBranch className="w-8 h-8 text-emerald-400/50 group-hover:text-emerald-400 group-hover:scale-110 transition-all" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-panel p-4 border-l-4 border-l-cyan-500 cursor-pointer group hover:shadow-lg hover:shadow-cyan-500/20 transition-all relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/10 group-hover:to-cyan-500/5 transition-all duration-500" />
                <div className="flex items-center justify-between relative z-10">
                  <div>
                    <p className="text-slate-400 text-sm group-hover:text-slate-300 transition-colors">Root Posts</p>
                    <p className="text-2xl font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors">{stats.rootPosts}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-cyan-400/50 group-hover:text-cyan-400 group-hover:scale-110 transition-all" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-panel p-4 border-l-4 border-l-yellow-500 cursor-pointer group hover:shadow-lg hover:shadow-yellow-500/20 transition-all relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/0 to-yellow-500/0 group-hover:from-yellow-500/10 group-hover:to-yellow-500/5 transition-all duration-500" />
                <div className="flex items-center justify-between relative z-10">
                  <div>
                    <p className="text-slate-400 text-sm group-hover:text-slate-300 transition-colors">Avg Mutation</p>
                    <p className="text-2xl font-bold text-yellow-400 group-hover:text-yellow-300 transition-colors">{stats.avgMutation.toFixed(1)}%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-yellow-400/50 group-hover:text-yellow-400 group-hover:scale-110 transition-all" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-panel p-4 border-l-4 border-l-red-500 cursor-pointer group hover:shadow-lg hover:shadow-red-500/20 transition-all relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-red-500/0 group-hover:from-red-500/10 group-hover:to-red-500/5 transition-all duration-500" />
                <div className="flex items-center justify-between relative z-10">
                  <div>
                    <p className="text-slate-400 text-sm group-hover:text-slate-300 transition-colors">Fabrications</p>
                    <p className="text-2xl font-bold text-red-400 group-hover:text-red-300 transition-colors">{stats.fabrications}</p>
                  </div>
                  <AlertCircle className="w-8 h-8 text-red-400/50 group-hover:text-red-400 group-hover:scale-110 group-hover:animate-pulse transition-all" />
                </div>
              </motion.div>
            </div>
          )}
        </motion.header>

        {/* Main Content */}
        <main className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <TreeVisualization posts={posts} isLoading={isLoading} />
          </motion.div>

          {/* Info Banner */}
          {!isLoading && posts.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="glass-panel p-4 border-l-4 border-l-blue-500"
            >
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-slate-300">
                    <span className="text-blue-400 font-semibold">Interactive Tree:</span> Click on any node to view detailed mutation analysis, vote on credibility, and add comments. 
                    Color-coded edges show mutation severity: <span className="text-green-400">Green</span> (verified), 
                    <span className="text-yellow-400"> Yellow</span> (modified), 
                    <span className="text-red-400"> Red</span> (fabricated).
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Agent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="glass-panel p-6 border border-slate-700/50"
          >
            <h2 className="text-xl font-bold text-slate-200 mb-4 flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-emerald-400" />
              Agent Activity
            </h2>
            <AgentLog />
          </motion.div>
        </main>
      </div>
    </div>
  );
}
