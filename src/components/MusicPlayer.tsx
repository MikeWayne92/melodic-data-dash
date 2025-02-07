
import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface MusicPlayerProps {
  trackId?: string;
}

const MusicPlayer = ({ trackId }: MusicPlayerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    
    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, '#9b87f5');
    gradient.addColorStop(0.5, '#7E69AB');
    gradient.addColorStop(1, '#6E59A5');

    // Animation function
    const draw = () => {
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Generate random bars for visualization
      const barCount = 30;
      const barWidth = canvas.width / barCount;
      const maxHeight = canvas.height * 0.8;

      for (let i = 0; i < barCount; i++) {
        const height = isPlaying ? Math.random() * maxHeight : maxHeight * 0.1;
        const x = i * barWidth;
        const y = canvas.height - height;

        ctx.fillStyle = '#D6BCFA';
        ctx.fillRect(x + 2, y, barWidth - 4, height);
      }

      requestAnimationFrame(draw);
    };

    draw();
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="neomorph p-6 space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Music Visualizer</h3>
        <div className="flex space-x-4">
          <button
            onClick={togglePlay}
            className="p-2 rounded-full hover:bg-neogray-dark transition-colors"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
          <button
            onClick={toggleMute}
            className="p-2 rounded-full hover:bg-neogray-dark transition-colors"
          >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
        </div>
      </div>
      
      <canvas 
        ref={canvasRef}
        className="w-full h-[200px] rounded-lg"
      />

      {trackId && (
        <div className="mt-4">
          <iframe
            src={`https://open.spotify.com/embed/track/${trackId}`}
            width="100%"
            height="80"
            frameBorder="0"
            allow="encrypted-media"
            className="rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
