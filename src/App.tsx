import { useState, useRef } from 'react';
import { Tv, Sparkles, RotateCcw } from 'lucide-react';
import * as htmlToImage from 'html-to-image';
import DramaInput from './components/DramaInput';
import DramaList from './components/DramaList';
import RankingResult from './components/RankingResult';
import ShareButtons from './components/ShareButtons';
import { KDrama } from './types';

function App() {
  const [dramas, setDramas] = useState<KDrama[]>([]);
  const [showResult, setShowResult] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDramaSelect = (drama: KDrama) => {
    if (dramas.length < 7) {
      setDramas([...dramas, drama]);
    }
  };

  const handleDramasReorder = (newDramas: KDrama[]) => {
    setDramas(newDramas);
  };

  const handleRemove = (id: string) => {
    setDramas(dramas.filter(drama => drama.id !== id));
    setShowResult(false);
  };

  const handleGenerate = () => {
    setShowResult(true);
  };

  const handleReset = () => {
    setDramas([]);
    setShowResult(false);
  };

  const generateImage = async () => {
    if (resultRef.current) {
      try {
        const images = resultRef.current.getElementsByTagName('img');
        await Promise.all(
          Array.from(images).map(
            img => 
              new Promise((resolve, reject) => {
                const image = new Image();
                image.crossOrigin = 'anonymous';
                image.onload = resolve;
                image.onerror = reject;
                image.src = img.src;
              })
          )
        );

        const tempContainer = document.createElement('div');
        tempContainer.style.cssText = `
          width: 1200px;
          padding: 48px;
          background-color: #1e1b4b;
          border-radius: 24px;
          position: fixed;
          left: -9999px;
          top: -9999px;
        `;
        
        const clone = resultRef.current.cloneNode(true) as HTMLElement;
        clone.style.cssText = `
          width: 100% !important;
          max-width: none !important;
          margin: 0 !important;
          padding: 0 !important;
          background: transparent !important;
          box-shadow: none !important;
          border-radius: 0 !important;
          transform: none !important;
        `;
        
        tempContainer.appendChild(clone);
        document.body.appendChild(tempContainer);

        const dataUrl = await htmlToImage.toPng(tempContainer, {
          quality: 1.0,
          pixelRatio: 2,
          width: 1200,
          height: tempContainer.offsetHeight,
          style: {
            transform: 'none'
          }
        });

        document.body.removeChild(tempContainer);
        return dataUrl;
      } catch (error) {
        console.error('Error generating image:', error);
        throw new Error('Failed to generate image');
      }
    }
    throw new Error('Result reference not found');
  };

  const handleDownload = async () => {
    try {
      const dataUrl = await generateImage();
      const link = document.createElement('a');
      link.download = 'my-kdrama-ranking.png';
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading image:', error);
      alert('Failed to download image. Please try again.');
    }
  };

  const handleShare = async () => {
    try {
      const dataUrl = await generateImage();
      if (navigator.share) {
        const blob = await (await fetch(dataUrl)).blob();
        const file = new File([blob], 'my-kdrama-ranking.png', { type: 'image/png' });
        await navigator.share({
          title: 'My K-Drama Ranking',
          text: 'Check out my K-Drama ranking!',
          files: [file]
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
      alert('Failed to share. Please try again.');
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <header className="text-center mb-8 sm:mb-16">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <Tv className="text-purple-600 w-8 h-8 sm:w-10 sm:h-10" />
            <h1 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
              RankMyKDrama
            </h1>
          </div>
          <p className="text-gray-600 text-sm sm:text-lg max-w-2xl mx-auto px-4">
            Create your ultimate K-Drama ranking and share it with the world! Select your top 7 favorite dramas and generate a beautiful ranking card.
          </p>
        </header>

        <div className="flex flex-col items-center gap-6 sm:gap-8">
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
                  className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 text-purple-600 hover:text-purple-700 transition-colors text-sm sm:text-base"
                >
                  <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
                  Start Over
                </button>
              )}

              <div className="w-full max-w-3xl mx-auto">
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
                  className="flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl text-base sm:text-lg font-semibold"
                >
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
                  Generate Ranking
                </button>
              )}
            </>
          ) : (
            <div className="w-full flex flex-col items-center space-y-6 sm:space-y-8">
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-white/80 backdrop-blur-sm text-purple-600 rounded-xl hover:bg-white hover:text-purple-700 transition-all duration-300 shadow-md hover:shadow-lg text-sm sm:text-base"
              >
                <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
                Create New Ranking
              </button>
              
              <div ref={resultRef}>
                <RankingResult dramas={dramas} />
              </div>
              
              <ShareButtons
                onDownload={handleDownload}
                onShare={handleShare}
                dramas={dramas}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;