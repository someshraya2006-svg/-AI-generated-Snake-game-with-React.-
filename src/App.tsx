/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MusicPlayer } from './components/MusicPlayer';
import { SnakeGame } from './components/SnakeGame';

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#00ffff] flex flex-col items-center justify-center p-4 md:p-8 font-digital selection:bg-[#ff00ff] selection:text-[#050505] overflow-hidden">
      <div className="noise" />
      <div className="scanlines" />
      
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center gap-8 tear">
        
        <div className="text-center border-b-4 border-[#ff00ff] pb-4 w-full">
          <h1 
            className="text-5xl md:text-7xl font-pixel tracking-tighter mb-4 text-[#00ffff] glitch uppercase" 
            data-text="SNAKE.EXE"
          >
            SNAKE.EXE
          </h1>
          <p className="text-[#ff00ff] font-digital text-2xl uppercase tracking-widest">
            // NEURAL_LINK_ESTABLISHED
          </p>
        </div>

        {/* Center: Snake Game */}
        <div className="w-full flex justify-center">
          <SnakeGame />
        </div>

        {/* Bottom: Music Player */}
        <div className="w-full mt-4">
          <MusicPlayer />
        </div>

      </div>
    </div>
  );
}
