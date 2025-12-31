import { useState, useEffect } from 'react';
import { cn } from '../utils/cn';
import { ArrowRight, Sparkles } from 'lucide-react';

export const IntroPage = ({ onEnter }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(() => {
      onEnter();
    }, 400);
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center",
        "bg-[#0f0f1a]",
        "transition-opacity duration-500",
        isExiting && "opacity-0 pointer-events-none"
      )}
    >
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#FFE156]/5 rotate-12 animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-[#FFE156]/5 -rotate-12 animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-32 h-32 border-4 border-[#FFE156]/20 rotate-45 animate-float" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Content */}
      <div className={cn(
        "relative z-10 text-center px-6",
        "transition-all duration-700",
        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}>
        {/* Logo */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a1a2e] border-2 border-[#FFE156] mb-4">
            <Sparkles className="w-4 h-4 text-[#FFE156]" />
            <span className="text-sm font-bold text-[#FFE156] uppercase tracking-wider">AI Tools Directory</span>
          </div>
          <h1 className="text-6xl sm:text-8xl font-black text-[#FFE156] uppercase tracking-tight">
            BAROGA
          </h1>
        </div>

        <p className="text-lg text-gray-400 mb-10 max-w-md mx-auto">
          AI 도구들을 한눈에 모아보고 빠르게 접근하세요
        </p>

        {/* Enter Button */}
        <button
          onClick={handleEnter}
          className={cn(
            "px-8 py-4",
            "bg-[#FFE156] border-4 border-[#0f0f1a]",
            "text-[#0f0f1a] font-black text-lg uppercase",
            "shadow-[4px_4px_0px_#FFE156] hover:shadow-[6px_6px_0px_#FFE156]",
            "hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0",
            "transition-all duration-100",
            "flex items-center gap-3 mx-auto"
          )}
        >
          <span>시작하기</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        <p className="mt-8 text-sm text-gray-500">
          화면 아무 곳이나 클릭해도 시작됩니다
        </p>
      </div>

      {/* Click anywhere to enter */}
      <div
        className="absolute inset-0 z-[5] cursor-pointer"
        onClick={handleEnter}
      />
    </div>
  );
};
