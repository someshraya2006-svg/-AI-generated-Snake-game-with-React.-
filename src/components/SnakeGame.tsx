import { useSnakeGame } from '../hooks/useSnakeGame';
import { Play, RotateCcw, AlertTriangle } from 'lucide-react';
import { useEffect, useRef } from 'react';

export function SnakeGame() {
  const {
    snake,
    food,
    gameOver,
    score,
    isPaused,
    gridSize,
    resetGame,
    setIsPaused,
  } = useSnakeGame();

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cellSize = canvas.width / gridSize;

    // Clear canvas
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid lines
    ctx.strokeStyle = '#111111';
    ctx.lineWidth = 1;
    for (let i = 0; i <= gridSize; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(canvas.width, i * cellSize);
      ctx.stroke();
    }

    // Draw snake
    snake.forEach((segment, index) => {
      const isHead = index === 0;
      
      ctx.fillStyle = isHead ? '#ffffff' : '#00ffff';
      
      // Sharp rectangles
      ctx.fillRect(
        segment.x * cellSize + 1,
        segment.y * cellSize + 1,
        cellSize - 2,
        cellSize - 2
      );
    });

    // Draw food
    ctx.fillStyle = '#ff00ff';
    ctx.fillRect(
      food.x * cellSize + 1,
      food.y * cellSize + 1,
      cellSize - 2,
      cellSize - 2
    );

  }, [snake, food, gridSize]);

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between w-full mb-6 px-4 py-3 bg-[#050505] border-4 border-[#00ffff] shadow-[8px_8px_0px_#ff00ff]">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-pixel text-[#ff00ff] uppercase">
            PROC_SNAKE
          </h2>
        </div>
        <div 
          className="text-3xl font-digital text-[#00ffff] glitch"
          data-text={`MEM_ALLOC: ${score.toString().padStart(4, '0')}B`}
        >
          MEM_ALLOC: {score.toString().padStart(4, '0')}B
        </div>
      </div>

      <div className="relative group">
        <div className="relative bg-[#050505] border-4 border-[#ff00ff] shadow-[8px_8px_0px_#00ffff] overflow-hidden">
          <canvas
            ref={canvasRef}
            width={400}
            height={400}
            className="w-full max-w-[400px] aspect-square block"
          />

          {/* Overlays */}
          {gameOver && (
            <div className="absolute inset-0 bg-[#050505]/90 flex flex-col items-center justify-center text-center p-6 border-4 border-red-600 m-2">
              <AlertTriangle className="w-12 h-12 text-red-600 mb-4 animate-pulse" />
              <h3 
                className="text-3xl font-pixel text-red-600 mb-4 uppercase glitch"
                data-text="SYSTEM FAILURE"
              >
                SYSTEM FAILURE
              </h3>
              <p className="text-[#ff00ff] mb-8 font-digital text-2xl">DATA_LOST: {score}B</p>
              <button
                onClick={resetGame}
                className="flex items-center gap-2 px-6 py-3 bg-[#050505] hover:bg-red-600 text-red-600 hover:text-[#050505] border-4 border-red-600 transition-colors uppercase font-pixel text-sm"
              >
                <RotateCcw className="w-5 h-5" />
                REBOOT_SYS
              </button>
            </div>
          )}

          {isPaused && !gameOver && (
            <div className="absolute inset-0 bg-[#050505]/90 flex flex-col items-center justify-center text-center p-6 border-4 border-[#00ffff] m-2">
              <h3 
                className="text-2xl font-pixel text-[#00ffff] mb-8 uppercase glitch"
                data-text="PROCESS SUSPENDED"
              >
                PROCESS SUSPENDED
              </h3>
              <button
                onClick={() => setIsPaused(false)}
                className="flex items-center gap-2 px-6 py-3 bg-[#050505] hover:bg-[#00ffff] text-[#00ffff] hover:text-[#050505] border-4 border-[#00ffff] transition-colors uppercase font-pixel text-sm"
              >
                <Play className="w-5 h-5 ml-1" />
                RESUME_EXEC
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex gap-6 text-[#ff00ff] text-lg font-digital uppercase">
        <span className="flex items-center gap-2">
          <kbd className="px-2 py-1 bg-[#050505] border-2 border-[#00ffff] text-[#00ffff]">WASD</kbd> / <kbd className="px-2 py-1 bg-[#050505] border-2 border-[#00ffff] text-[#00ffff]">ARROWS</kbd> : OVERRIDE_DIR
        </span>
        <span className="flex items-center gap-2">
          <kbd className="px-2 py-1 bg-[#050505] border-2 border-[#ff00ff] text-[#ff00ff]">SPACE</kbd> : HALT
        </span>
      </div>
    </div>
  );
}
