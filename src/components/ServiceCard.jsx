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

  // Random accent colors for Memphis style
  const accentColors = [
    'bg-memphis-pink',
    'bg-memphis-yellow',
    'bg-memphis-teal',
    'bg-memphis-orange',
    'bg-memphis-purple',
  ];
  const randomColor = accentColors[service.id % accentColors.length];

  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative",
        "bg-white border-2 border-memphis-black",
        "shadow-memphis-sm hover:shadow-memphis",
        "hover:-translate-x-1 hover:-translate-y-1",
        "transition-all duration-100",
        editMode ? "cursor-move" : "cursor-pointer",
        className
      )}
    >
      {/* Decorative corner */}
      <div className={cn("absolute -top-1 -right-1 w-3 h-3 border-2 border-memphis-black", randomColor)}></div>

      <div className="p-5 flex flex-col items-center justify-center space-y-3 h-full min-h-[140px]">
        {/* Icon */}
        <div className={cn("w-14 h-14 border-2 border-memphis-black flex items-center justify-center", randomColor)}>
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
            <Globe className="w-6 h-6 text-memphis-black" />
          )}
        </div>

        {/* Service Name */}
        <div className="text-center">
          <h3 className="text-sm font-bold text-memphis-black uppercase line-clamp-1">
            {service.name}
          </h3>
          {showCategory && (
            <span className="inline-block mt-1.5 px-2 py-0.5 text-xs font-bold bg-memphis-yellow border border-memphis-black text-memphis-black">
              {showCategory}
            </span>
          )}
          {service.description && (
            <p className="text-xs text-memphis-gray mt-1 line-clamp-2">
              {service.description}
            </p>
          )}
        </div>

        {/* Hover Indicator */}
        {!editMode && (
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100">
            <div className="p-1.5 bg-memphis-teal border border-memphis-black">
              <ExternalLink className="w-3.5 h-3.5 text-memphis-black" />
            </div>
          </div>
        )}

        {/* Edit Mode Actions */}
        {editMode && (
          <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="p-2 bg-memphis-teal border border-memphis-black text-memphis-black hover:scale-110"
            >
              <Edit2 size={12} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="p-2 bg-memphis-red border border-memphis-black text-white hover:scale-110"
            >
              <Trash2 size={12} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
