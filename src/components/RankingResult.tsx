import { Trophy, Medal } from 'lucide-react'
import { KDrama } from '../types'

interface Props {
  dramas: KDrama[]
}

export default function RankingResult({ dramas }: Props) {
  return (
    <div className='w-full max-w-4xl bg-gradient-to-br from-purple-900 to-indigo-900 p-8 rounded-2xl shadow-2xl'>
      <div className='text-center mb-8'>
        <h2 className='text-3xl font-bold text-white mb-2'>
          My K-Drama Rankings
        </h2>
        <p className='text-purple-200'>My top picks of all time</p>
      </div>

      <div className='space-y-4'>
        {dramas.map((drama, index) => (
          <div
            key={drama.id}
            className='flex items-center gap-4 bg-white/10 p-4 rounded-xl backdrop-blur-sm transition-transform hover:scale-[1.02] duration-300'
          >
            <div className='flex-shrink-0 w-20 h-20 relative'>
              {index === 0 && (
                <Trophy
                  className='absolute -top-2 -right-2 text-yellow-400 drop-shadow-lg'
                  size={24}
                />
              )}
              {index === 1 && (
                <Medal
                  className='absolute -top-2 -right-2 text-gray-300 drop-shadow-lg'
                  size={24}
                />
              )}
              {index === 2 && (
                <Medal
                  className='absolute -top-2 -right-2 text-amber-600 drop-shadow-lg'
                  size={24}
                />
              )}
              <img
                src={drama.image}
                alt={drama.title}
                className='w-full h-full object-cover rounded-lg shadow-lg'
                crossOrigin='anonymous'
              />
            </div>
            <div className='flex-grow'>
              <h3 className='text-xl font-semibold text-white mb-2'>
                {index + 1}. {drama.title}
              </h3>
              <div className='flex flex-wrap items-center gap-3'>
                <span className='text-purple-200 text-sm'>{drama.year}</span>
                <div className='flex flex-wrap gap-2'>
                  {drama.genres.map((genre) => (
                    <span
                      key={genre}
                      className='text-xs px-2 py-0.5 bg-white/20 rounded-full text-purple-100'
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='mt-8 pt-4 border-t border-white/10 text-center'>
        <a
          href='https://rankmykdrama.xyz'
          target='_blank'
          rel='noopener noreferrer'
          className='text-purple-200 text-sm hover:text-white transition-colors'
        >
          rankmykdrama.xyz
        </a>
      </div>
    </div>
  )
}
