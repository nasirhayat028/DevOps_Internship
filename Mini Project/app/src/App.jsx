import React from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Game from './pages/Game.jsx'
import Leaderboard from './pages/Leaderboard.jsx'

const Nav = () => (
  <nav className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 bg-slate-900/80 border-b border-slate-800">
    <div className="max-w-5xl mx-auto px-4">
      <div className="flex items-center justify-between h-14">
        <div className="text-lg font-bold tracking-wide">Mini Game</div>
        <div className="flex gap-4">
          <NavLink className={({ isActive }) => `px-3 py-1 rounded transition-colors ${isActive ? 'bg-teal-500 text-slate-900' : 'hover:bg-slate-800'}`} to="/">Home</NavLink>
          <NavLink className={({ isActive }) => `px-3 py-1 rounded transition-colors ${isActive ? 'bg-teal-500 text-slate-900' : 'hover:bg-slate-800'}`} to="/game">Game</NavLink>
          <NavLink className={({ isActive }) => `px-3 py-1 rounded transition-colors ${isActive ? 'bg-teal-500 text-slate-900' : 'hover:bg-slate-800'}`} to="/leaderboard">Leaderboard</NavLink>
        </div>
      </div>
    </div>
  </nav>
)

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </main>
      <footer className="border-t border-slate-800 py-6 text-center text-sm text-slate-400">
        Built with React + Vite + Tailwind
      </footer>
    </div>
  )
}


