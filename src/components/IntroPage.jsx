import { useState, useEffect } from 'react';
import { cn } from '../utils/cn';

export const IntroPage = ({ onEnter }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // iframe 로딩 후 fade in
    const timer = setTimeout(() => setIsLoaded(true), 500);
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
        "bg-neo-bg",
        "transition-opacity duration-400",
        isExiting && "opacity-0 pointer-events-none"
      )}
    >
      {/* Spline 3D Background - 워터마크 숨김을 위해 확대 */}
      <div className="absolute inset-0 overflow-hidden">
        <iframe
          src="https://my.spline.design/discover-k8M4gicgXa6f02TysWCbNqtP/"
          frameBorder="0"
          className={cn(
            "absolute",
            "w-[calc(100%+200px)] h-[calc(100%+200px)]",
            "-top-[50px] -left-[100px]",
            "transition-opacity duration-1000",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          style={{
            pointerEvents: 'auto'
          }}
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />

      {/* Content */}
      <div className={cn(
        "relative z-10 text-center px-6",
        "transition-all duration-500 delay-300",
        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}>
        {/* Logo Box */}
        <div className={cn(
          "inline-block px-8 py-4 mb-6",
          "bg-neo-yellow border-4 border-black shadow-neo-lg"
        )}>
          <h1 className="text-5xl sm:text-7xl font-black text-black">
            BAROGA
          </h1>
        </div>

        <p className={cn(
          "inline-block px-4 py-2 mb-8",
          "bg-white border-3 border-black shadow-neo-sm",
          "text-lg sm:text-xl font-bold text-black"
        )}>
          AI Tools Directory
        </p>

        {/* Enter Button */}
        <div>
          <button
            onClick={handleEnter}
            className={cn(
              "px-8 py-4",
              "bg-neo-green border-4 border-black shadow-neo",
              "text-black font-black text-xl",
              "hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-neo-lg",
              "active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
              "flex items-center gap-3 mx-auto"
            )}
          >
            <span>Enter</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>

        {/* Skip hint */}
        <p className={cn(
          "mt-6 px-3 py-1",
          "bg-black text-white text-sm font-bold",
          "inline-block"
        )}>
          Click anywhere to enter
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
