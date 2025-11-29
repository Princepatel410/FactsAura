import { useNavigate } from 'react-router-dom';
import { useIncidents } from '../hooks/useIncidents';
import { IncidentCard } from '../components/IncidentCard';
import { Loader2, Shield, TrendingUp, AlertTriangle, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

export function HomePage() {
  const navigate = useNavigate();
  const { data: incidents = [], isLoading, error } = useIncidents();

  useEffect(() => {
    document.title = 'Home - FactZAura';
  }, []);

  const handleIncidentSelect = (incidentId: string) => {
    navigate(`/incident/${incidentId}`);
  };

  const criticalCount = incidents.filter(i => i.severity === 'CRITICAL').length;
  const warningCount = incidents.filter(i => i.severity === 'WARNING').length;

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-400">
        <div className="text-center space-y-4">
          <AlertTriangle className="w-16 h-16 mx-auto" />
          <p className="text-xl">Error loading incidents</p>
          <p className="text-sm text-slate-500">Is the backend running?</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Login Button - Bottom Left */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        onClick={() => navigate('/auth')}
        whileHover={{ scale: 1.05, x: 5 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 left-8 z-40 flex items-center gap-2 px-5 py-3 glass-panel border border-emerald-500/30 rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:border-emerald-500/50 transition-all group"
      >
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center group-hover:from-emerald-500/30 group-hover:to-cyan-500/30 transition-all">
          <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <span className="font-semibold text-slate-200 group-hover:text-emerald-300 transition-colors">
          Login
        </span>
      </motion.button>

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-12">
        {/* Hero Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div className="flex items-center gap-6">
              <motion.div
                className="w-24 h-24 rounded-xl shadow-2xl shadow-emerald-500/30 overflow-hidden bg-slate-900/50 flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img 
                  src="/logo 2.png" 
                  alt="FactZAura Logo" 
                  className="w-32 h-32 object-cover scale-150"
                  style={{ imageRendering: 'crisp-edges' }}
                />
              </motion.div>
              <div>
                <h1 className="text-5xl font-bold mb-3">
                  <span className="bg-gradient-to-r from-blue-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                    FactZAura
                  </span>
                </h1>
                <p className="text-slate-400 text-lg">
                  AI-Powered Misinformation Detection & Analysis Platform
                </p>
              </div>
            </div>
            
            <motion.button
              onClick={() => navigate('/analyze')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold rounded-lg shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300"
            >
              <Search className="w-5 h-5" />
              <span>Analyze Content</span>
            </motion.button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-panel p-4 border-l-4 border-l-emerald-500 cursor-pointer group hover:shadow-lg hover:shadow-emerald-500/20 transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm group-hover:text-slate-300 transition-colors">Active Monitoring</p>
                  <p className="text-2xl font-bold text-emerald-400 group-hover:text-emerald-300 transition-colors">{incidents.length}</p>
                </div>
                <Shield className="w-8 h-8 text-emerald-400/50 group-hover:text-emerald-400 group-hover:scale-110 transition-all" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-panel p-4 border-l-4 border-l-red-500 cursor-pointer group hover:shadow-lg hover:shadow-red-500/20 transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm group-hover:text-slate-300 transition-colors">Critical Alerts</p>
                  <p className="text-2xl font-bold text-red-400 group-hover:text-red-300 transition-colors">{criticalCount}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-400/50 group-hover:text-red-400 group-hover:scale-110 transition-all" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-panel p-4 border-l-4 border-l-yellow-500 cursor-pointer group hover:shadow-lg hover:shadow-yellow-500/20 transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm group-hover:text-slate-300 transition-colors">Warnings</p>
                  <p className="text-2xl font-bold text-yellow-400 group-hover:text-yellow-300 transition-colors">{warningCount}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-yellow-400/50 group-hover:text-yellow-400 group-hover:scale-110 transition-all" />
              </div>
            </motion.div>
          </div>
        </motion.header>

        {/* Incidents Grid */}
        <main>
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-bold mb-6 text-slate-200"
          >
            Active Incidents
          </motion.h2>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 animate-spin text-emerald-400 mb-4" />
              <p className="text-slate-400">Loading incidents...</p>
            </div>
          ) : incidents.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-panel p-12 text-center"
            >
              <Shield className="w-16 h-16 mx-auto mb-4 text-emerald-400/50" />
              <p className="text-xl text-slate-300 mb-2">All Clear</p>
              <p className="text-slate-500">No active incidents detected. System is monitoring...</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {incidents.map((incident, index) => (
                <motion.div
                  key={incident.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <IncidentCard
                    incident={incident}
                    onSelect={handleIncidentSelect}
                    isSelected={false}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
