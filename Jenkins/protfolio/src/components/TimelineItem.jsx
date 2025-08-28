export default function TimelineItem({ period, title, details }) {
  return (
    <div className="relative pl-6">
      <div className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-emerald-600" />
      <div className="text-xs text-neutral-500">{period}</div>
      <div className="font-medium">{title}</div>
      {details ? <div className="text-sm text-neutral-600 dark:text-neutral-400">{details}</div> : null}
    </div>
  )
}


