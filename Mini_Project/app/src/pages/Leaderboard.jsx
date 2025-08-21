import React, { useEffect, useState } from 'react'
import { getScores } from '../utils/storage.js'

export default function Leaderboard() {
  const [scores, setScores] = useState([])

  useEffect(() => {
    setScores(getScores())
  }, [])

  return (
    <section className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">Leaderboard</h2>
      {scores.length === 0 ? (
        <p className="text-slate-400">No scores yet. Play a game to set the first record!</p>
      ) : (
        <ol className="space-y-2">
          {scores.map((s, idx) => (
            <li key={s.id} className="flex items-center justify-between bg-slate-800 rounded px-4 py-2">
              <div className="flex items-center gap-3">
                <span className="w-6 text-slate-400">#{idx + 1}</span>
                <span className="font-semibold">{s.name}</span>
              </div>
              <div className="text-teal-400 font-bold">{s.score}</div>
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}


