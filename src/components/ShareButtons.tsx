import { Share2, Download } from 'lucide-react';
import { KDrama } from '../types';

interface Props {
  onDownload: () => void;
  onShare: () => void;
  dramas: KDrama[];
}

export default function ShareButtons({ onDownload, onShare, dramas }: Props) {
  const generateXText = () => {
    const rankingText = dramas
      .map((drama, index) => `${index + 1}. ${drama.title}`)
      .join('\n');
    
    return encodeURIComponent(`My K-Drama Rankings! 🎬✨\n\n${rankingText}\n\n#KDrama #RankMyKDrama`);
  };

  const shareUrl = encodeURIComponent(window.location.href);
  
  return (
    <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
      <button
        onClick={onDownload}
        className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
      >
        <Download className="w-4 h-4 sm:w-5 sm:h-5" />
        Download Ranking
        </button>
      {typeof navigator.share === 'function' && (
        <button
          onClick={onShare}
          className='flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base'
        >
          <Share2 className='w-4 h-4 sm:w-5 sm:h-5' />
          Share
        </button>
      )}
      <a
        href={`https://x.com/intent/tweet?text=${generateXText()}&url=${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-black text-white rounded-xl hover:bg-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        Share on X
      </a>
    </div>
  );
}