import { motion } from 'framer-motion'
import Card from '../components/Card'
import Badge from '../components/Badge'
import Section from '../components/Section'
import ProgressBar from '../components/ProgressBar'

const coreSkills = [
  { name: 'Linux', level: 80 },
  { name: 'Git', level: 80 },
  { name: 'Docker', level: 75 },
  { name: 'Kubernetes', level: 60 },
  { name: 'CI/CD', level: 65 },
  { name: 'AWS', level: 40 },
]

const tooling = ['Bash', 'Node.js', 'Express', 'MongoDB', 'Redis', 'NGINX', 'Helm (learning)', 'Terraform (learning)', 'GitHub Actions', 'Docker Hub', 'ECR/EKS (learning)']

export default function Skills() {
  return (
    <main className="container-default py-10">
      <Section title="Skills" subtitle="Core capabilities and operational tooling."></Section>

      <div className="mt-6 grid md:grid-cols-2 gap-5">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Card>
            <h3 className="font-semibold">Core</h3>
            <div className="mt-4 space-y-4">
              {coreSkills.map((s) => (
                <div key={s.name}>
                  <div className="flex items-center justify-between text-sm">
                    <span>{s.name}</span>
                    <span className="text-neutral-500">{s.level}%</span>
                  </div>
                  <ProgressBar value={s.level} />
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }}>
          <Card>
            <h3 className="font-semibold">Tooling</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {tooling.map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </main>
  )
}


