export default function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 px-2.5 py-0.5 text-xs">
      {children}
    </span>
  )
}


