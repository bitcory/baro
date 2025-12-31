import React, { useState, useRef } from 'react';
import { cn } from '../utils/cn';
import { Menu, X, Edit2, Download, Upload } from 'lucide-react';

export const Navbar = ({
  logo = 'BAROGA',
  onThemeToggle,
  theme = 'dark',
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
        'bg-neo-yellow border-b-3 border-black',
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
              <h1 className={cn(
                "text-2xl font-black text-black",
                "hover:rotate-[-2deg]",
                "transition-transform duration-100"
              )}>
                {logo}
              </h1>
            </a>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Backup Button */}
            <button
              onClick={onBackup}
              className={cn(
                "p-2 bg-neo-blue border-3 border-black shadow-neo-sm",
                "hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-neo",
                "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              )}
              aria-label="Download backup"
              title="백업 다운로드"
            >
              <Download size={18} className="text-black" />
            </button>

            {/* Restore Button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                "p-2 bg-neo-green border-3 border-black shadow-neo-sm",
                "hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-neo",
                "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              )}
              aria-label="Upload backup"
              title="백업 복원"
            >
              <Upload size={18} className="text-black" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              style={{ display: 'none' }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  onRestore(file);
                  e.target.value = '';
                }
              }}
            />

            {/* Edit Mode Toggle */}
            <button
              onClick={onEditToggle}
              className={cn(
                "px-4 py-2 font-bold border-3 border-black shadow-neo-sm",
                "flex items-center gap-2",
                "hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-neo",
                "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
                editMode ? "bg-neo-pink" : "bg-white"
              )}
            >
              <Edit2 size={16} className={editMode ? "animate-spin" : ""} />
              {editMode ? '편집중' : '편집'}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                "p-2 bg-white border-3 border-black shadow-neo-sm",
                "hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-neo",
                "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              )}
            >
              {mobileMenuOpen ? (
                <X className="block h-5 w-5 text-black" />
              ) : (
                <Menu className="block h-5 w-5 text-black" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-3 border-black bg-white">
          <div className="px-4 py-3 space-y-2">
            <button
              onClick={onBackup}
              className="w-full flex items-center gap-3 px-4 py-3 bg-neo-blue border-3 border-black font-bold hover:shadow-neo-sm"
            >
              <Download size={18} />
              백업 다운로드
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center gap-3 px-4 py-3 bg-neo-green border-3 border-black font-bold hover:shadow-neo-sm"
            >
              <Upload size={18} />
              백업 복원
            </button>
            <button
              onClick={onEditToggle}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 border-3 border-black font-bold hover:shadow-neo-sm",
                editMode ? "bg-neo-pink" : "bg-white"
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
