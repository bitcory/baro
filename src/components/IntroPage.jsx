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
        "bg-memphis-bg",
        "transition-opacity duration-500",
        isExiting && "opacity-0 pointer-events-none"
      )}
    >
      {/* Memphis Decorative Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Geometric shapes */}
        <div className="absolute top-[10%] left-[10%] w-20 h-20 bg-memphis-pink border-4 border-memphis-black rotate-12 animate-float" />
        <div className="absolute top-[20%] right-[15%] w-16 h-16 bg-memphis-yellow border-4 border-memphis-black rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-[30%] left-[20%] w-12 h-12 bg-memphis-teal border-4 border-memphis-black animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-[20%] right-[25%] w-24 h-24 bg-memphis-purple border-4 border-memphis-black rotate-45 animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-[40%] left-[5%] w-8 h-8 bg-memphis-orange border-4 border-memphis-black rounded-full animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[60%] right-[10%] w-14 h-14 bg-memphis-blue border-4 border-memphis-black rotate-12 animate-float" style={{ animationDelay: '0.8s' }} />

        {/* Pattern dots */}
        <div className="absolute inset-0 pattern-dots opacity-10" />
      </div>

      {/* Content */}
      <div className={cn(
        "relative z-10 text-center px-6",
        "transition-all duration-700",
        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}>
        {/* Logo */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-memphis-yellow border-2 border-memphis-black shadow-memphis-sm mb-6">
            <Sparkles className="w-4 h-4 text-memphis-black" />
            <span className="text-sm font-bold text-memphis-black uppercase">AI Tools Directory</span>
          </div>
          <h1 className="text-6xl sm:text-8xl font-bold text-memphis-black uppercase tracking-tight">
            <span className="inline-block bg-memphis-pink px-4 py-2 border-4 border-memphis-black shadow-memphis-lg rotate-[-2deg]">
              BAROGA
            </span>
          </h1>
        </div>

        <p className="text-lg font-medium text-memphis-black mb-10 max-w-md mx-auto">
          <span className="bg-memphis-cream px-2">AI 도구들을 한눈에 모아보고 빠르게 접근하세요</span>
        </p>

        {/* Enter Button */}
        <button
          onClick={handleEnter}
          className={cn(
            "px-8 py-4",
            "bg-memphis-teal border-4 border-memphis-black",
            "text-memphis-black font-bold text-lg uppercase",
            "shadow-memphis-lg hover:shadow-memphis-xl",
            "hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0",
            "transition-all duration-100",
            "flex items-center gap-3 mx-auto"
          )}
        >
          <span>시작하기</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        <p className="mt-8 text-sm font-medium text-memphis-gray">
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
