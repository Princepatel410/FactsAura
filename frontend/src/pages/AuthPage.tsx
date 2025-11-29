import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Mail, Lock, User, LogIn, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function AuthPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50 flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/')}
        className="fixed top-6 left-6 z-50 p-3 glass-panel hover:bg-slate-800/50 rounded-xl transition-colors border border-slate-700/50"
      >
        <ArrowLeft className="w-6 h-6 text-slate-400" />
      </motion.button>

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-6xl h-[650px] glass-panel rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50"
      >
        {/* Diagonal Background Shape */}
        <motion.div
          className="absolute inset-0 z-0"
          animate={{
            clipPath: isLogin
              ? 'polygon(0 0, 100% 0, 62% 100%, 0% 100%)'
              : 'polygon(38% 0, 100% 0, 100% 100%, 0 100%)',
          }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-cyan-500/15 to-blue-500/20" />
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-transparent" />
          {/* Animated gradient orbs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>

        {/* Welcome Section - Login */}
        <motion.div
          className="absolute left-12 top-1/2 -translate-y-1/2 w-[38%] z-10 pointer-events-none"
          animate={{
            x: isLogin ? 0 : -200,
            opacity: isLogin ? 1 : 0,
          }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="flex items-center gap-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div
              className="w-16 h-16 rounded-xl shadow-lg shadow-emerald-500/30 overflow-hidden bg-slate-900/50 flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <img
                src="/logo 2.png"
                alt="FactZAura Logo"
                className="w-24 h-24 object-cover scale-150"
                style={{ imageRendering: 'crisp-edges' }}
              />
            </motion.div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              FactZAura
            </h1>
          </motion.div>
          <h2 className="text-3xl font-bold mb-4 text-slate-100">
            Welcome Back!
          </h2>
          <p className="text-slate-300 mb-6 leading-relaxed">
            Sign in to access your personalized misinformation detection dashboard and continue protecting truth in the digital age.
          </p>
          <motion.button
            onClick={() => setIsLogin(!isLogin)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 border-2 border-emerald-400 text-emerald-400 rounded-lg font-semibold hover:bg-emerald-400/10 transition-all pointer-events-auto"
          >
            Create New Account
          </motion.button>
        </motion.div>

        {/* Welcome Section - Register */}
        <motion.div
          className="absolute right-12 top-1/2 -translate-y-1/2 w-[38%] z-10 text-right pointer-events-none"
          animate={{
            x: isLogin ? 200 : 0,
            opacity: isLogin ? 0 : 1,
          }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="flex items-center gap-4 mb-6 justify-end"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              FactZAura
            </h1>
            <motion.div
              className="w-16 h-16 rounded-xl shadow-lg shadow-cyan-500/30 overflow-hidden bg-slate-900/50 flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: -5 }}
            >
              <img
                src="/logo 2.png"
                alt="FactZAura Logo"
                className="w-24 h-24 object-cover scale-150"
                style={{ imageRendering: 'crisp-edges' }}
              />
            </motion.div>
          </motion.div>
          <h2 className="text-3xl font-bold mb-4 text-slate-100">
            Join the Truth Revolution!
          </h2>
          <p className="text-slate-300 mb-6 leading-relaxed">
            Become part of our community fighting misinformation. Get access to advanced AI-powered analysis tools, track viral content mutations, and help protect digital truth.
          </p>
          <motion.button
            onClick={() => setIsLogin(!isLogin)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 border-2 border-cyan-400 text-cyan-400 rounded-lg font-semibold hover:bg-cyan-400/10 transition-all pointer-events-auto"
          >
            Already Have Account?
          </motion.button>
        </motion.div>

        {/* Login Form */}
        <AnimatePresence mode="wait">
          {isLogin && (
            <motion.div
              key="login"
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
              className="absolute right-0 top-0 w-[52%] h-full flex flex-col justify-center px-16 bg-slate-900/95 backdrop-blur-xl z-20"
              style={{
                clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 0% 100%)',
              }}
            >
              <motion.h2
                initial={{ x: 100, opacity: 0, filter: 'blur(10px)' }}
                animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
                transition={{ delay: 0.1 }}
                className="text-3xl font-bold mb-8 text-slate-100"
              >
                Login
              </motion.h2>

              <motion.div
                initial={{ x: 100, opacity: 0, filter: 'blur(10px)' }}
                animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
                transition={{ delay: 0.2 }}
                className="relative mb-4 group"
              >
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-400 transition-colors" />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                />
              </motion.div>

              <motion.div
                initial={{ x: 100, opacity: 0, filter: 'blur(10px)' }}
                animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
                transition={{ delay: 0.3 }}
                className="relative mb-6 group"
              >
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-400 transition-colors" />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                />
              </motion.div>

              <motion.button
                initial={{ x: 100, opacity: 0, filter: 'blur(10px)' }}
                animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold rounded-lg shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all flex items-center justify-center gap-2"
              >
                <LogIn className="w-5 h-5" />
                <span>Login</span>
              </motion.button>

              <motion.p
                initial={{ x: 100, opacity: 0, filter: 'blur(10px)' }}
                animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
                transition={{ delay: 0.5 }}
                className="mt-4 text-center text-slate-400 text-sm"
              >
                Forgot password?{' '}
                <button className="text-emerald-400 hover:text-emerald-300 transition-colors">
                  Reset here
                </button>
              </motion.p>
            </motion.div>
          )}

          {/* Register Form */}
          {!isLogin && (
            <motion.div
              key="register"
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
              className="absolute left-0 top-0 w-[52%] h-full flex flex-col justify-center px-16 bg-slate-900/95 backdrop-blur-xl z-20"
              style={{
                clipPath: 'polygon(0 0, 90% 0, 100% 100%, 0% 100%)',
              }}
            >
              <motion.h2
                initial={{ x: -100, opacity: 0, filter: 'blur(10px)' }}
                animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
                transition={{ delay: 0.1 }}
                className="text-3xl font-bold mb-8 text-slate-100"
              >
                Register
              </motion.h2>

              <motion.div
                initial={{ x: -100, opacity: 0, filter: 'blur(10px)' }}
                animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
                transition={{ delay: 0.2 }}
                className="relative mb-4 group"
              >
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-cyan-400 transition-colors" />
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                />
              </motion.div>

              <motion.div
                initial={{ x: -100, opacity: 0, filter: 'blur(10px)' }}
                animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
                transition={{ delay: 0.3 }}
                className="relative mb-4 group"
              >
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-cyan-400 transition-colors" />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                />
              </motion.div>

              <motion.div
                initial={{ x: -100, opacity: 0, filter: 'blur(10px)' }}
                animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
                transition={{ delay: 0.4 }}
                className="relative mb-6 group"
              >
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-cyan-400 transition-colors" />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                />
              </motion.div>

              <motion.button
                initial={{ x: -100, opacity: 0, filter: 'blur(10px)' }}
                animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white font-semibold rounded-lg shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all flex items-center justify-center gap-2"
              >
                <UserPlus className="w-5 h-5" />
                <span>Register</span>
              </motion.button>

              <motion.div
                initial={{ x: -100, opacity: 0, filter: 'blur(10px)' }}
                animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
                transition={{ delay: 0.6 }}
                className="mt-4 space-y-2"
              >
                <p className="text-center text-slate-400 text-sm">
                  By registering, you agree to our{' '}
                  <button className="text-emerald-400 hover:text-emerald-300 transition-colors underline">
                    Terms & Conditions
                  </button>
                </p>
                <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Free Forever</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>Secure & Private</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
