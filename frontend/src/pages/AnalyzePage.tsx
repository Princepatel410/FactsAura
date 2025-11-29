import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Zap, Target, CheckCircle } from 'lucide-react';
import { SubmissionPortal } from '../components/SubmissionPortal';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

export function AnalyzePage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Analyze Content - FactZAura';
  }, []);

  const features = [
    {
      icon: Shield,
      title: 'AI-Powered Detection',
      description: 'Advanced algorithms analyze content patterns'
    },
    {
      icon: Zap,
      title: 'Instant Results',
      description: 'Get credibility scores in seconds'
    },
    {
      icon: Target,
      title: 'Mutation Tracking',
      description: 'Identify how information evolves'
    },
    {
      icon: CheckCircle,
      title: 'Fact Verification',
      description: 'Cross-reference with verified sources'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
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
              className="w-16 h-16 rounded-xl shadow-lg shadow-cyan-500/30 overflow-hidden bg-slate-900/50 flex items-center justify-center"
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
                <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent">
                  Content Analysis
                </span>
              </h1>
              <p className="text-slate-400 text-lg">
                Submit any content for instant misinformation detection
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-panel p-4 hover:bg-white/5 transition-all group cursor-pointer hover:shadow-lg hover:shadow-emerald-500/10 relative overflow-hidden"
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-cyan-500/0 group-hover:from-emerald-500/10 group-hover:to-cyan-500/10 transition-all duration-500" />
                
                <div className="relative z-10">
                  <feature.icon className="w-8 h-8 text-emerald-400 mb-3 group-hover:scale-125 group-hover:rotate-6 transition-all duration-300" />
                  <h3 className="font-semibold text-slate-200 mb-1 group-hover:text-emerald-300 transition-colors">{feature.title}</h3>
                  <p className="text-sm text-slate-500 group-hover:text-slate-400 transition-colors">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.header>

        {/* Main Content */}
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="glass-panel p-8 border border-slate-700/50">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-200 mb-2">
                Analyze Content
              </h2>
              <p className="text-slate-400">
                Paste any text, social media post, or news article to check for misinformation patterns
              </p>
            </div>
            
            <SubmissionPortal />
          </div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <motion.div 
              whileHover={{ scale: 1.02, x: 5 }}
              className="glass-panel p-4 border-l-4 border-l-emerald-500 cursor-pointer hover:shadow-lg hover:shadow-emerald-500/10 transition-all group"
            >
              <h3 className="font-semibold text-emerald-400 mb-2 group-hover:text-emerald-300 transition-colors">How It Works</h3>
              <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                Our AI analyzes linguistic patterns, cross-references facts, and identifies mutation signatures
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.02, x: 5 }}
              className="glass-panel p-4 border-l-4 border-l-cyan-500 cursor-pointer hover:shadow-lg hover:shadow-cyan-500/10 transition-all group"
            >
              <h3 className="font-semibold text-cyan-400 mb-2 group-hover:text-cyan-300 transition-colors">Privacy First</h3>
              <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                Content is analyzed in real-time and not stored permanently on our servers
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.02, x: 5 }}
              className="glass-panel p-4 border-l-4 border-l-blue-500 cursor-pointer hover:shadow-lg hover:shadow-blue-500/10 transition-all group"
            >
              <h3 className="font-semibold text-blue-400 mb-2 group-hover:text-blue-300 transition-colors">Continuous Learning</h3>
              <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                System improves with each analysis, adapting to new misinformation patterns
              </p>
            </motion.div>
          </motion.div>
        </motion.main>
      </div>
    </div>
  );
}
