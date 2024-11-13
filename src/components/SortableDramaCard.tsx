import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { X, GripVertical } from 'lucide-react';
import { KDrama } from '../types';

interface Props {
  drama: KDrama;
  index: number;
  onRemove: (id: string) => void;
}

export function SortableDramaCard({ drama, index, onRemove }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: drama.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="w-full"
    >
      <div className="relative transform transition-all duration-300 hover:scale-[1.02] bg-white rounded-xl shadow-md hover:shadow-lg">
        <div className="flex items-center p-2 sm:p-4 gap-2 sm:gap-4">
          <div
            className="flex-shrink-0 cursor-move"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="text-purple-300 hover:text-purple-500 transition-colors w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16">
            <img
              src={drama.image}
              alt={drama.title}
              className="w-full h-full object-cover rounded-lg shadow-sm"
            />
          </div>
          <div className="flex-grow min-w-0">
            <p className="font-semibold text-gray-800 mb-1 text-sm sm:text-base truncate">
              {index + 1}. {drama.title}
            </p>
            <div className="flex flex-wrap gap-1 sm:gap-2 items-center">
              <span className="text-xs sm:text-sm text-gray-500">{drama.year}</span>
              <div className="flex flex-wrap gap-1">
                {drama.genres.map((genre) => (
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
          <button
            onClick={() => onRemove(drama.id)}
            className="flex-shrink-0 p-1.5 sm:p-2 text-red-400 hover:text-red-600 transition-colors"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}