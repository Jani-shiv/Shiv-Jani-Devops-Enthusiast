"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Trophy, RefreshCw, Terminal, Gamepad2, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Play, Pause, Square } from "lucide-react"

type Point = { x: number; y: number }
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT"
type GameState = "MENU" | "PLAYING" | "PAUSED" | "GAME_OVER"

const GRID_SIZE = 20
const CELL_SIZE = 20
const INITIAL_SPEED = 150

export default function SnakeGame() {
  const [isOpen, setIsOpen] = useState(false)
  const [gameState, setGameState] = useState<GameState>("MENU")
  const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }])
  const [food, setFood] = useState<Point>({ x: 15, y: 15 })
  const [direction, setDirection] = useState<Direction>("RIGHT")
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const directionRef = useRef<Direction>("RIGHT")
  const gameLoopRef = useRef<NodeJS.Timeout>(null)
  const [speed, setSpeed] = useState(INITIAL_SPEED)
  
  // Load High Score
  useEffect(() => {
    const savedScore = localStorage.getItem("snakeHighScore")
    if (savedScore) setHighScore(parseInt(savedScore))
  }, [])

  // Generate random food
  const generateFood = useCallback((): Point => {
    return {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    }
  }, [])

  const updateHighScore = useCallback((currentScore: number) => {
    setHighScore((prev) => {
      if (currentScore > prev) {
        localStorage.setItem("snakeHighScore", currentScore.toString())
        return currentScore
      }
      return prev
    })
  }, [])

  const startGame = () => {
    setSnake([{ x: 10, y: 10 }])
    setFood(generateFood())
    setDirection("RIGHT")
    directionRef.current = "RIGHT"
    setScore(0)
    setSpeed(INITIAL_SPEED)
    setGameState("PLAYING")
  }
  
  const pauseGame = useCallback(() => {
      setGameState((prev) => {
          if (prev === "PLAYING") return "PAUSED"
          if (prev === "PAUSED") return "PLAYING"
          return prev
      })
  }, [])
  
  const stopGame = () => {
      setGameState("MENU")
  }

  // Handle Input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      
      // Game Controls via Keyboard
      if (e.key === " " && (gameState === "PLAYING" || gameState === "PAUSED")) {
          pauseGame()
          return
      }
      
      if (gameState !== "PLAYING") return
      
      switch (e.key) {
        case "ArrowUp":
        case "w":
          if (directionRef.current !== "DOWN") setDirection("UP")
          break
        case "ArrowDown":
        case "s":
          if (directionRef.current !== "UP") setDirection("DOWN")
          break
        case "ArrowLeft":
        case "a":
          if (directionRef.current !== "RIGHT") setDirection("LEFT")
          break
        case "ArrowRight":
        case "d":
          if (directionRef.current !== "LEFT") setDirection("RIGHT")
          break
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, gameState, pauseGame])

  // Game Loop
  useEffect(() => {
    if (!isOpen || gameState !== "PLAYING") return

    gameLoopRef.current = setInterval(() => {
      setSnake((prevSnake) => {
        const head = prevSnake[0]
        const newHead = { ...head }

        directionRef.current = direction // Sync current direction

        switch (direction) {
          case "UP": newHead.y -= 1; break
          case "DOWN": newHead.y += 1; break
          case "LEFT": newHead.x -= 1; break
          case "RIGHT": newHead.x += 1; break
        }

        // Check Collision with Walls
        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE
        ) {
          setGameState("GAME_OVER")
          updateHighScore(score)
          return prevSnake
        }

        // Check Collision with Self
        if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
          setGameState("GAME_OVER")
          updateHighScore(score)
          return prevSnake
        }

        const newSnake = [newHead, ...prevSnake]

        // Check Food
        if (newHead.x === food.x && newHead.y === food.y) {
          const newScore = score + 10
          setScore(newScore)
          updateHighScore(newScore) // Real-time high score update
          setFood(generateFood())
          setSpeed((s) => Math.max(50, s * 0.98)) // Increase speed
        } else {
          newSnake.pop() // Remove tail
        }

        return newSnake
      })
    }, speed)

    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current)
    }
  }, [isOpen, gameState, direction, food, speed, generateFood, score, updateHighScore])


  return (
    <>
      {/* Floating Trigger Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => { setIsOpen(true); setGameState("MENU"); }}
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-4 py-3 bg-primary text-background rounded-full font-bold shadow-[0_0_20px_rgba(var(--color-primary),0.4)] border-2 border-primary/50 hover:bg-primary/90 transition-all animate-bounce"
        style={{ zIndex: 9999 }} // Force top z-index
      >
        <Gamepad2 size={24} />
        <span className="hidden md:inline">Play Game</span>
      </motion.button>

      {/* Game Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#0c0c0c] border border-primary/30 w-full max-w-md rounded-xl overflow-hidden shadow-2xl relative flex flex-col min-h-[500px]"
            >
              {/* Terminal Header */}
              <div className="bg-secondary/20 p-3 border-b border-primary/20 flex items-center justify-between">
                <div className="flex items-center gap-2 text-primary font-mono text-sm">
                  <Terminal size={16} />
                  <span>snake_game.exe</span>
                </div>
                <div className="flex items-center gap-2">
                    <button 
                        onClick={() => setIsOpen(false)}
                        className="text-muted-foreground hover:text-red-500 transition-colors ml-2"
                    >
                        <X size={20} />
                    </button>
                </div>
              </div>

              {/* MENU VIEW */}
              {gameState === "MENU" && (
                 <div className="p-6 flex flex-col items-center justify-center h-full font-mono space-y-8 absolute inset-0">
                     <div className="text-center space-y-2">
                        <Gamepad2 size={64} className="text-primary mx-auto mb-4" />
                        <h2 className="text-3xl font-bold text-foreground tracking-tighter">SNAKE.EXE</h2>
                        <p className="text-muted-foreground text-sm">Retro Terminal Edition</p>
                     </div>
                     
                     <div className="bg-secondary/10 border border-primary/20 p-4 rounded text-center w-full max-w-xs">
                         <div className="text-muted-foreground text-xs flex items-center justify-center gap-1 mb-1">
                             <Trophy size={12} /> Local High Score
                         </div>
                         <div className="text-4xl font-bold text-yellow-500">{highScore}</div>
                     </div>
                     
                     <button 
                         onClick={startGame}
                         className="px-8 py-3 bg-primary text-background font-bold rounded-lg hover:bg-primary/90 transition-all flex items-center gap-2 text-lg shadow-[0_0_15px_rgba(var(--color-primary),0.4)] animate-pulse"
                     >
                         <Play size={20} fill="currentColor" />
                         START GAME
                     </button>
                 </div>
              )}

              {/* GAME VIEW */}
              {(gameState === "PLAYING" || gameState === "PAUSED" || gameState === "GAME_OVER") && (
                  <div className="p-4 flex flex-col items-center gap-4 relative h-full justify-center">
                    
                    {/* Score Board */}
                    <div className="flex justify-between w-full font-mono text-sm text-primary/80 px-2 absolute top-4 left-0 right-0">
                        <div className="flex items-center gap-2 ml-4">
                            <span>SCORE: {score}</span>
                        </div>
                        <div className="flex items-center gap-2 text-yellow-500 mr-4">
                            <Trophy size={14} />
                            <span>HIGH: {highScore}</span>
                        </div>
                    </div>
                    
                    {/* Controls Header */}
                     <div className="absolute top-4 right-1/2 translate-x-1/2 flex gap-2">
                         {gameState === "PLAYING" && (
                             <button onClick={pauseGame} className="text-yellow-500 hover:text-yellow-400 p-1 bg-black/50 rounded" title="Pause">
                                 <Pause size={16} />
                             </button>
                         )}
                         {gameState === "PAUSED" && (
                             <button onClick={pauseGame} className="text-green-500 hover:text-green-400 p-1 bg-black/50 rounded" title="Resume">
                                 <Play size={16} />
                             </button>
                         )}
                         <button onClick={stopGame} className="text-red-500 hover:text-red-400 p-1 bg-black/50 rounded" title="Exit">
                             <Square size={16} fill="currentColor" />
                         </button>
                     </div>

                    {/* Grid */}
                    <div 
                        className="relative bg-black/50 border-2 border-primary/20 rounded shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] mt-8"
                        style={{ 
                            width: GRID_SIZE * CELL_SIZE, 
                            height: GRID_SIZE * CELL_SIZE 
                        }}
                    >
                        {/* Snake */}
                        {snake.map((segment, i) => (
                            <div
                                key={i}
                                className="absolute bg-primary"
                                style={{
                                    width: CELL_SIZE - 2,
                                    height: CELL_SIZE - 2,
                                    left: segment.x * CELL_SIZE + 1,
                                    top: segment.y * CELL_SIZE + 1,
                                    borderRadius: i === 0 ? '4px' : '2px', // Head vs Body
                                    opacity: i === 0 ? 1 : 0.7
                                }}
                            />
                        ))}

                        {/* Food */}
                        <div
                            className="absolute bg-red-500 animate-pulse rounded-full"
                            style={{
                                width: CELL_SIZE - 4,
                                height: CELL_SIZE - 4,
                                left: food.x * CELL_SIZE + 2,
                                top: food.y * CELL_SIZE + 2,
                                boxShadow: "0 0 10px rgba(239, 68, 68, 0.6)"
                            }}
                        />
                        
                        {/* Pause Overlay */}
                        {gameState === "PAUSED" && (
                            <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center">
                                <span className="text-primary font-bold text-xl tracking-widest">PAUSED</span>
                            </div>
                        )}

                        {/* Game Over Overlay */}
                        {gameState === "GAME_OVER" && (
                            <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-center p-4 z-10">
                                <h3 className="text-2xl font-bold text-red-500 mb-2 font-mono">GAME OVER</h3>
                                <div className="text-4xl font-bold text-white mb-6">Score: {score}</div>
                                <div className="flex gap-4">
                                    <button
                                        onClick={stopGame}
                                        className="px-6 py-2 bg-secondary text-foreground font-bold rounded hover:bg-secondary/80 transition-colors"
                                    >
                                        MENU
                                    </button>
                                    <button
                                        onClick={startGame}
                                        className="flex items-center gap-2 px-6 py-2 bg-primary text-background font-bold rounded hover:bg-primary/90 transition-colors"
                                    >
                                        <RefreshCw size={18} />
                                        RETRY
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Mobile Controls */}
                    <div className="grid grid-cols-3 gap-2 mt-2 md:hidden">
                        <div />
                        <button 
                            className="p-3 bg-secondary/20 rounded-lg active:bg-primary/30"
                            onClick={() => { if (directionRef.current !== "DOWN") setDirection("UP") }}
                        >
                            <ChevronUp className="text-primary" />
                        </button>
                        <div />
                        <button 
                            className="p-3 bg-secondary/20 rounded-lg active:bg-primary/30"
                            onClick={() => { if (directionRef.current !== "RIGHT") setDirection("LEFT") }}
                        >
                            <ChevronLeft className="text-primary" />
                        </button>
                         <button 
                            className="p-3 bg-secondary/20 rounded-lg active:bg-primary/30"
                            onClick={() => { if (directionRef.current !== "UP") setDirection("DOWN") }}
                        >
                            <ChevronDown className="text-primary" />
                        </button>
                        <button 
                            className="p-3 bg-secondary/20 rounded-lg active:bg-primary/30"
                            onClick={() => { if (directionRef.current !== "LEFT") setDirection("RIGHT") }}
                        >
                            <ChevronRight className="text-primary" />
                        </button>
                    </div>
                  </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
