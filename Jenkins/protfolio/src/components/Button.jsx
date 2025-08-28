export default function Button({ children, as: Component = 'a', href = '#', onClick, className = '', icon: Icon, ...props }) {
  const base = 'inline-flex items-center gap-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-2 text-sm hover:shadow-sm hover:-translate-y-0.5 transition-transform'
  return (
    <Component href={href} onClick={onClick} className={`${base} ${className}`} {...props}>
      {Icon ? <Icon size={16} /> : null}
      {children}
    </Component>
  )
}


