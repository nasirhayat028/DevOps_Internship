import { motion } from 'framer-motion'
import Card from '../components/Card'
import Badge from '../components/Badge'
import Section from '../components/Section'
import { ExternalLink } from 'lucide-react'

const projects = [
  {
    title: 'Multi-stage Node.js Docker image',
    summary: 'Built a small Node.js app and Dockerized using multi-stage builds. Pushed optimized image to Docker Hub.',
    badges: ['Node.js', 'Docker', 'Best practices'],
    link: '#',
  },
  {
    title: 'Todo App — Node + MongoDB on Docker Compose',
    summary: 'CRUD Todo service with Express and MongoDB. Local dev via docker-compose with hot reload.',
    badges: ['Express', 'MongoDB', 'Docker Compose'],
    link: '#',
  },
  {
    title: 'Kubernetes Notes App',
    summary: 'Deployed a notes app on K8s with Deployments, Services, and persistent volumes/claims.',
    badges: ['Kubernetes', 'PV/PVC', 'Services'],
    link: '#',
  },
  {
    title: 'NGINX Reverse Proxy + Rate Limiting',
    summary: 'Configured NGINX as a reverse proxy with caching and basic rate-limiting for a Node backend.',
    badges: ['NGINX', 'Caching', 'Rate limit'],
    link: '#',
  },
  {
    title: 'GitHub Actions CI for Dockerized App',
    summary: 'Pipeline to lint, test, build multi-arch image and push to Docker Hub on tags.',
    badges: ['GitHub Actions', 'CI', 'Docker Hub'],
    link: '#',
  },
  {
    title: 'Helm Chart (Learning)',
    summary: 'Converted K8s manifests to a basic Helm chart with values for envs (WIP).',
    badges: ['Helm', 'Kubernetes', 'Templates'],
    link: '#',
  },
]

export default function Projects() {
  return (
    <main className="container-default py-10">
      <Section title="Projects" subtitle="Hands-on DevOps work across containers, CI/CD, and Kubernetes." />
      <div className="mt-6 grid md:grid-cols-2 gap-5">
        {projects.map((p, i) => (
          <motion.div key={p.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.05 }}>
            <Card>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{p.summary}</p>
                </div>
                <a href={p.link} target="_blank" rel="noreferrer" className="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300">
                  <ExternalLink size={18} />
                </a>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.badges.map((b) => <Badge key={b}>{b}</Badge>)}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </main>
  )
}


