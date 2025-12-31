import React, { useState } from 'react';
import { cn } from '../utils/cn';
import { ExternalLink, Edit2, Trash2, Globe } from 'lucide-react';

export const ServiceCard = ({
  service,
  onClick,
  editMode,
  onEdit,
  onDelete,
  showCategory,
  className
}) => {
  const [imgError, setImgError] = useState(false);

  const getIconUrl = () => {
    if (service.icon && !service.icon.startsWith('http')) return null;
    if (service.icon) return service.icon;

    if (service.url && service.url.startsWith('http')) {
      try {
        const domain = new URL(service.url).hostname;
        return `https://icons.duckduckgo.com/ip3/${domain}.ico`;
      } catch {
        return null;
      }
    }
    return null;
  };

  const iconUrl = getIconUrl();
  const showEmoji = service.icon && !service.icon.startsWith('http');

  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative",
        "bg-white rounded-2xl shadow-soft",
        "hover:shadow-soft-lg hover:-translate-y-1",
        "transition-all duration-200",
        editMode ? "cursor-move" : "cursor-pointer",
        className
      )}
    >
      <div className="p-5 flex flex-col items-center justify-center space-y-3 h-full min-h-[140px]">
        {/* Icon */}
        <div className="w-14 h-14 bg-duo-muted rounded-xl flex items-center justify-center group-hover:bg-duo-primary/10 transition-colors">
          {showEmoji ? (
            <span className="text-2xl">{service.icon}</span>
          ) : iconUrl && !imgError ? (
            <img
              src={iconUrl}
              alt={service.name}
              className="w-8 h-8 object-contain"
              onError={() => setImgError(true)}
            />
          ) : (
            <Globe className="w-6 h-6 text-duo-text-light" />
          )}
        </div>

        {/* Service Name */}
        <div className="text-center">
          <h3 className="text-sm font-semibold text-duo-text line-clamp-1">
            {service.name}
          </h3>
          {showCategory && (
            <span className="inline-block mt-1.5 px-2 py-0.5 text-xs font-medium bg-duo-primary/10 text-duo-primary rounded-full">
              {showCategory}
            </span>
          )}
          {service.description && (
            <p className="text-xs text-duo-text-muted mt-1 line-clamp-2">
              {service.description}
            </p>
          )}
        </div>

        {/* Hover Indicator */}
        {!editMode && (
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="p-1.5 bg-duo-primary/10 rounded-lg">
              <ExternalLink className="w-3.5 h-3.5 text-duo-primary" />
            </div>
          </div>
        )}

        {/* Edit Mode Actions */}
        {editMode && (
          <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="p-2 bg-duo-primary text-white rounded-lg shadow-soft hover:scale-110 transition-transform"
            >
              <Edit2 size={12} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="p-2 bg-red-500 text-white rounded-lg shadow-soft hover:scale-110 transition-transform"
            >
              <Trash2 size={12} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
