import { KDrama } from '../types';
import DramaCard from './DramaCard';

interface Props {
  dramas: KDrama[];
  onRemove: (id: string) => void;
}

export default function DramaGrid({ dramas, onRemove }: Props) {
  const emptySlots = Array(6 - dramas.length).fill(null);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full">
      {dramas.map((drama, index) => (
        <DramaCard
          key={drama.id}
          drama={drama}
          index={index}
          onRemove={onRemove}
        />
      ))}
      {emptySlots.map((_, index) => (
        <div
          key={`empty-${index}`}
          className="aspect-[3/4] rounded-xl bg-purple-50 border-2 border-dashed border-purple-200 flex items-center justify-center"
        >
          <p className="text-purple-400 text-sm text-center px-4">
            Add more K-Dramas
          </p>
        </div>
      ))}
    </div>
  );
}