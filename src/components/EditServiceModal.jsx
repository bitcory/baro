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
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />

      <div className={cn(
        "relative w-full max-w-md",
        "bg-white rounded-3xl shadow-soft-xl",
        "animate-scale-in"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-duo-text">서비스 편집</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-duo-text-muted hover:bg-duo-muted transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-duo-text mb-2">
              서비스 이름
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="friendly-input"
              placeholder="예: ChatGPT"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-duo-text mb-2">
              URL
            </label>
            <input
              type="url"
              value={formData.url}
              onChange={handleUrlChange}
              className="friendly-input"
              placeholder="https://example.com"
              required
            />
            {formData.url && (
              <p className="mt-2 text-xs text-duo-text-muted">
                파비콘이 자동으로 감지됩니다
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-duo-text mb-2">
              아이콘
            </label>
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-duo-muted rounded-xl flex items-center justify-center">
                {isLoadingFavicon ? (
                  <Loader2 className="w-6 h-6 text-duo-primary animate-spin" />
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
                  <Globe className="w-6 h-6 text-duo-text-light" />
                )}
              </div>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                className="friendly-input flex-1"
                placeholder="비워두면 자동 감지"
              />
            </div>
            {faviconError && (
              <p className="mt-2 text-xs text-orange-500">
                파비콘을 불러올 수 없습니다
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-xl font-medium text-duo-text bg-duo-muted hover:bg-gray-200 transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 rounded-xl font-medium text-white bg-duo-primary hover:bg-duo-primary-dark shadow-soft transition-all flex items-center justify-center gap-2"
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
