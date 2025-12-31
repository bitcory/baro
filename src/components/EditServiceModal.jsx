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
      return [`https://icons.duckduckgo.com/ip3/${domain}.ico`];
    } catch {
      return [];
    }
  };

  const handleUrlChange = (e) => {
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
        finalIcon = faviconUrls.length > 0 ? faviconUrls[0] : '';
      }
      onSave({ ...service, ...formData, icon: finalIcon });
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
      <div className="absolute inset-0 bg-memphis-black/30" onClick={onClose} />

      <div className={cn(
        "relative w-full max-w-md",
        "bg-memphis-cream border-4 border-memphis-black shadow-memphis-xl",
        "animate-scale-in"
      )}>
        {/* Decorative shapes */}
        <div className="absolute -top-3 -left-3 w-6 h-6 bg-memphis-pink border-2 border-memphis-black rotate-12"></div>
        <div className="absolute -top-2 -right-4 w-8 h-8 bg-memphis-yellow border-2 border-memphis-black rounded-full"></div>
        <div className="absolute -bottom-2 -right-2 w-5 h-5 bg-memphis-teal border-2 border-memphis-black"></div>

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-4 border-memphis-black">
          <h2 className="text-xl font-bold text-memphis-black uppercase">서비스 편집</h2>
          <button
            onClick={onClose}
            className="p-2 border-2 border-memphis-black bg-white text-memphis-black hover:bg-memphis-pink"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-bold text-memphis-black uppercase mb-2">
              서비스 이름
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="memphis-input"
              placeholder="예: ChatGPT"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-memphis-black uppercase mb-2">
              URL
            </label>
            <input
              type="url"
              value={formData.url}
              onChange={handleUrlChange}
              className="memphis-input"
              placeholder="https://example.com"
              required
            />
            {formData.url && (
              <p className="mt-2 text-xs text-memphis-gray font-medium">
                파비콘이 자동으로 감지됩니다
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-memphis-black uppercase mb-2">
              아이콘
            </label>
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-memphis-yellow border-2 border-memphis-black flex items-center justify-center">
                {isLoadingFavicon ? (
                  <Loader2 className="w-6 h-6 text-memphis-black animate-spin" />
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
                  <Globe className="w-6 h-6 text-memphis-black" />
                )}
              </div>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                className="memphis-input flex-1"
                placeholder="비워두면 자동 감지"
              />
            </div>
            {faviconError && (
              <p className="mt-2 text-xs text-memphis-orange font-bold">
                파비콘을 불러올 수 없습니다
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 font-bold uppercase text-memphis-black bg-white border-2 border-memphis-black shadow-memphis-sm hover:bg-memphis-cream"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 font-bold uppercase text-memphis-black bg-memphis-teal border-2 border-memphis-black shadow-memphis hover:shadow-memphis-lg hover:-translate-x-0.5 hover:-translate-y-0.5 flex items-center justify-center gap-2"
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
