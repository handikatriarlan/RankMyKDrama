import { Share2, Download, Twitter, Instagram } from 'lucide-react';
import { KDrama } from '../types';

interface Props {
  onDownload: () => void;
  onShare: () => void;
  dramas: KDrama[];
}

export default function ShareButtons({ onDownload, onShare, dramas }: Props) {
  const generateTwitterText = () => {
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
          className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
        >
          <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
          Share
        </button>
      )}
      <a
        href={`https://twitter.com/intent/tweet?text=${generateTwitterText()}&url=${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
      >
        <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
        Share on Twitter
      </a>
      <a
        href="https://www.instagram.com/create/story"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white rounded-xl hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
      >
        <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
        Share to Instagram
      </a>
    </div>
  );
}