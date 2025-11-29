import React, { useState } from 'react';
import { Send, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

interface SubmissionFormProps {
    onSubmit: (text: string) => void;
    isLoading: boolean;
}

export const SubmissionForm: React.FC<SubmissionFormProps> = ({ onSubmit, isLoading }) => {
    const [text, setText] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            onSubmit(text);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl opacity-20 group-hover:opacity-40 group-focus-within:opacity-50 transition duration-500 blur"></div>
                <div className="relative bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 group-hover:border-white/20 group-focus-within:border-emerald-500/50 transition-all duration-300 p-1">
                    <div className="flex items-center space-x-2 px-4 py-2 border-b border-white/5 text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                        <FileText className="w-4 h-4 group-focus-within:text-emerald-400 transition-colors" />
                        <span>Content Analysis Input</span>
                        <div className="ml-auto flex items-center gap-2">
                            <span className="text-xs text-gray-600">{text.length} chars</span>
                        </div>
                    </div>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Paste suspicious text, news articles, or social media posts here for verification..."
                        className="w-full h-40 bg-transparent text-gray-200 p-4 focus:outline-none resize-none placeholder-gray-600 focus:placeholder-gray-500 transition-colors"
                        disabled={isLoading}
                    />
                </div>
            </div>

            <div className="flex justify-end">
                <motion.button
                    type="submit"
                    disabled={!text.trim() || isLoading}
                    whileHover={{ scale: !text.trim() || isLoading ? 1 : 1.05 }}
                    whileTap={{ scale: !text.trim() || isLoading ? 1 : 0.95 }}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold rounded-lg shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-emerald-500/30"
                >
                    <Send className={`w-5 h-5 ${isLoading ? 'animate-pulse' : ''}`} />
                    <span>{isLoading ? 'Processing...' : 'Verify Content'}</span>
                </motion.button>
            </div>
        </form>
    );
};
