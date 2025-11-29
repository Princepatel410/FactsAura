import { useState } from 'react';
import { Play, Pause, RotateCcw, Gauge } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedButton } from './AnimatedButton';

interface DemoControlPanelProps {
    speed: number;
    isPaused: boolean;
    progress: number;
    onSpeedChange: (speed: number) => void;
    onPause: () => void;
    onResume: () => void;
    onReset: () => void;
}

export function DemoControlPanel({
    speed,
    isPaused,
    progress,
    onSpeedChange,
    onPause,
    onResume,
    onReset,
}: DemoControlPanelProps) {
    const [showResetConfirm, setShowResetConfirm] = useState(false);

    const handleReset = () => {
        setShowResetConfirm(true);
    };

    const confirmReset = () => {
        onReset();
        setShowResetConfirm(false);
    };

    const cancelReset = () => {
        setShowResetConfirm(false);
    };

    return (
        <div className="fixed bottom-6 right-6 z-40">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel border border-slate-700/50 rounded-2xl p-6 shadow-2xl"
            >
                <div className="flex items-center gap-2 mb-4">
                    <Gauge className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-slate-200 font-semibold">Demo Controls</h3>
                </div>

                {/* Playback Controls */}
                <div className="flex items-center gap-3 mb-4">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={isPaused ? onResume : onPause}
                        className={`p-3 rounded-xl transition-all shadow-lg group relative overflow-hidden ${
                            isPaused
                                ? 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 shadow-emerald-500/20'
                                : 'bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 shadow-yellow-500/20'
                        }`}
                        title={isPaused ? 'Resume' : 'Pause'}
                    >
                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                            isPaused ? 'bg-emerald-500/10' : 'bg-yellow-500/10'
                        }`} />
                        {isPaused ? <Play className="w-5 h-5 relative z-10" /> : <Pause className="w-5 h-5 relative z-10" />}
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.1, rotate: -180 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleReset}
                        className="p-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-all shadow-lg shadow-red-500/20 group relative overflow-hidden"
                        title="Reset Demo"
                    >
                        <div className="absolute inset-0 bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <RotateCcw className="w-5 h-5 relative z-10 transition-transform duration-300" />
                    </motion.button>
                </div>

                {/* Speed Slider */}
                <div className="mb-4 group">
                    <label className="text-slate-300 text-sm mb-2 block font-medium group-hover:text-slate-200 transition-colors">
                        Speed: <span className="text-emerald-400 group-hover:text-emerald-300 transition-colors">{speed}x</span>
                    </label>
                    <div className="relative">
                        <input
                            type="range"
                            min="0.5"
                            max="5"
                            step="0.5"
                            value={speed}
                            onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
                            className="w-full h-2 bg-slate-700/50 rounded-lg appearance-none cursor-pointer slider hover:bg-slate-700 transition-colors"
                        />
                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/20 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg blur-sm" />
                    </div>
                    <div className="flex justify-between text-xs text-slate-500 mt-1 group-hover:text-slate-400 transition-colors">
                        <span>0.5x</span>
                        <span>5x</span>
                    </div>
                </div>

                {/* Progress Indicator */}
                <div className="mb-2">
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Progress</span>
                        <span className="text-emerald-400 font-medium">{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-lg shadow-emerald-500/50"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                </div>

                {/* Pause State Indicator */}
                <AnimatePresence>
                    {isPaused && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-3 p-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg shadow-lg shadow-yellow-500/10"
                        >
                            <p className="text-yellow-400 text-xs text-center font-medium">
                                ⏸ Demo Paused
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Reset Confirmation Dialog */}
            <AnimatePresence>
                {showResetConfirm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
                        onClick={cancelReset}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="glass-panel border border-slate-700/50 rounded-2xl p-6 max-w-sm mx-4 shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="text-slate-200 font-semibold text-lg mb-2">
                                Reset Demo?
                            </h3>
                            <p className="text-slate-400 text-sm mb-6">
                                This will clear all data and restart the simulation from the beginning.
                            </p>
                            <div className="flex gap-3">
                                <AnimatedButton
                                    onClick={cancelReset}
                                    variant="secondary"
                                    className="flex-1"
                                >
                                    Cancel
                                </AnimatedButton>
                                <AnimatedButton
                                    onClick={confirmReset}
                                    icon={RotateCcw}
                                    variant="danger"
                                    className="flex-1"
                                >
                                    Reset
                                </AnimatedButton>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
