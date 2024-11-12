import { X } from 'lucide-react'
import { KDrama } from '../types'

interface Props {
  drama: KDrama
  index: number
  onRemove: (id: string) => void
}

export default function DramaCard({ drama, index, onRemove }: Props) {
  return (
    <div className='relative group transform transition-all duration-300 hover:scale-105'>
      <div className='absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity'>
        <button
          onClick={() => onRemove(drama.id)}
          className='p-1.5 bg-red-500 rounded-full text-white hover:bg-red-600 shadow-lg'
        >
          <X size={16} />
        </button>
      </div>
      <div className='relative aspect-[3/4] rounded-xl overflow-hidden shadow-xl'>
        <img
          src={drama.image}
          alt={drama.title}
          className='w-full h-full object-cover'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity'>
          <div className='absolute bottom-0 left-0 right-0 p-4'>
            <p className='text-white font-bold text-lg mb-1'>
              {index + 1}. {drama.title}
            </p>
            <p className='text-gray-200 text-sm'>
              {drama.year} • {drama.rating}★
            </p>
            <div className='flex flex-wrap gap-1 mt-2'>
              {drama.genres.map((genre) => (
                <span
                  key={genre}
                  className='text-xs px-2 py-1 bg-white/20 rounded-full text-white'
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
