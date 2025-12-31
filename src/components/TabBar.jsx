import React, { useState, useRef } from 'react';
import { cn } from '../utils/cn';
import { Plus, Edit2, X, GripVertical } from 'lucide-react';

export const TabBar = ({
  categories,
  activeTab,
  onTabChange,
  editMode,
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
  onReorderCategories,
  className
}) => {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const draggedItem = useRef(null);
  const scrollContainerRef = useRef(null);

  const handleDragStart = (e, index) => {
    draggedItem.current = index;
    setDraggedIndex(index);
    setIsDragging(true);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    if (draggedItem.current === null) return;
    setDragOverIndex(index);
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
    setIsDragging(false);
    draggedItem.current = null;
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    e.stopPropagation();
    const dragIndex = draggedItem.current;

    if (dragIndex === null || dragIndex === dropIndex) {
      handleDragEnd();
      return;
    }

    const newCategories = [...categories];
    const draggedCategory = newCategories[dragIndex];
    newCategories.splice(dragIndex, 1);
    newCategories.splice(dropIndex, 0, draggedCategory);

    if (onReorderCategories) {
      onReorderCategories(newCategories);
    }

    if (activeTab === dragIndex) {
      onTabChange(dropIndex);
    } else if (dragIndex < activeTab && dropIndex >= activeTab) {
      onTabChange(activeTab - 1);
    } else if (dragIndex > activeTab && dropIndex <= activeTab) {
      onTabChange(activeTab + 1);
    }

    handleDragEnd();
  };

  return (
    <div className={cn(
      'sticky top-16 z-40 w-full',
      'bg-white/80 backdrop-blur-lg border-b border-gray-100',
      className
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={scrollContainerRef}
          className={cn(
            "flex items-center gap-2 py-3",
            editMode ? "flex-wrap" : "overflow-x-auto scrollbar-hide"
          )}
        >
          {categories.map((category, index) => (
            <div
              key={category.id}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              className="relative"
            >
              <button
                onClick={() => !isDragging && onTabChange(index)}
                onDragStart={(e) => handleDragStart(e, index)}
                onDragEnd={handleDragEnd}
                draggable={editMode}
                className={cn(
                  "group relative whitespace-nowrap px-4 py-2 rounded-xl font-medium",
                  "flex items-center gap-2 select-none transition-all duration-200",
                  activeTab === index
                    ? "bg-duo-primary text-white shadow-soft"
                    : "text-duo-text-muted hover:text-duo-text hover:bg-duo-muted",
                  draggedIndex === index && "opacity-30",
                  dragOverIndex === index && draggedIndex !== index && "bg-duo-primary/20",
                  editMode && "cursor-move"
                )}
              >
                {editMode && (
                  <GripVertical size={14} className="opacity-50" />
                )}
                <span>{category.name}</span>
                <span className={cn(
                  "px-2 py-0.5 text-xs font-semibold rounded-full",
                  activeTab === index
                    ? "bg-white/20 text-white"
                    : "bg-duo-primary/10 text-duo-primary"
                )}>
                  {category.services.length}
                </span>

                {editMode && !isDragging && (
                  <div className="absolute -top-1 -right-1 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditCategory(category.id);
                      }}
                      className="p-1 bg-duo-primary text-white rounded-full shadow-soft hover:scale-110 transition-transform"
                    >
                      <Edit2 size={10} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteCategory(category.id);
                      }}
                      className="p-1 bg-red-500 text-white rounded-full shadow-soft hover:scale-110 transition-transform"
                    >
                      <X size={10} />
                    </button>
                  </div>
                )}
              </button>
            </div>
          ))}

          <button
            onClick={onAddCategory}
            className={cn(
              "whitespace-nowrap px-4 py-2 rounded-xl",
              "text-duo-text-light hover:text-duo-primary",
              "border-2 border-dashed border-gray-200 hover:border-duo-primary",
              "flex items-center gap-2 transition-all duration-200"
            )}
          >
            <Plus size={16} />
            추가
          </button>
        </div>
      </div>
    </div>
  );
};
