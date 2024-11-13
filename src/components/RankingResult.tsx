import { Trophy, Medal } from 'lucide-react';
import { KDrama } from '../types';

interface Props {
  dramas: KDrama[];
}

export default function RankingResult({ dramas }: Props) {
  return (
    <div className="w-full max-w-[800px] mx-auto bg-gradient-to-br from-purple-900 to-indigo-900 p-6 sm:p-8 rounded-2xl shadow-2xl">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">My K-Drama Rankings</h2>
        <p className="text-xs sm:text-sm text-purple-200">My top picks of all time</p>
      </div>

      <div className="space-y-3 sm:space-y-4 max-w-[720px] mx-auto">
        {dramas.map((drama, index) => (
          <div
            key={drama.id}
            className="flex items-center gap-3 sm:gap-4 bg-white/10 p-3 sm:p-4 rounded-xl backdrop-blur-sm"
          >
            <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 relative">
              {index === 0 && (
                <Trophy className="absolute -top-2 -right-2 text-yellow-400 drop-shadow-lg w-4 h-4 sm:w-5 sm:h-5" />
              )}
              {index === 1 && (
                <Medal className="absolute -top-2 -right-2 text-gray-300 drop-shadow-lg w-4 h-4 sm:w-5 sm:h-5" />
              )}
              {index === 2 && (
                <Medal className="absolute -top-2 -right-2 text-amber-600 drop-shadow-lg w-4 h-4 sm:w-5 sm:h-5" />
              )}
              <img
                src={drama.image}
                alt={drama.title}
                className="w-full h-full object-cover rounded-lg shadow-lg"
                crossOrigin="anonymous"
              />
            </div>
            <div className="flex-grow min-w-0">
              <h3 className="text-sm sm:text-base font-semibold text-white mb-1 truncate">
                {index + 1}. {drama.title}
              </h3>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] sm:text-xs text-purple-200">{drama.year}</span>
                <div className="flex flex-wrap gap-1">
                  {drama.genres.map((genre) => (
                    <span
                      key={genre}
                      className="text-[8px] sm:text-[10px] px-1.5 py-0.5 bg-white/20 rounded-full text-purple-100"
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

      <div className="mt-6 pt-3 border-t border-white/10 text-center">
        <a
          href="https://rankmykdrama.xyz"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] sm:text-xs text-purple-200 hover:text-white transition-colors"
        >
          rankmykdrama.xyz
        </a>
      </div>
    </div>
  );
}