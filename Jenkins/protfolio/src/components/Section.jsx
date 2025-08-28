export default function Section({ title, subtitle, children }) {
  return (
    <section className="mt-10">
      {(title || subtitle) && (
        <header className="mb-4">
          {title ? <h2 className="text-xl md:text-2xl font-bold tracking-tight">{title}</h2> : null}
          {subtitle ? <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">{subtitle}</p> : null}
        </header>
      )}
      {children}
    </section>
  )
}


