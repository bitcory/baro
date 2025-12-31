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
        'bg-white/80 backdrop-blur-lg border-b border-gray-100',
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
              <h1 className="text-2xl font-bold bg-gradient-to-r from-duo-primary to-duo-accent bg-clip-text text-transparent">
                {logo}
              </h1>
            </a>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={onBackup}
              className="p-2.5 rounded-xl text-duo-text-muted hover:text-duo-primary hover:bg-duo-primary/10 transition-colors"
              title="백업 다운로드"
            >
              <Download size={18} />
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2.5 rounded-xl text-duo-text-muted hover:text-duo-primary hover:bg-duo-primary/10 transition-colors"
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
                "px-4 py-2 rounded-xl font-medium flex items-center gap-2 transition-all",
                editMode
                  ? "bg-duo-primary text-white shadow-soft"
                  : "bg-duo-muted text-duo-text hover:bg-duo-primary/10"
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
              className="p-2.5 rounded-xl text-duo-text-muted hover:bg-duo-muted transition-colors"
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
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-3 space-y-2">
            <button
              onClick={onBackup}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-duo-text hover:bg-duo-muted transition-colors"
            >
              <Download size={18} />
              백업 다운로드
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-duo-text hover:bg-duo-muted transition-colors"
            >
              <Upload size={18} />
              백업 복원
            </button>
            <button
              onClick={onEditToggle}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors",
                editMode
                  ? "bg-duo-primary text-white"
                  : "text-duo-text hover:bg-duo-muted"
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
