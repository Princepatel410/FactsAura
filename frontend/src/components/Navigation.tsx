import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export function Navigation() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="glass-panel px-6 py-3 flex items-center gap-2 border border-slate-700/50 shadow-2xl hover:shadow-emerald-500/10 transition-shadow duration-500"
      >
        {/* Logo */}
        <Link to="/" className="mr-2 group">
          <motion.div
            className="w-12 h-12 rounded-lg shadow-lg shadow-emerald-500/20 overflow-hidden bg-slate-900/50 flex items-center justify-center"
            whileHover={{ scale: 1.15, rotate: 12 }}
            whileTap={{ scale: 0.95 }}
          >
            <img 
              src="/logo 2.png" 
              alt="FactZAura Logo" 
              className="w-16 h-16 object-cover scale-150"
              style={{ imageRendering: 'crisp-edges' }}
            />
          </motion.div>
        </Link>

        {/* Divider */}
        <div className="w-px h-8 bg-gradient-to-b from-transparent via-slate-600 to-transparent" />

        <Link
          to="/"
          onClick={() => console.log('Home clicked')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all cursor-pointer group ${
            isActive('/')
              ? 'bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-400 shadow-lg shadow-emerald-500/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 hover:shadow-lg hover:shadow-emerald-500/10'
          }`}
        >
          <Home className={`w-5 h-5 transition-transform duration-300 ${!isActive('/') && 'group-hover:scale-110'}`} />
          <span className="font-medium">Home</span>
        </Link>

        <Link
          to="/analyze"
          onClick={() => console.log('Analyze clicked')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all cursor-pointer group ${
            isActive('/analyze')
              ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 shadow-lg shadow-cyan-500/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 hover:shadow-lg hover:shadow-cyan-500/10'
          }`}
        >
          <Search className={`w-5 h-5 transition-transform duration-300 ${!isActive('/analyze') && 'group-hover:scale-110 group-hover:rotate-12'}`} />
          <span className="font-medium">Analyze</span>
        </Link>

        <Link
          to="/activity"
          onClick={() => console.log('Activity clicked')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all cursor-pointer group ${
            isActive('/activity')
              ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-400 shadow-lg shadow-purple-500/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 hover:shadow-lg hover:shadow-purple-500/10'
          }`}
        >
          <Activity className={`w-5 h-5 transition-transform duration-300 ${!isActive('/activity') && 'group-hover:scale-110 group-hover:animate-pulse'}`} />
          <span className="font-medium">Activity</span>
        </Link>
      </motion.div>
    </nav>
  );
}
