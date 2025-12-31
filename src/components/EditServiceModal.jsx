import { useState, useEffect } from 'react';
import { X, Globe, Save, Loader2 } from 'lucide-react';
import { cn } from '../utils/cn';

export function EditServiceModal({ service, isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    icon: ''
  });
  const [isLoadingFavicon, setIsLoadingFavicon] = useState(false);
  const [faviconError, setFaviconError] = useState(false);

  useEffect(() => {
    if (service) {
      let iconValue = '';

      if (service.url && service.url.startsWith('http')) {
        try {
          const domain = new URL(service.url).hostname;
          iconValue = `https://icons.duckduckgo.com/ip3/${domain}.ico`;
        } catch {
          iconValue = '';
        }
      }

      setFormData({
        name: service.name || '',
        url: service.url || '',
        icon: iconValue
      });
    }
  }, [service]);

  const getFaviconUrl = (url) => {
    try {
      const domain = new URL(url).hostname;
      return [
        `https://icons.duckduckgo.com/ip3/${domain}.ico`,
        `https://www.google.com/s2/favicons?domain=${domain}&sz=64`,
        `https://icon.horse/icon/${domain}`
      ];
    } catch {
      return [];
    }
  };

  const handleUrlChange = async (e) => {
    const newUrl = e.target.value;
    setFormData(prev => ({ ...prev, url: newUrl }));
    setFaviconError(false);

    if (newUrl && newUrl.startsWith('http') && (!formData.icon || formData.icon.startsWith('http'))) {
      setIsLoadingFavicon(true);
      const faviconUrls = getFaviconUrl(newUrl);

      if (faviconUrls.length > 0) {
        setFormData(prev => ({ ...prev, icon: faviconUrls[0] }));
      }
      setIsLoadingFavicon(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.url) {
      let finalIcon = formData.icon;
      if (!finalIcon && formData.url && formData.url.startsWith('http')) {
        const faviconUrls = getFaviconUrl(formData.url);
        if (faviconUrls.length > 0) {
          finalIcon = faviconUrls[0];
        } else {
          finalIcon = '';
        }
      }

      onSave({
        ...service,
        ...formData,
        icon: finalIcon
      });
      onClose();
    }
  };

  const handleIconError = () => {
    setFaviconError(true);
    if (!formData.icon || formData.icon.startsWith('http')) {
      setFormData(prev => ({ ...prev, icon: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className={cn(
        "relative w-full max-w-md",
        "bg-white border-3 border-black shadow-neo-lg",
        "animate-scale-in"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b-3 border-black bg-neo-yellow">
          <h2 className="text-xl font-black text-black">
            서비스 편집
          </h2>
          <button
            onClick={onClose}
            className={cn(
              "p-2 bg-white border-3 border-black",
              "hover:bg-neo-red hover:shadow-neo-sm",
              "hover:translate-x-[-2px] hover:translate-y-[-2px]",
              "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            )}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Service Name */}
          <div>
            <label className="block text-sm font-bold text-black mb-2">
              서비스 이름
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className={cn(
                "w-full px-4 py-3",
                "bg-white border-3 border-black",
                "text-black placeholder-gray-500 font-medium",
                "focus:outline-none focus:shadow-neo-sm"
              )}
              placeholder="예: ChatGPT"
              required
            />
          </div>

          {/* URL */}
          <div>
            <label className="block text-sm font-bold text-black mb-2">
              URL
            </label>
            <input
              type="url"
              value={formData.url}
              onChange={handleUrlChange}
              className={cn(
                "w-full px-4 py-3",
                "bg-white border-3 border-black",
                "text-black placeholder-gray-500 font-medium",
                "focus:outline-none focus:shadow-neo-sm"
              )}
              placeholder="https://example.com"
              required
            />
            {formData.url && (
              <p className="mt-2 text-xs font-medium text-gray-600">
                파비콘이 자동으로 감지됩니다
              </p>
            )}
          </div>

          {/* Icon Preview and Input */}
          <div>
            <label className="block text-sm font-bold text-black mb-2">
              아이콘
            </label>
            <div className="flex items-center gap-3">
              {/* Icon Preview */}
              <div className={cn(
                "w-14 h-14",
                "bg-neo-bg border-3 border-black",
                "flex items-center justify-center"
              )}>
                {isLoadingFavicon ? (
                  <Loader2 className="w-6 h-6 text-black animate-spin" />
                ) : formData.icon ? (
                  formData.icon.startsWith('http') ? (
                    <img
                      src={formData.icon}
                      alt=""
                      className="w-8 h-8 object-contain"
                      onError={handleIconError}
                    />
                  ) : (
                    <span className="text-2xl">{formData.icon}</span>
                  )
                ) : (
                  <Globe className="w-6 h-6 text-black" />
                )}
              </div>

              {/* Icon Input */}
              <input
                type="text"
                value={formData.icon}
                onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                className={cn(
                  "flex-1 px-4 py-3",
                  "bg-white border-3 border-black",
                  "text-black placeholder-gray-500 font-medium",
                  "focus:outline-none focus:shadow-neo-sm"
                )}
                placeholder="비워두면 자동으로 파비콘 사용"
              />
            </div>
            {faviconError && (
              <p className="mt-2 text-xs font-bold text-neo-orange">
                파비콘을 불러올 수 없어 기본 아이콘을 사용합니다
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className={cn(
                "flex-1 px-4 py-3 font-bold",
                "bg-white border-3 border-black shadow-neo-sm",
                "hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-neo",
                "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              )}
            >
              취소
            </button>
            <button
              type="submit"
              className={cn(
                "flex-1 px-4 py-3 font-bold",
                "bg-neo-green border-3 border-black shadow-neo-sm",
                "hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-neo",
                "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
                "flex items-center justify-center gap-2"
              )}
            >
              <Save className="w-4 h-4" />
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
