export default function ContactCard({ icon: Icon, title, value, href }) {
  const Comp = href ? 'a' : 'div'
  return (
    <Comp href={href} target={href?.startsWith('http') ? '_blank' : undefined} rel={href?.startsWith('http') ? 'noreferrer' : undefined} className="flex items-center gap-3 rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 bg-white/60 dark:bg-neutral-900/60 hover:shadow-sm">
      {Icon ? <Icon size={18} className="text-emerald-600 dark:text-emerald-400" /> : null}
      <div>
        <div className="text-xs uppercase tracking-wide text-neutral-500">{title}</div>
        <div className="text-sm font-medium">{value}</div>
      </div>
    </Comp>
  )
}


