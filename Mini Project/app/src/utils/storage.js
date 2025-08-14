const STORAGE_KEY = 'mini-game:scores'

export function getScores() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function addScore(entry) {
  const current = getScores()
  const withId = { id: crypto.randomUUID(), ...entry }
  const updated = [...current, withId]
    .sort((a, b) => b.score - a.score)
    .slice(0, 20)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  return updated
}


