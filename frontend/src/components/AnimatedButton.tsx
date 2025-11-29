import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  icon?: LucideIcon;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export const AnimatedButton = ({
  children,
  onClick,
  icon: Icon,
  variant = 'primary',
  disabled = false,
  type = 'button',
  className = '',
}: AnimatedButtonProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white border-emerald-500/50';
      case 'secondary':
        return 'bg-slate-700/50 hover:bg-slate-700 text-slate-200 border-slate-600/50';
      case 'danger':
        return 'bg-red-500/20 hover:bg-red-500/30 text-red-400 border-red-500/50';
      case 'success':
        return 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border-emerald-500/50';
      default:
        return 'bg-slate-700/50 hover:bg-slate-700 text-slate-200 border-slate-600/50';
    }
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`
        relative overflow-hidden px-6 py-3 rounded-lg font-medium
        border shadow-lg transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        group
        ${getVariantClasses()}
        ${className}
      `}
    >
      {/* Sliding icon overlay */}
      {Icon && (
        <span className="absolute inset-0 flex items-center justify-center size-full duration-700 ease-[cubic-bezier(0.50,0.20,0,1)] -translate-x-full group-hover:translate-x-0 bg-slate-900 dark:bg-slate-100">
          <Icon className="w-5 h-5 text-emerald-400" />
        </span>
      )}

      {/* Text that slides out */}
      <span className="absolute flex items-center justify-center w-full h-full transition-all duration-500 ease-out transform group-hover:translate-x-full">
        {children}
      </span>

      {/* Invisible spacer to maintain button size */}
      <span className="relative invisible flex items-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};
