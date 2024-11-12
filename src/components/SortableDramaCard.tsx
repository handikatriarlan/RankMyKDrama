import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { X, GripVertical } from 'lucide-react'
import { KDrama } from '../types'

interface Props {
  drama: KDrama
  index: number
  onRemove: (id: string) => void
}

export function SortableDramaCard({ drama, index, onRemove }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: drama.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className='w-full group cursor-move'
    >
      <div className='relative transform transition-all duration-300 hover:scale-[1.02] bg-white rounded-xl shadow-md hover:shadow-lg'>
        <div className='flex items-center p-4 gap-4'>
          <div className='flex-shrink-0'>
            <GripVertical
              className='text-purple-300 group-hover:text-purple-500 transition-colors'
              size={24}
            />
          </div>
          <div className='flex-shrink-0 w-16 h-16'>
            <img
              src={drama.image}
              alt={drama.title}
              className='w-full h-full object-cover rounded-lg shadow-sm'
            />
          </div>
          <div className='flex-grow'>
            <p className='font-semibold text-gray-800 mb-1'>
              {index + 1}. {drama.title}
            </p>
            <div className='flex flex-wrap gap-2 items-center'>
              <span className='text-sm text-gray-500'>{drama.year}</span>
              <div className='flex flex-wrap gap-1'>
                {drama.genres.map((genre) => (
                  <span
                    key={genre}
                    className='text-xs px-2 py-0.5 bg-purple-50 text-purple-600 rounded-full'
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onRemove(drama.id)
            }}
            className='flex-shrink-0 p-2 text-red-400 hover:text-red-600 transition-colors'
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
