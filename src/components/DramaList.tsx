import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
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
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = dramas.findIndex((item) => item.id === active.id);
      const newIndex = dramas.findIndex((item) => item.id === over.id);
      onDramasReorder(arrayMove(dramas, oldIndex, newIndex));
    }
  }

  const emptySlots = Array(7 - dramas.length).fill(null);

  return (
    <div className="w-full">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
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
      </DndContext>
    </div>
  );
}