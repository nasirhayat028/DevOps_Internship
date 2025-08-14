import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { addScore } from '../utils/storage.js'

const GRID_SIZE = 20
const INITIAL_SPEED_MS = 140
const SNAKE_START = [{ x: 8, y: 10 }]
const DIRECTIONS = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
}

function randomFood(excludeCells) {
  const occupied = new Set(excludeCells.map(c => `${c.x},${c.y}`))
  while (true) {
    const x = Math.floor(Math.random() * GRID_SIZE)
    const y = Math.floor(Math.random() * GRID_SIZE)
    const key = `${x},${y}`
    if (!occupied.has(key)) return { x, y }
  }
}

function useInterval(callback, delay) {
  const savedCallback = useRef()
  useEffect(() => { savedCallback.current = callback }, [callback])
  useEffect(() => {
    if (delay == null) return
    const id = setInterval(() => savedCallback.current?.(), delay)
    return () => clearInterval(id)
  }, [delay])
}

export default function Game() {
  const [snake, setSnake] = useState(SNAKE_START)
  const [dir, setDir] = useState(DIRECTIONS.ArrowRight)
  const [food, setFood] = useState(() => randomFood(SNAKE_START))
  const [score, setScore] = useState(0)
  const [isAlive, setIsAlive] = useState(true)
  const [speed, setSpeed] = useState(INITIAL_SPEED_MS)

  const boardRef = useRef(null)
  const touchStart = useRef(null)
  const pointerStart = useRef(null)

  const cells = useMemo(() => GRID_SIZE * GRID_SIZE, [])

  const snakeSet = useMemo(() => new Set(snake.map(c => `${c.x},${c.y}`)), [snake])

  const head = snake[0]

  const changeDirection = useCallback((next) => {
    if (!next) return
    const opposite = { x: -dir.x, y: -dir.y }
    if (next.x === opposite.x && next.y === opposite.y) return
    setDir(next)
  }, [dir])

  useEffect(() => {
    const onKey = (e) => {
      if (DIRECTIONS[e.key]) {
        e.preventDefault()
        changeDirection(DIRECTIONS[e.key])
      }
      if (!isAlive && e.key === 'Enter') restart()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [changeDirection, isAlive])

  const step = useCallback(() => {
    if (!isAlive) return
    const nextHead = { x: head.x + dir.x, y: head.y + dir.y }
    if (nextHead.x < 0 || nextHead.y < 0 || nextHead.x >= GRID_SIZE || nextHead.y >= GRID_SIZE) {
      setIsAlive(false)
      return
    }
    const nextKey = `${nextHead.x},${nextHead.y}`
    const willEat = nextHead.x === food.x && nextHead.y === food.y
    const bodyWithoutTail = willEat ? snake : snake.slice(0, -1)
    const bodySet = new Set(bodyWithoutTail.map(c => `${c.x},${c.y}`))
    if (bodySet.has(nextKey)) {
      setIsAlive(false)
      return
    }
    const newSnake = [nextHead, ...snake]
    if (willEat) {
      setScore(s => s + 10)
      setFood(randomFood(newSnake))
      setSpeed(ms => Math.max(70, Math.floor(ms * 0.96)))
    } else {
      newSnake.pop()
    }
    setSnake(newSnake)
  }, [dir, head, food, snake, isAlive])

  useInterval(step, isAlive ? speed : null)

  const restart = useCallback(() => {
    setSnake(SNAKE_START)
    setDir(DIRECTIONS.ArrowRight)
    setFood(randomFood(SNAKE_START))
    setScore(0)
    setSpeed(INITIAL_SPEED_MS)
    setIsAlive(true)
  }, [])

  useEffect(() => {
    if (!isAlive) {
      const name = 'Player'
      addScore({ name, score })
    }
  }, [isAlive, score])

  // touch controls
  const onTouchStart = (e) => {
    const t = e.touches[0]
    touchStart.current = { x: t.clientX, y: t.clientY }
  }
  const onTouchMove = (e) => {
    if (!touchStart.current) return
    const t = e.touches[0]
    const dx = t.clientX - touchStart.current.x
    const dy = t.clientY - touchStart.current.y
    if (Math.abs(dx) + Math.abs(dy) < 24) return
    if (Math.abs(dx) > Math.abs(dy)) {
      changeDirection(dx > 0 ? DIRECTIONS.ArrowRight : DIRECTIONS.ArrowLeft)
    } else {
      changeDirection(dy > 0 ? DIRECTIONS.ArrowDown : DIRECTIONS.ArrowUp)
    }
    touchStart.current = null
  }

  // mouse/pointer controls
  const onPointerDown = (e) => {
    pointerStart.current = { x: e.clientX, y: e.clientY }
  }
  const onPointerMove = (e) => {
    if (e.pressure === 0) return
    if (!pointerStart.current) return
    const dx = e.clientX - pointerStart.current.x
    const dy = e.clientY - pointerStart.current.y
    if (Math.abs(dx) + Math.abs(dy) < 24) return
    if (Math.abs(dx) > Math.abs(dy)) {
      changeDirection(dx > 0 ? DIRECTIONS.ArrowRight : DIRECTIONS.ArrowLeft)
    } else {
      changeDirection(dy > 0 ? DIRECTIONS.ArrowDown : DIRECTIONS.ArrowUp)
    }
    pointerStart.current = null
  }

  return (
    <section className="max-w-5xl mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-3">
            <div className="text-slate-400">Score</div>
            <div className="text-2xl font-extrabold text-teal-400 tabular-nums">{score}</div>
          </div>
          <div
            ref={boardRef}
            className="relative mx-auto aspect-square max-w-[min(90vw,520px)] rounded-xl overflow-hidden bg-slate-800 grid"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`, gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`, touchAction: 'none' }}
          >
            {Array.from({ length: cells }).map((_, i) => {
              const x = i % GRID_SIZE
              const y = Math.floor(i / GRID_SIZE)
              const key = `${x},${y}`
              const isSnake = snakeSet.has(key)
              const isFood = food.x === x && food.y === y
              return (
                <div
                  key={i}
                  className={`border border-slate-900/40 ${isSnake ? 'bg-teal-400 shadow-[0_0_12px_rgba(45,212,191,0.6)] transition-colors' : isFood ? 'bg-rose-400 animate-pulse' : ''}`}
                />
              )
            })}
            {!isAlive && (
              <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6">
                <div className="text-3xl font-extrabold mb-2">Game Over</div>
                <div className="text-slate-300 mb-4">Your score: <span className="text-teal-400 font-bold">{score}</span></div>
                <button onClick={restart} className="px-4 py-2 bg-teal-500 text-slate-900 rounded font-semibold">Play Again (Enter)</button>
              </div>
            )}
          </div>
        </div>
        <div className="md:w-64">
          <div className="bg-slate-800 rounded-lg p-4 space-y-2">
            <h3 className="font-semibold">Controls</h3>
            <ul className="text-sm text-slate-300 list-disc pl-5 space-y-1">
              <li>Arrow keys, swipe, or drag to move</li>
              <li>Eat food to grow + speed up</li>
              <li>Don't hit walls or yourself</li>
              <li>Enter to restart after game over</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}


