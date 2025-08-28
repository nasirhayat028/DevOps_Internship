import { motion } from 'framer-motion'
import profilePic from '../assets/Profile.jpg'
import Button from '../components/Button'
import Section from '../components/Section'
import Stat from '../components/Stat'
import { Github, Linkedin, Mail, Phone, FileText, MessageSquare, Cloud, Boxes, Container, Network } from 'lucide-react'

export default function Home() {
  return (
    <main className="container-default py-10">
      <section className="grid md:grid-cols-[220px,1fr] gap-8 items-center">
        <motion.img
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          src={profilePic}
          alt="Nasir Hayat"
          className="w-40 h-40 md:w-48 md:h-48 rounded-2xl object-cover border border-neutral-200 dark:border-neutral-800"
        />
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Nasir Hayat</h1>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">DevOps Engineer in Training — Cloud • CI/CD • Kubernetes</p>
          <p className="mt-4 max-w-2xl text-neutral-700 dark:text-neutral-300">
            I build reliable pipelines, ship fast, and automate the boring stuff. Learning at 10x speed using spaced repetition and ruthless iteration.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="mailto:nasirhayat.dev@gmail.com" icon={Mail}>Email</Button>
            <Button href="https://wa.me/923339495197" icon={MessageSquare} target="_blank" rel="noreferrer">WhatsApp</Button>
            <Button href="tel:+923339495197" icon={Phone}>Call</Button>
            <Button href="https://github.com/" icon={Github} target="_blank" rel="noreferrer">GitHub</Button>
            <Button href="https://www.linkedin.com/" icon={Linkedin} target="_blank" rel="noreferrer">LinkedIn</Button>
            <Button href="#" icon={FileText}>Resume</Button>
          </div>
          <div className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
            <span>Pakistan → (Target) Australia</span>
            <span className="mx-2">•</span>
            <span>Open to internships • Remote OK</span>
          </div>
        </motion.div>
      </section>

      <Section title="What I Do" subtitle="Automate, standardize, and ship with confidence.">
        <div className="grid md:grid-cols-4 gap-4">
          <Stat label="Pipelines Built" value="10+" />
          <Stat label="Docker Images" value="20+" />
          <Stat label="K8s Manifests" value="30+" />
          <Stat label="Services Automated" value="15+" />
        </div>
        <div className="mt-6 grid md:grid-cols-4 gap-4 text-sm">
          <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4">
            <div className="flex items-center gap-2 font-medium"><Container size={16}/> Containerization</div>
            <p className="mt-1 text-neutral-600 dark:text-neutral-400">Multi-stage builds, small images, security-first.</p>
          </div>
          <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4">
            <div className="flex items-center gap-2 font-medium"><Boxes size={16}/> CI/CD</div>
            <p className="mt-1 text-neutral-600 dark:text-neutral-400">Fast feedback, reproducible builds, zero-downtime deploys.</p>
          </div>
          <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4">
            <div className="flex items-center gap-2 font-medium"><Network size={16}/> Kubernetes</div>
            <p className="mt-1 text-neutral-600 dark:text-neutral-400">Deployments, Services, PV/PVC, Ingress, Helm basics.</p>
          </div>
          <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4">
            <div className="flex items-center gap-2 font-medium"><Cloud size={16}/> Cloud</div>
            <p className="mt-1 text-neutral-600 dark:text-neutral-400">AWS fundamentals: IAM, EC2, S3, ECR/EKS (learning).</p>
          </div>
        </div>
      </Section>

      <Section title="Highlights" subtitle="Proof of learning speed and delivery mindset.">
        <ul className="grid md:grid-cols-2 gap-3 text-sm">
          <li className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4">Built multi-stage Docker images for Node apps with <span className="font-medium">~70% size reduction</span>.</li>
          <li className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4">Docker Compose dev stack for <span className="font-medium">Node + MongoDB</span> with hot reload.</li>
          <li className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4">Kubernetes deployment for a notes app with <span className="font-medium">PV/PVC</span> and services.</li>
          <li className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4">Wiring <span className="font-medium">CI/CD</span> steps: lint, test, build, push, deploy (WIP).</li>
        </ul>
      </Section>
    </main>
  )
}


