import React, { useEffect, useRef, useState } from 'react';
import { Play, RotateCcw, Trophy, ShieldAlert, Sparkles } from 'lucide-react';

interface FloatingText {
  id: number;
  text: string;
  x: number;
  y: number;
  opacity: number;
  color: string;
}

export const BlockDashDemo: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const gameStateRef = useRef<'idle' | 'playing' | 'gameover'>('idle');

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('block_dash_highscore') || '0', 10);
  });
  const [newHighScoreAchieved, setNewHighScoreAchieved] = useState(false);

  // Sync ref with state
  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  // Engine refs
  const scoreRef = useRef(0);
  const highScoreRef = useRef(highScore);
  const frameCountRef = useRef(0);

  const playerRef = useRef({
    x: 60,
    y: 188, // 220 ground top - 32 player height = 188
    width: 32,
    height: 32,
    vy: 0,
    gravity: 0.65,
    jumpPower: -12.5,
    groundY: 188,
    isGrounded: true,
    rotation: 0,
  });

  const obstaclesRef = useRef<
    { x: number; y: number; width: number; height: number; passed: boolean; color: string }[]
  >([]);
  const particlesRef = useRef<
    { x: number; y: number; vx: number; vy: number; life: number; size: number; color: string }[]
  >([]);
  const floatTextsRef = useRef<FloatingText[]>([]);
  const speedRef = useRef(5.0);
  const spawnTimerRef = useRef(0);

  const triggerJump = () => {
    const p = playerRef.current;
    if (gameStateRef.current === 'playing' && p.isGrounded) {
      p.vy = p.jumpPower;
      p.isGrounded = false;

      // Jump dust particles
      for (let i = 0; i < 8; i++) {
        particlesRef.current.push({
          x: p.x + p.width / 2 + (Math.random() - 0.5) * 16,
          y: p.y + p.height,
          vx: (Math.random() - 0.5) * 4,
          vy: Math.random() * -2.5 - 0.5,
          life: 1.0,
          size: Math.random() * 4 + 3,
          color: '#E65F2B',
        });
      }
    }
  };

  const startGame = () => {
    playerRef.current.y = 188;
    playerRef.current.vy = 0;
    playerRef.current.isGrounded = true;
    playerRef.current.rotation = 0;

    obstaclesRef.current = [];
    particlesRef.current = [];
    floatTextsRef.current = [];
    speedRef.current = 5.0;
    scoreRef.current = 0;
    spawnTimerRef.current = 0;
    frameCountRef.current = 0;

    setScore(0);
    setNewHighScoreAchieved(false);
    gameStateRef.current = 'playing';
    setGameState('playing');
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const update = () => {
      if (gameStateRef.current !== 'playing') return;

      frameCountRef.current++;
      const p = playerRef.current;

      // 1. Player Physics & Ground Collision
      p.vy += p.gravity;
      p.y += p.vy;

      if (!p.isGrounded) {
        p.rotation += 0.12;
      } else {
        p.rotation = 0;
      }

      if (p.y >= p.groundY) {
        p.y = p.groundY;
        p.vy = 0;
        p.isGrounded = true;
      }

      // 2. Score Counting (Continuous distance score +5 per second)
      scoreRef.current += 0.2;
      const currentScoreInt = Math.floor(scoreRef.current);
      setScore(currentScoreInt);

      if (currentScoreInt > highScoreRef.current) {
        highScoreRef.current = currentScoreInt;
        setHighScore(currentScoreInt);
        setNewHighScoreAchieved(true);
        localStorage.setItem('block_dash_highscore', currentScoreInt.toString());
      }

      // 3. Progressive Speed scaling
      speedRef.current = 5.0 + Math.min(scoreRef.current * 0.005, 4.0);

      // 4. Dynamic Obstacle Spawning
      spawnTimerRef.current++;
      const spawnInterval = Math.max(50, Math.floor(80 - speedRef.current * 3));

      if (spawnTimerRef.current >= spawnInterval) {
        spawnTimerRef.current = 0;
        const obstacleHeight = 28 + Math.floor(Math.random() * 34); // 28px to 62px height
        const groundTopY = canvas.height - 40; // 220

        obstaclesRef.current.push({
          x: canvas.width + 10,
          y: groundTopY - obstacleHeight,
          width: 24,
          height: obstacleHeight,
          passed: false,
          color: '#1B1E23',
        });
      }

      // 5. Update Obstacles & Collision Check
      for (let i = obstaclesRef.current.length - 1; i >= 0; i--) {
        const obs = obstaclesRef.current[i];
        obs.x -= speedRef.current;

        // Obstacle Clearance Bonus (+50 pts)
        if (!obs.passed && obs.x + obs.width < p.x) {
          obs.passed = true;
          scoreRef.current += 50;
          const updatedScore = Math.floor(scoreRef.current);
          setScore(updatedScore);

          // Add floating text
          floatTextsRef.current.push({
            id: Date.now() + Math.random(),
            text: '+50',
            x: p.x + 10,
            y: p.y - 15,
            opacity: 1.0,
            color: '#10B981',
          });

          if (updatedScore > highScoreRef.current) {
            highScoreRef.current = updatedScore;
            setHighScore(updatedScore);
            setNewHighScoreAchieved(true);
            localStorage.setItem('block_dash_highscore', updatedScore.toString());
          }
        }

        // AABB Collision Detection with fair hitboxes
        const playerBox = {
          x: p.x + 4,
          y: p.y + 4,
          w: p.width - 8,
          h: p.height - 8,
        };

        const obsBox = {
          x: obs.x + 2,
          y: obs.y + 2,
          w: obs.width - 4,
          h: obs.height - 2,
        };

        const isColliding =
          playerBox.x < obsBox.x + obsBox.w &&
          playerBox.x + playerBox.w > obsBox.x &&
          playerBox.y < obsBox.y + obsBox.h &&
          playerBox.y + playerBox.h > obsBox.y;

        if (isColliding) {
          // Trigger Explosive Collision Particle Burst
          for (let k = 0; k < 26; k++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 8 + 2;
            particlesRef.current.push({
              x: p.x + p.width / 2,
              y: p.y + p.height / 2,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              life: 1.0,
              size: Math.random() * 5 + 3,
              color: Math.random() > 0.4 ? '#EF4444' : '#E65F2B',
            });
          }

          gameStateRef.current = 'gameover';
          setGameState('gameover');
          return;
        }

        // Remove off-screen obstacles
        if (obs.x + obs.width < -30) {
          obstaclesRef.current.splice(i, 1);
        }
      }

      // 6. Update Particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const pt = particlesRef.current[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.life -= 0.035;
        if (pt.life <= 0) {
          particlesRef.current.splice(i, 1);
        }
      }

      // 7. Update Floating Texts
      for (let i = floatTextsRef.current.length - 1; i >= 0; i--) {
        const ft = floatTextsRef.current[i];
        ft.y -= 1.2;
        ft.opacity -= 0.025;
        if (ft.opacity <= 0) {
          floatTextsRef.current.splice(i, 1);
        }
      }
    };

    const draw = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background Sky
      ctx.fillStyle = '#F4F2EC';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Ground Base (Height: 40px)
      const groundY = canvas.height - 40; // 220
      ctx.fillStyle = '#1B1E23';
      ctx.fillRect(0, groundY, canvas.width, 40);

      // Accent Stripe on top of ground
      ctx.fillStyle = '#E65F2B';
      ctx.fillRect(0, groundY, canvas.width, 3);

      // Draw Obstacles
      obstaclesRef.current.forEach((obs) => {
        // Main obstacle body
        ctx.fillStyle = obs.color;
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);

        // Highlight top cap
        ctx.fillStyle = '#E65F2B';
        ctx.fillRect(obs.x, obs.y, obs.width, 4);
      });

      // Draw Particles
      particlesRef.current.forEach((pt) => {
        ctx.save();
        ctx.globalAlpha = Math.max(0, pt.life);
        ctx.fillStyle = pt.color;
        ctx.fillRect(pt.x - pt.size / 2, pt.y - pt.size / 2, pt.size, pt.size);
        ctx.restore();
      });

      // Draw Floating Texts
      floatTextsRef.current.forEach((ft) => {
        ctx.save();
        ctx.globalAlpha = Math.max(0, ft.opacity);
        ctx.font = 'bold 12px monospace';
        ctx.fillStyle = ft.color;
        ctx.fillText(ft.text, ft.x, ft.y);
        ctx.restore();
      });

      // Draw Player Cube (If playing or idle)
      const p = playerRef.current;
      if (gameStateRef.current !== 'gameover') {
        ctx.save();
        ctx.translate(p.x + p.width / 2, p.y + p.height / 2);
        ctx.rotate(p.rotation);

        // Outer Orange Body
        ctx.fillStyle = '#E65F2B';
        ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);

        // Inner Eyes / Face
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(-p.width / 4, -p.height / 4, 7, 7);
        ctx.fillRect(p.width / 8, -p.height / 4, 7, 7);
        ctx.restore();
      }
    };

    const loop = () => {
      update();
      draw();
      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Keyboard Event Handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        if (gameStateRef.current === 'idle' || gameStateRef.current === 'gameover') {
          startGame();
        } else {
          triggerJump();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="w-full bg-[#1B1E23] rounded-2xl overflow-hidden shadow-2xl border border-white/10 text-white p-4 sm:p-6">
      {/* HUD Header Bar */}
      <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 rounded-full bg-[#E65F2B] animate-ping" />
          <h3 className="text-lg font-bold font-heading text-white">Block Dash 2D Engine Demo</h3>
        </div>
        <div className="flex items-center space-x-4 sm:space-x-6 text-xs font-mono">
          <div className="flex items-center space-x-1.5 text-amber-400 font-bold">
            <Trophy className="w-4 h-4" />
            <span>HI: {highScore}</span>
          </div>
          <div className="text-white font-bold text-sm bg-white/10 px-3.5 py-1.5 rounded-lg border border-white/10 flex items-center space-x-2">
            <span className="text-xs text-zinc-400">SCORE:</span>
            <span className="text-amber-300 font-extrabold text-base">{score}</span>
          </div>
        </div>
      </div>

      {/* Canvas Interactive Viewport */}
      <div
        onClick={() => {
          if (gameState === 'playing') triggerJump();
          else startGame();
        }}
        className="relative w-full aspect-[2/1] bg-[#F4F2EC] rounded-xl overflow-hidden cursor-pointer select-none border border-white/10 shadow-inner group"
      >
        <canvas ref={canvasRef} width={640} height={260} className="w-full h-full block" />

        {/* State Overlay: Start Screen */}
        {gameState === 'idle' && (
          <div className="absolute inset-0 bg-black/65 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6">
            <h4 className="text-2xl sm:text-3xl font-extrabold text-white font-heading mb-2 tracking-wide">
              BLOCK DASH 2D
            </h4>
            <p className="text-xs text-zinc-300 max-w-sm mb-6 leading-relaxed">
              Real-time physics engine, single-touch jump mechanics, obstacle clearance bonus, and instant AABB collision detection.
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                startGame();
              }}
              className="flex items-center space-x-2 px-6 py-3 rounded-full bg-[#E65F2B] hover:bg-[#d45220] text-white font-bold text-xs sm:text-sm shadow-xl transition-all transform hover:scale-105 active:scale-95"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>TAP OR PRESS SPACE TO PLAY</span>
            </button>
          </div>
        )}

        {/* State Overlay: Game Over Screen */}
        {gameState === 'gameover' && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center text-center p-6 animate-fadeIn">
            <div className="p-3 rounded-full bg-red-500/20 text-red-500 mb-3 border border-red-500/30">
              <ShieldAlert className="w-8 h-8 animate-bounce" />
            </div>
            <h4 className="text-2xl font-extrabold text-white font-heading tracking-wide mb-1">
              GAME OVER
            </h4>
            <div className="flex items-center space-x-4 my-3 text-sm font-mono bg-white/10 px-4 py-2 rounded-xl border border-white/10">
              <div>
                <span className="text-xs text-zinc-400 block">FINAL SCORE</span>
                <span className="text-amber-400 font-bold text-lg">{score}</span>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div>
                <span className="text-xs text-zinc-400 block">HIGH SCORE</span>
                <span className="text-white font-bold text-lg">{highScore}</span>
              </div>
            </div>
            {newHighScoreAchieved && (
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>NEW HIGH SCORE!</span>
              </div>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                startGame();
              }}
              className="flex items-center space-x-2 px-6 py-3 rounded-full bg-[#E65F2B] hover:bg-[#d45220] text-white font-bold text-xs sm:text-sm shadow-xl transition-all transform hover:scale-105 active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>RETRY GAME (SPACE)</span>
            </button>
          </div>
        )}
      </div>

      {/* Engine Technical Features Bar */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[11px] text-zinc-400 font-mono">
        <div className="bg-white/5 p-2 rounded-lg border border-white/5">60 FPS Physics Engine</div>
        <div className="bg-white/5 p-2 rounded-lg border border-white/5">AABB Collision Detection</div>
        <div className="bg-white/5 p-2 rounded-lg border border-white/5">Dynamic Score Accumulation</div>
        <div className="bg-white/5 p-2 rounded-lg border border-white/5">Tap / Space Jump</div>
      </div>
    </div>
  );
};
