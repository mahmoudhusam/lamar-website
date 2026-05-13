import { getContentMany } from '@/lib/content'
import { ServiceCard } from './ServicesForm'
import { saveService } from './actions'

const services = [
  {
    key: 'service_gypsum',
    name: 'Gypsum Work',
    fallback: 'Precision gypsum plastering for walls and ceilings — smooth finishes, decorative mouldings, and ornate ceiling details crafted to perfection.',
  },
  {
    key: 'service_decoration',
    name: 'Interior Decoration',
    fallback: 'Bespoke interior styling that transforms spaces — from material selection and colour consulting to the final decorative details that make a home feel complete.',
  },
  {
    key: 'service_painting',
    name: 'Painting',
    fallback: 'Professional wall and ceiling painting with premium materials — clean preparation, flawless application, and long-lasting results for every surface type.',
  },
  {
    key: 'service_restoration',
    name: 'House Restoration',
    fallback: 'Full residential restoration from structural repairs to cosmetic finishing — breathing new life into older properties while preserving their character.',
  },
]

export default async function ServicesPage() {
  const content = await getContentMany(services.map((s) => s.key))

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: '#F2EEE6', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>
          Services
        </h1>
        <p style={{ color: '#6B6B68', fontSize: '0.85rem' }}>
          Edits appear instantly on the public site.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', maxWidth: 900 }}>
        {services.map((svc) => {
          const boundSave = saveService.bind(null, svc.key)
          return (
            <ServiceCard
              key={svc.key}
              name={svc.name}
              defaultValue={content[svc.key] ?? svc.fallback}
              action={boundSave}
            />
          )
        })}
      </div>
    </div>
  )
}
