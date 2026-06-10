import { getContentMany } from '@/lib/content'
import { saveTestimonial } from './actions'
import { TestimonialCard } from './TestimonialsForm'

function parse(raw: string | undefined): { quote: string; name: string; location: string } {
  if (!raw) return { quote: '', name: '', location: '' }
  try { return JSON.parse(raw) } catch { return { quote: '', name: '', location: '' } }
}

export default async function TestimonialsPage() {
  const content = await getContentMany(['testimonial_1', 'testimonial_2', 'testimonial_3'])
  const t1 = parse(content['testimonial_1'])
  const t2 = parse(content['testimonial_2'])
  const t3 = parse(content['testimonial_3'])

  const save1 = saveTestimonial.bind(null, 1)
  const save2 = saveTestimonial.bind(null, 2)
  const save3 = saveTestimonial.bind(null, 3)

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-archivo)', color: '#14181D', fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.25rem' }}>
          Testimonials
        </h1>
        <p style={{ color: '#97A0AC', fontSize: '0.85rem' }}>
          Edits appear instantly on the public site.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 640 }}>
        <TestimonialCard index={1} defaultValues={t1} action={save1} />
        <TestimonialCard index={2} defaultValues={t2} action={save2} />
        <TestimonialCard index={3} defaultValues={t3} action={save3} />
      </div>
    </div>
  )
}
