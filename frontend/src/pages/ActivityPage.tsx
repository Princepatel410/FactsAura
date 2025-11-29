import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Activity, Cpu, Eye, Send } from 'lucide-react';
import { AgentLog } from '../components/AgentLog';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

export function ActivityPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Agent Activity - FactZAura';
  }, []);

  const agents = [
    {
      icon: Eye,
      name: 'Scanner Agent',
      status: 'Active',
      description: 'Monitoring social media feeds'
    },
    {
      icon: Cpu,
      name: 'Verifier Agent',
      status: 'Active',
      description: 'Analyzing content patterns'
    },
    {
      icon: Send,
      name: 'Publisher Agent',
      status: 'Active',
      description: 'Publishing truth scorecards'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-8 py-12">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-8">
            <motion.button
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate('/')}
              className="p-3 hover:bg-slate-800/50 rounded-xl transition-colors backdrop-blur-sm border border-slate-700/50"
            >
              <ArrowLeft className="w-6 h-6 text-slate-400" />
            </motion.button>
            <motion.div
              className="w-16 h-16 rounded-xl shadow-lg shadow-purple-500/30 overflow-hidden bg-slate-900/50 flex items-center justify-center"
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
                <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Agent Activity
                </span>
              </h1>
              <p className="text-slate-400 text-lg">
                Real-time monitoring of autonomous AI agents
              </p>
            </div>
          </div>

          {/* Agent Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {agents.map((agent, index) => (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-panel p-4 border-l-4 border-l-emerald-500 cursor-pointer group hover:shadow-lg hover:shadow-emerald-500/20 transition-all relative overflow-hidden"
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-cyan-500/0 group-hover:from-emerald-500/10 group-hover:to-cyan-500/10 transition-all duration-500" />
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <agent.icon className="w-8 h-8 text-emerald-400 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" />
                    <span className="flex items-center gap-2 text-xs">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                      <span className="text-emerald-400 group-hover:text-emerald-300 transition-colors">{agent.status}</span>
                    </span>
                  </div>
                  <h3 className="font-semibold text-slate-200 mb-1 group-hover:text-emerald-300 transition-colors">{agent.name}</h3>
                  <p className="text-sm text-slate-500 group-hover:text-slate-400 transition-colors">{agent.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.header>

        {/* Main Content */}
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="glass-panel p-6 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <Activity className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-slate-200">
                Live Activity Feed
              </h2>
            </div>
            
            <AgentLog />
          </div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 glass-panel p-4 border-l-4 border-l-blue-500"
          >
            <p className="text-sm text-slate-400">
              <span className="text-blue-400 font-semibold">Autonomous Operation:</span> These AI agents work continuously to detect, verify, and respond to misinformation in real-time without human intervention.
            </p>
          </motion.div>
        </motion.main>
      </div>
    </div>
  );
}
