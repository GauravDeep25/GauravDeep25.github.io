import { useEffect, useState } from 'react';

export default function Loading() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[10000] bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center transition-opacity duration-500">
      <div className="relative">
        {/* Animated Orbs */}
        <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-cyan-300 border-b-transparent rounded-full animate-spin [animation-direction:reverse] opacity-50"></div>
      </div>
      
      <div className="mt-8 font-heading font-bold text-2xl text-slate-900 dark:text-white flex items-center gap-2">
        <span>Initializing</span>
        <span className="flex gap-1">
          <span className="animate-bounce [animation-delay:0s]">.</span>
          <span className="animate-bounce [animation-delay:0.2s]">.</span>
          <span className="animate-bounce [animation-delay:0.4s]">.</span>
        </span>
      </div>
      
      <div className="mt-2 font-hand text-xl text-primary-500">
        Preparing Magic Spells...
      </div>
    </div>
  );
}