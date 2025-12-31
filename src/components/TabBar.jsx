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

    const dragImage = e.currentTarget.cloneNode(true);
    dragImage.style.position = 'absolute';
    dragImage.style.top = '-1000px';
    document.body.appendChild(dragImage);
    e.dataTransfer.setDragImage(dragImage, e.currentTarget.offsetWidth / 2, e.currentTarget.offsetHeight / 2);
    setTimeout(() => document.body.removeChild(dragImage), 0);
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
      'bg-neo-bg border-b-3 border-neo-yellow/30',
      className
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={scrollContainerRef}
          className={cn(
            "flex items-center gap-2 py-3",
            editMode ? "flex-wrap" : "overflow-x-auto scrollbar-hide"
          )}
          style={{
            scrollBehavior: isDragging ? 'auto' : 'smooth',
            overflowX: editMode ? 'visible' : 'auto'
          }}
        >
          {/* Category Tabs */}
          {categories.map((category, index) => (
            <div
              key={category.id}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              className={cn(
                "relative",
                dragOverIndex === index && draggedIndex !== index && "translate-x-2"
              )}
            >
              <button
                onClick={() => !isDragging && onTabChange(index)}
                onDragStart={(e) => handleDragStart(e, index)}
                onDragEnd={handleDragEnd}
                draggable={editMode}
                className={cn(
                  "relative group whitespace-nowrap px-4 py-2",
                  "border-3 border-neo-yellow font-bold",
                  "flex items-center select-none",
                  activeTab === index
                    ? "bg-neo-pink text-black shadow-neo-sm translate-x-[-2px] translate-y-[-2px]"
                    : "bg-neo-card text-white hover:bg-neo-yellow hover:text-black hover:shadow-neo-sm hover:translate-x-[-2px] hover:translate-y-[-2px]",
                  draggedIndex === index && "opacity-30",
                  dragOverIndex === index && draggedIndex !== index && "bg-neo-green",
                  editMode && "cursor-move"
                )}
              >
                {/* Drag Handle */}
                {editMode && (
                  <GripVertical
                    size={14}
                    className={cn("mr-1.5 flex-shrink-0", activeTab === index ? "text-black" : "text-neo-yellow")}
                  />
                )}

                <span className="flex items-center gap-2 pointer-events-none">
                  {category.name}
                  <span className={cn(
                    "px-2 py-0.5 text-xs font-black border-2",
                    activeTab === index
                      ? "bg-neo-card border-neo-yellow text-white"
                      : "bg-neo-surface border-neo-yellow text-white"
                  )}>
                    {category.services.length}
                  </span>
                </span>

                {/* Edit Mode Actions */}
                {editMode && !isDragging && (
                  <div className="absolute -top-2 -right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditCategory(category.id);
                      }}
                      className="p-1 bg-neo-blue border-2 border-neo-yellow hover:shadow-neo-sm"
                    >
                      <Edit2 size={10} className="text-black" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteCategory(category.id);
                      }}
                      className="p-1 bg-neo-red border-2 border-neo-yellow hover:shadow-neo-sm"
                    >
                      <X size={10} className="text-black" />
                    </button>
                  </div>
                )}
              </button>
            </div>
          ))}

          {/* Add Category Button */}
          <button
            onClick={onAddCategory}
            className={cn(
              "whitespace-nowrap px-4 py-2",
              "bg-neo-card border-3 border-dashed border-neo-yellow",
              "font-bold text-gray-400",
              "hover:bg-neo-green hover:border-solid hover:text-black",
              "hover:shadow-neo-sm hover:translate-x-[-2px] hover:translate-y-[-2px]",
              "flex-shrink-0"
            )}
          >
            <span className="flex items-center gap-2">
              <Plus size={16} />
              카테고리 추가
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
