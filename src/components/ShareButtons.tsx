import { Share2, Download, Twitter, Facebook } from 'lucide-react'

interface Props {
  onDownload: () => void
  onShare: () => void
}

export default function ShareButtons({ onDownload, onShare }: Props) {
  const shareText = encodeURIComponent(
    'Check out my K-Drama rankings! 🎬✨ #KDrama #RankMyKDrama'
  )
  const shareUrl = encodeURIComponent(window.location.href)

  return (
    <div className='flex flex-wrap gap-4 justify-center'>
      <button
        onClick={onDownload}
        className='flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl'
      >
        <Download size={20} />
        Download Ranking
      </button>
      {navigator.share ? (
        <button
          onClick={onShare}
          className='flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl'
        >
          <Share2 size={20} />
          Share
        </button>
      ) : null}
      <a
        href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
        target='_blank'
        rel='noopener noreferrer'
        className='flex items-center gap-2 px-6 py-3 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-all duration-300 shadow-lg hover:shadow-xl'
      >
        <Twitter size={20} />
        Tweet
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
        target='_blank'
        rel='noopener noreferrer'
        className='flex items-center gap-2 px-6 py-3 bg-blue-800 text-white rounded-xl hover:bg-blue-900 transition-all duration-300 shadow-lg hover:shadow-xl'
      >
        <Facebook size={20} />
        Share on Facebook
      </a>
    </div>
  )
}
