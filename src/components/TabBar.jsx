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

  // Color rotation for Memphis style
  const tabColors = [
    'bg-memphis-pink',
    'bg-memphis-yellow',
    'bg-memphis-teal',
    'bg-memphis-orange',
    'bg-memphis-purple',
    'bg-memphis-blue',
  ];

  return (
    <div className={cn(
      'sticky top-16 z-40 w-full',
      'bg-memphis-cream border-b-4 border-memphis-black',
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
                  "group relative whitespace-nowrap px-4 py-2 font-bold uppercase",
                  "flex items-center gap-2 select-none border-2 border-memphis-black",
                  activeTab === index
                    ? `${tabColors[index % tabColors.length]} shadow-memphis`
                    : "bg-white text-memphis-black hover:bg-memphis-cream shadow-memphis-sm",
                  draggedIndex === index && "opacity-30",
                  dragOverIndex === index && draggedIndex !== index && "bg-memphis-yellow",
                  editMode && "cursor-move"
                )}
              >
                {editMode && (
                  <GripVertical size={14} className="opacity-50" />
                )}
                <span className="text-memphis-black">{category.name}</span>
                <span className={cn(
                  "px-2 py-0.5 text-xs font-bold border border-memphis-black",
                  activeTab === index
                    ? "bg-white text-memphis-black"
                    : "bg-memphis-yellow text-memphis-black"
                )}>
                  {category.services.length}
                </span>

                {editMode && !isDragging && (
                  <div className="absolute -top-1 -right-1 flex gap-0.5 opacity-0 group-hover:opacity-100">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditCategory(category.id);
                      }}
                      className="p-1 bg-memphis-teal border border-memphis-black text-memphis-black hover:scale-110"
                    >
                      <Edit2 size={10} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteCategory(category.id);
                      }}
                      className="p-1 bg-memphis-red border border-memphis-black text-white hover:scale-110"
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
              "whitespace-nowrap px-4 py-2",
              "text-memphis-black font-bold uppercase",
              "border-2 border-dashed border-memphis-black hover:border-solid",
              "hover:bg-memphis-yellow",
              "flex items-center gap-2"
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
