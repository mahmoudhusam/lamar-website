import { getContentMany } from '@/lib/content';
import ContactForm from './ContactForm';

const KEYS = [
  'contact_phone',
  'contact_email',
  'contact_location',
  'contact_hours',
];

export default async function ContactPage() {
  const defaults = await getContentMany(KEYS);

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1
          style={{
            fontFamily: 'var(--font-archivo)',
            color: '#14181D',
            fontSize: '1.5rem',
            fontWeight: 800,
            marginBottom: '0.25rem',
          }}
        >
          Contact
        </h1>
        <p style={{ color: '#97A0AC', fontSize: '0.85rem' }}>
          Edits appear instantly on the public site.
        </p>
      </div>
      <ContactForm defaults={defaults} />
    </div>
  );
}
