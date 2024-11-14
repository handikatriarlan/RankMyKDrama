import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  defaultDropAnimationSideEffects,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableDramaCard } from './SortableDramaCard';
import { KDrama } from '../types';

interface Props {
  dramas: KDrama[];
  onDramasReorder: (newDramas: KDrama[]) => void;
  onRemove: (id: string) => void;
  onAddMore: () => void;
}

export default function DramaList({ dramas, onDramasReorder, onRemove, onAddMore }: Props) {
  const [activeId, setActiveId] = React.useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Reduced activation distance for better mobile experience
        tolerance: 5, // Added tolerance for smoother activation
        delay: 50, // Small delay to prevent accidental drags
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
    // Add a class to the body to prevent scrolling while dragging on mobile
    document.body.classList.add('dragging');
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    document.body.classList.remove('dragging');
    setActiveId(null);

    if (over && active.id !== over.id) {
      const oldIndex = dramas.findIndex((item) => item.id === active.id);
      const newIndex = dramas.findIndex((item) => item.id === over.id);
      onDramasReorder(arrayMove(dramas, oldIndex, newIndex));
    }
  }

  const emptySlots = Array(7 - dramas.length).fill(null);
  const activeDrama = dramas.find(d => d.id === activeId);

  return (
    <div className="w-full">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="space-y-3">
          <SortableContext
            items={dramas.map(d => d.id)}
            strategy={verticalListSortingStrategy}
          >
            {dramas.map((drama, index) => (
              <SortableDramaCard
                key={drama.id}
                drama={drama}
                index={index}
                onRemove={onRemove}
                isDragging={activeId === drama.id}
              />
            ))}
          </SortableContext>

          {emptySlots.map((_, index) => (
            <button
              key={`empty-${index}`}
              onClick={onAddMore}
              className="w-full h-24 rounded-xl bg-purple-50 border-2 border-dashed border-purple-200 flex items-center justify-center hover:bg-purple-100 hover:border-purple-300 transition-colors duration-200"
            >
              <p className="text-purple-400 text-sm text-center px-4">
                Add more K-Dramas ({7 - dramas.length} remaining)
              </p>
            </button>
          ))}
        </div>

        <DragOverlay dropAnimation={{
          sideEffects: defaultDropAnimationSideEffects({
            styles: {
              active: {
                opacity: '0.5',
              },
            },
          }),
        }}>
          {activeDrama ? (
            <div className="w-full transform scale-105 opacity-90">
              <div className="relative bg-white rounded-xl shadow-2xl">
                <div className="flex items-center p-2 sm:p-4 gap-2 sm:gap-4">
                  <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16">
                    <img
                      src={activeDrama.image}
                      alt={activeDrama.title}
                      className="w-full h-full object-cover rounded-lg shadow-sm"
                    />
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="font-semibold text-gray-800 mb-1 text-sm sm:text-base truncate">
                      {dramas.findIndex(d => d.id === activeDrama.id) + 1}. {activeDrama.title}
                    </p>
                    <div className="flex flex-wrap gap-1 sm:gap-2 items-center">
                      <span className="text-xs sm:text-sm text-gray-500">{activeDrama.year}</span>
                      <div className="flex flex-wrap gap-1">
                        {activeDrama.genres.map((genre) => (
                          <span
                            key={genre}
                            className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 bg-purple-50 text-purple-600 rounded-full"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}