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
        "bg-gradient-to-br from-duo-bg via-white to-duo-muted",
        "transition-opacity duration-500",
        isExiting && "opacity-0 pointer-events-none"
      )}
    >
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-duo-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-duo-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      {/* Content */}
      <div className={cn(
        "relative z-10 text-center px-6",
        "transition-all duration-700",
        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}>
        {/* Logo */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-duo-primary/10 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-duo-primary" />
            <span className="text-sm font-medium text-duo-primary">AI Tools Directory</span>
          </div>
          <h1 className="text-6xl sm:text-8xl font-bold bg-gradient-to-r from-duo-primary to-duo-accent bg-clip-text text-transparent">
            BAROGA
          </h1>
        </div>

        <p className="text-lg text-duo-text-muted mb-10 max-w-md mx-auto">
          AI 도구들을 한눈에 모아보고 빠르게 접근하세요
        </p>

        {/* Enter Button */}
        <button
          onClick={handleEnter}
          className={cn(
            "px-8 py-4 rounded-2xl",
            "bg-gradient-to-r from-duo-primary to-duo-accent",
            "text-white font-semibold text-lg",
            "shadow-soft-lg hover:shadow-glow",
            "hover:-translate-y-1 active:translate-y-0",
            "transition-all duration-200",
            "flex items-center gap-3 mx-auto"
          )}
        >
          <span>시작하기</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        <p className="mt-8 text-sm text-duo-text-light">
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
