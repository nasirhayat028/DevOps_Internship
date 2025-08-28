export default function Card({ children, className = '' }) {
  return (
    <div className={`rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 backdrop-blur p-5 ${className}`}>
      {children}
    </div>
  )
}


