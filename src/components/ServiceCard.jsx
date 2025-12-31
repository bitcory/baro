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

  // Get icon URL
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
        "bg-white border-3 border-black shadow-neo",
        "hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-neo-hover",
        "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
        editMode ? "cursor-move" : "cursor-pointer",
        className
      )}
    >
      {/* Content */}
      <div className="p-4 flex flex-col items-center justify-center space-y-3 h-full min-h-[140px]">
        {/* Icon */}
        <div className={cn(
          "w-14 h-14",
          "bg-neo-bg border-3 border-black",
          "flex items-center justify-center",
          "group-hover:bg-neo-yellow"
        )}>
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
            <Globe className="w-6 h-6 text-black" />
          )}
        </div>

        {/* Service Name */}
        <div className="text-center">
          <h3 className="text-sm font-bold text-black line-clamp-1">
            {service.name}
          </h3>
          {showCategory && (
            <span className="inline-block mt-1.5 px-2 py-0.5 text-xs font-bold bg-neo-blue border-2 border-black">
              {showCategory}
            </span>
          )}
          {service.description && (
            <p className="text-xs text-gray-600 mt-1 line-clamp-2">
              {service.description}
            </p>
          )}
        </div>

        {/* Hover Indicator */}
        {!editMode && (
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="p-1 bg-neo-green border-2 border-black">
              <ExternalLink className="w-3.5 h-3.5 text-black" />
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
              className="p-1.5 bg-neo-blue border-2 border-black hover:shadow-neo-sm"
            >
              <Edit2 size={12} className="text-black" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="p-1.5 bg-neo-red border-2 border-black hover:shadow-neo-sm"
            >
              <Trash2 size={12} className="text-black" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
