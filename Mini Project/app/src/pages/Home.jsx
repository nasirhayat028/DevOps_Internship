import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Play the Snake Mini Game</h1>
          <p className="text-slate-300">Use arrow keys or swipe to control the snake. Eat food, avoid hitting walls or yourself, and climb the leaderboard!</p>
          <div className="flex gap-3">
            <Link to="/game" className="px-4 py-2 bg-teal-500 text-slate-900 font-semibold rounded hover:scale-[1.02] active:scale-100 transition-transform">Start Game</Link>
            <Link to="/leaderboard" className="px-4 py-2 border border-slate-700 rounded hover:bg-slate-800">View Leaderboard</Link>
          </div>
        </div>
        <div className="relative aspect-square rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
          <div className="absolute inset-0 animate-pulse bg-[radial-gradient(circle_at_30%_10%,rgba(45,212,191,0.15),transparent_50%),radial-gradient(circle_at_80%_70%,rgba(14,165,233,0.15),transparent_50%)]" />
          <div className="absolute bottom-4 right-4 text-slate-400 text-xs">Keyboard + touch controls</div>
        </div>
      </div>
    </section>
  )
}


