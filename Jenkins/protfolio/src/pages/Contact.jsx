import { motion } from 'framer-motion'
import Card from '../components/Card'
import Button from '../components/Button'
import Section from '../components/Section'
import ContactCard from '../components/ContactCard'
import { Mail, Phone, MessageSquare, Github, Linkedin, MapPin, Globe } from 'lucide-react'

export default function Contact() {
  return (
    <main className="container-default py-10">
      <Section title="Contact" subtitle="Reach out for internships, remote roles, or collaborations."></Section>

      <div className="mt-6 grid md:grid-cols-2 gap-5">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Card>
            <div className="grid gap-3">
              <ContactCard icon={Mail} title="Email" value="nasirhayat.dev@gmail.com" href="mailto:nasirhayat.dev@gmail.com" />
              <ContactCard icon={Phone} title="Phone" value="+92 333 949 5197" href="tel:+923339495197" />
              <ContactCard icon={MessageSquare} title="WhatsApp" value="923339495197" href="https://wa.me/923339495197" />
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }}>
          <Card>
            <div className="grid gap-3">
              <ContactCard icon={Github} title="GitHub" value="github.com" href="https://github.com/" />
              <ContactCard icon={Linkedin} title="LinkedIn" value="linkedin.com" href="https://www.linkedin.com/" />
              <ContactCard icon={MapPin} title="Location" value="Pakistan → (Target) Australia" />
              <ContactCard icon={Globe} title="Availability" value="Open to internships • Remote OK" />
            </div>
          </Card>
        </motion.div>
      </div>

      <div className="mt-6">
        <Card>
          <div className="text-sm text-neutral-600 dark:text-neutral-400">Prefer email? I usually respond within 24 hours with clear next steps.</div>
          <div className="mt-3">
            <Button href="mailto:nasirhayat.dev@gmail.com" icon={Mail}>Send an Email</Button>
          </div>
        </Card>
      </div>
    </main>
  )
}


