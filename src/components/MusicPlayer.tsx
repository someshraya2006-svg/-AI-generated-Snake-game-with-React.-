import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Terminal } from 'lucide-react';
import { useState, useRef, useEffect, ChangeEvent } from 'react';

const TRACKS = [
  {
    id: 1,
    title: 'DATA_STREAM_01',
    artist: 'SYS.ADMIN',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    id: 2,
    title: 'MEMORY_LEAK',
    artist: 'UNKNOWN_PROCESS',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    id: 3,
    title: 'KERNEL_PANIC',
    artist: 'ROOT',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
];

export function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const track = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    } else if (!isPlaying && audioRef.current) {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration) {
        setProgress((current / duration) * 100);
      }
    }
  };

  const handleTrackEnd = () => {
    nextTrack();
  };

  const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseFloat(e.target.value);
    setProgress(newProgress);
    if (audioRef.current && audioRef.current.duration) {
      audioRef.current.currentTime = (newProgress / 100) * audioRef.current.duration;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-[#050505] border-4 border-[#00ffff] p-6 shadow-[8px_8px_0px_#ff00ff] relative">
      <div className="absolute top-0 left-0 bg-[#00ffff] text-[#050505] px-2 py-1 font-pixel text-[10px] uppercase">
        AUDIO_CTRL.EXE
      </div>
      
      <audio
        ref={audioRef}
        src={track.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleTrackEnd}
      />
      
      <div className="flex items-center justify-between mt-4 mb-6">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 bg-[#050505] border-2 border-[#ff00ff] flex items-center justify-center ${isPlaying ? 'animate-pulse' : ''}`}>
            <Terminal className="w-6 h-6 text-[#ff00ff]" />
          </div>
          <div>
            <h3 className="font-pixel text-sm text-[#00ffff] uppercase mb-1">{track.title}</h3>
            <p className="text-[#ff00ff] font-digital text-lg uppercase">USR: {track.artist}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 text-[#00ffff] hover:bg-[#ff00ff] hover:text-[#050505] transition-colors border-2 border-transparent hover:border-[#00ffff]"
          >
            {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setVolume(parseFloat(e.target.value));
              setIsMuted(false);
            }}
            className="w-20 h-2 bg-[#050505] border border-[#00ffff] appearance-none cursor-pointer accent-[#ff00ff]"
          />
        </div>
      </div>

      <div className="mb-6 relative">
        <div className="absolute -top-4 right-0 text-[#ff00ff] text-xs font-pixel">
          {Math.round(progress)}%
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={progress || 0}
          onChange={handleSeek}
          className="w-full h-4 bg-[#050505] border-2 border-[#00ffff] appearance-none cursor-pointer accent-[#ff00ff]"
        />
      </div>

      <div className="flex items-center justify-center gap-6">
        <button 
          onClick={prevTrack}
          className="p-3 text-[#00ffff] border-2 border-[#00ffff] hover:bg-[#00ffff] hover:text-[#050505] transition-colors"
        >
          <SkipBack className="w-6 h-6" />
        </button>
        
        <button 
          onClick={togglePlay}
          className="p-4 bg-[#050505] border-4 border-[#ff00ff] text-[#ff00ff] hover:bg-[#ff00ff] hover:text-[#050505] transition-colors shadow-[4px_4px_0px_#00ffff]"
        >
          {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
        </button>
        
        <button 
          onClick={nextTrack}
          className="p-3 text-[#00ffff] border-2 border-[#00ffff] hover:bg-[#00ffff] hover:text-[#050505] transition-colors"
        >
          <SkipForward className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
