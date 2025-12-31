import React, { useState, useRef } from 'react';
import { cn } from '../utils/cn';
import { Menu, X, Edit2, Download, Upload } from 'lucide-react';

export const Navbar = ({
  logo = 'BAROGA',
  editMode,
  onEditToggle,
  onLogoClick,
  onBackup,
  onRestore,
  className
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const fileInputRef = useRef(null);

  return (
    <nav
      className={cn(
        'w-full sticky top-0 z-50',
        'bg-memphis-cream border-b-4 border-memphis-black',
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                if (onLogoClick) {
                  onLogoClick();
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="flex-shrink-0 cursor-pointer group"
            >
              <h1 className="text-2xl font-bold text-memphis-black uppercase tracking-tight">
                <span className="inline-block bg-memphis-pink px-2 border-2 border-memphis-black shadow-memphis-sm group-hover:rotate-2 transition-transform">
                  {logo}
                </span>
              </h1>
            </a>
          </div>

          {/* Decorative shapes */}
          <div className="hidden lg:flex items-center gap-3 absolute left-1/2 transform -translate-x-1/2">
            <div className="w-3 h-3 bg-memphis-yellow border-2 border-memphis-black rotate-45"></div>
            <div className="w-4 h-4 bg-memphis-teal border-2 border-memphis-black rounded-full"></div>
            <div className="w-3 h-3 bg-memphis-pink border-2 border-memphis-black"></div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={onBackup}
              className="p-2.5 border-2 border-memphis-black bg-white text-memphis-black hover:bg-memphis-yellow shadow-memphis-sm hover:shadow-memphis hover:-translate-x-0.5 hover:-translate-y-0.5"
              title="백업 다운로드"
            >
              <Download size={18} />
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2.5 border-2 border-memphis-black bg-white text-memphis-black hover:bg-memphis-teal shadow-memphis-sm hover:shadow-memphis hover:-translate-x-0.5 hover:-translate-y-0.5"
              title="백업 복원"
            >
              <Upload size={18} />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  onRestore(file);
                  e.target.value = '';
                }
              }}
            />

            <button
              onClick={onEditToggle}
              className={cn(
                "px-4 py-2 font-bold uppercase flex items-center gap-2 border-2 border-memphis-black",
                editMode
                  ? "bg-memphis-pink text-memphis-black shadow-memphis"
                  : "bg-white text-memphis-black shadow-memphis-sm hover:shadow-memphis hover:-translate-x-0.5 hover:-translate-y-0.5"
              )}
            >
              <Edit2 size={16} />
              {editMode ? '편집중' : '편집'}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 border-2 border-memphis-black bg-white text-memphis-black hover:bg-memphis-yellow"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-2 border-memphis-black bg-memphis-cream">
          <div className="px-4 py-3 space-y-2">
            <button
              onClick={onBackup}
              className="w-full flex items-center gap-3 px-4 py-3 border-2 border-memphis-black bg-white text-memphis-black font-bold hover:bg-memphis-yellow shadow-memphis-sm"
            >
              <Download size={18} />
              백업 다운로드
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center gap-3 px-4 py-3 border-2 border-memphis-black bg-white text-memphis-black font-bold hover:bg-memphis-teal shadow-memphis-sm"
            >
              <Upload size={18} />
              백업 복원
            </button>
            <button
              onClick={onEditToggle}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 border-2 border-memphis-black font-bold",
                editMode
                  ? "bg-memphis-pink text-memphis-black shadow-memphis"
                  : "bg-white text-memphis-black hover:bg-memphis-yellow shadow-memphis-sm"
              )}
            >
              <Edit2 size={18} />
              편집 모드
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
