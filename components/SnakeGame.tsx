"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Trophy, RefreshCw, Terminal, Gamepad2, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"

type Point = { x: number; y: number }
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT"

const GRID_SIZE = 20
const CELL_SIZE = 20
const INITIAL_SPEED = 150

export default function SnakeGame() {
  const [isOpen, setIsOpen] = useState(false)
  const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }])
  const [food, setFood] = useState<Point>({ x: 15, y: 15 })
  const [direction, setDirection] = useState<Direction>("RIGHT")
  const [isGameOver, setIsGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const directionRef = useRef<Direction>("RIGHT")
  const gameLoopRef = useRef<NodeJS.Timeout>(null)
  const [speed, setSpeed] = useState(INITIAL_SPEED)

  // Load High Score
  useEffect(() => {
    const saved = localStorage.getItem("snakeHighScore")
    if (saved) setHighScore(parseInt(saved))
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

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }])
    setFood(generateFood())
    setDirection("RIGHT")
    directionRef.current = "RIGHT"
    setScore(0)
    setSpeed(INITIAL_SPEED)
    setIsGameOver(false)
    setIsPaused(false)
  }

  // Handle Input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      
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
        case "Escape":
            setIsOpen(false)
            break
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen])

  // Game Loop
  useEffect(() => {
    if (!isOpen || isGameOver || isPaused) return

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
          setIsGameOver(true)
          updateHighScore(score) // Update high score on game over
          return prevSnake
        }

        // Check Collision with Self
        if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
          setIsGameOver(true)
          updateHighScore(score) // Update high score on game over
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
  }, [isOpen, isGameOver, isPaused, direction, food, speed, generateFood, score, updateHighScore])


  return (
    <>
      {/* Floating Trigger Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => { setIsOpen(true); resetGame(); }}
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
              className="bg-[#0c0c0c] border border-primary/30 w-full max-w-md rounded-xl overflow-hidden shadow-2xl relative flex flex-col"
            >
              {/* Terminal Header */}
              <div className="bg-secondary/20 p-3 border-b border-primary/20 flex items-center justify-between">
                <div className="flex items-center gap-2 text-primary font-mono text-sm">
                  <Terminal size={16} />
                  <span>snake_game.exe</span>
                </div>
                <button 
                    onClick={() => setIsOpen(false)}
                    className="text-muted-foreground hover:text-red-500 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Game Area */}
              <div className="p-4 flex flex-col items-center gap-4 relative">
                
                {/* Score Board */}
                <div className="flex justify-between w-full font-mono text-sm text-primary/80 px-2">
                    <div className="flex items-center gap-2">
                        <span>SCORE: {score}</span>
                    </div>
                    <div className="flex items-center gap-2 text-yellow-500">
                        <Trophy size={14} />
                        <span>HIGH: {highScore}</span>
                    </div>
                </div>

                {/* Grid */}
                <div 
                    className="relative bg-black/50 border-2 border-primary/20 rounded shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]"
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

                    {/* Game Over Overlay */}
                    {isGameOver && (
                        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-center p-4">
                            <h3 className="text-2xl font-bold text-red-500 mb-2 font-mono">GAME OVER</h3>
                            <p className="text-muted-foreground text-sm mb-4">You crashed!</p>
                            <button
                                onClick={resetGame}
                                className="flex items-center gap-2 px-4 py-2 bg-primary text-background font-bold rounded hover:bg-primary/90 transition-colors"
                            >
                                <RefreshCw size={16} />
                                Try Again
                            </button>
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
                
                <p className="text-[10px] text-muted-foreground font-mono hidden md:block">
                    Use ARROW KEYS or WASD to move
                </p>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
