export default function ProgressBar({ value }) {
  return (
    <div className="h-2 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
      <div className="h-full bg-emerald-600 dark:bg-emerald-500" style={{ width: `${value}%` }} />
    </div>
  )
}


