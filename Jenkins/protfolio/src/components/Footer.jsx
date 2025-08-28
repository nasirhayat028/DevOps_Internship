export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-16 border-t border-neutral-200 dark:border-neutral-800">
      <div className="container-default py-8 text-center text-sm text-neutral-600 dark:text-neutral-400">
        © {year} Nasir Hayat
      </div>
    </footer>
  )
}


