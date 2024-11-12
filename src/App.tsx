import { useState, useRef } from 'react'
import { Tv, Sparkles, RotateCcw } from 'lucide-react'
import * as htmlToImage from 'html-to-image'
import DramaInput from './components/DramaInput'
import DramaList from './components/DramaList'
import RankingResult from './components/RankingResult'
import ShareButtons from './components/ShareButtons'
import { KDrama } from './types'

function App() {
  const [dramas, setDramas] = useState<KDrama[]>([])
  const [showResult, setShowResult] = useState(false)
  const resultRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDramaSelect = (drama: KDrama) => {
    if (dramas.length < 7) {
      setDramas([...dramas, drama])
    }
  }

  const handleDramasReorder = (newDramas: KDrama[]) => {
    setDramas(newDramas)
  }

  const handleRemove = (id: string) => {
    setDramas(dramas.filter((drama) => drama.id !== id))
    setShowResult(false)
  }

  const handleGenerate = () => {
    setShowResult(true)
  }

  const handleReset = () => {
    setDramas([])
    setShowResult(false)
  }

  const handleDownload = async () => {
    if (resultRef.current) {
      try {
        const images = resultRef.current.getElementsByTagName('img')
        await Promise.all(
          Array.from(images).map(
            (img) =>
              new Promise((resolve, reject) => {
                const image = new Image()
                image.crossOrigin = 'anonymous'
                image.onload = resolve
                image.onerror = reject
                image.src = img.src
              })
          )
        )

        const dataUrl = await htmlToImage.toPng(resultRef.current, {
          quality: 1.0,
          pixelRatio: 2,
          backgroundColor: '#1e1b4b',
          cacheBust: true,
          style: {
            transform: 'none',
          },
          filter: (node) => {
            const className = node.className || ''
            return (
              !className.includes('hover:') && !className.includes('animate-')
            )
          },
        })

        const link = document.createElement('a')
        link.download = 'my-kdrama-ranking.png'
        link.href = dataUrl
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } catch (error) {
        console.error('Error generating image:', error)
        alert('Failed to generate image. Please try again.')
      }
    }
  }

  const handleShare = async () => {
    if (resultRef.current) {
      try {
        const dataUrl = await htmlToImage.toPng(resultRef.current, {
          quality: 1.0,
          pixelRatio: 2,
          backgroundColor: '#1e1b4b',
          cacheBust: true,
        })

        if (navigator.share) {
          const blob = await (await fetch(dataUrl)).blob()
          const file = new File([blob], 'my-kdrama-ranking.png', {
            type: 'image/png',
          })
          await navigator.share({
            title: 'My K-Drama Ranking',
            text: 'Check out my K-Drama ranking!',
            files: [file],
          })
        }
      } catch (error) {
        console.error('Error sharing:', error)
        alert('Failed to share. Please try again.')
      }
    }
  }

  const focusInput = () => {
    inputRef.current?.focus()
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50'>
      <div className='container mx-auto px-4 py-12'>
        <header className='text-center mb-16'>
          <div className='flex items-center justify-center gap-3 mb-6'>
            <Tv className='text-purple-600' size={40} />
            <h1 className='text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text pb-2'>
              RankMyKDrama
            </h1>
          </div>
          <p className='text-gray-600 text-lg max-w-2xl mx-auto mt-[-10px]'>
            Create your ultimate K-Drama ranking and share it with the world!
          </p>
        </header>

        <div className='flex flex-col items-center gap-8'>
          {!showResult ? (
            <>
              <DramaInput
                ref={inputRef}
                onDramaSelect={handleDramaSelect}
                disabled={dramas.length >= 7}
                selectedDramas={dramas}
              />

              {dramas.length > 0 && (
                <button
                  onClick={handleReset}
                  className='flex items-center gap-2 px-4 py-2 text-purple-600 hover:text-purple-700 transition-colors'
                >
                  <RotateCcw size={18} />
                  Start Over
                </button>
              )}

              <div className='w-full max-w-3xl mx-auto'>
                <DramaList
                  dramas={dramas}
                  onDramasReorder={handleDramasReorder}
                  onRemove={handleRemove}
                  onAddMore={focusInput}
                />
              </div>

              {dramas.length === 7 && (
                <button
                  onClick={handleGenerate}
                  className='flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl text-lg font-semibold'
                >
                  <Sparkles size={24} />
                  Generate Ranking
                </button>
              )}
            </>
          ) : (
            <div className='w-full flex flex-col items-center space-y-8'>
              <button
                onClick={handleReset}
                className='flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm text-purple-600 rounded-xl hover:bg-white hover:text-purple-700 transition-all duration-300 shadow-md hover:shadow-lg'
              >
                <RotateCcw size={20} />
                Create New Ranking
              </button>

              <div ref={resultRef} className='w-full max-w-3xl mx-auto'>
                <RankingResult dramas={dramas} />
              </div>

              <div className='flex flex-col items-center gap-6'>
                <ShareButtons
                  onDownload={handleDownload}
                  onShare={handleShare}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
