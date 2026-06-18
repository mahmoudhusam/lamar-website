import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { t, type Lang } from '@/lib/i18n';
import BentoGrid from './BentoGrid';

const P = 'https://images.pexels.com/photos';

const placeholders: SlotProject[] = [
  {
    id: 'p0',
    slug: '',
    title: 'Living Room Gypsum',
    coverImageUrl: `${P}/2736139/pexels-photo-2736139.jpeg?auto=compress&cs=tinysrgb&w=900&h=520&fit=crop`,
    images: [],
  },
  {
    id: 'p1',
    slug: '',
    title: 'Kitchen Renovation',
    coverImageUrl: `${P}/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600&h=520&fit=crop`,
    images: [],
  },
  {
    id: 'p2',
    slug: '',
    title: 'Full House Restoration',
    coverImageUrl: `${P}/5691530/pexels-photo-5691530.jpeg?auto=compress&cs=tinysrgb&w=800&h=720&fit=crop`,
    images: [],
  },
  {
    id: 'p3',
    slug: '',
    title: 'Ceiling Detail Work',
    coverImageUrl: `${P}/16764180/pexels-photo-16764180.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop`,
    images: [],
  },
  {
    id: 'p4',
    slug: '',
    title: 'Interior Painting',
    coverImageUrl: `${P}/5493654/pexels-photo-5493654.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&fit=crop`,
    images: [],
  },
  {
    id: 'p5',
    slug: '',
    title: 'Bathroom Renovation',
    coverImageUrl: `${P}/7045358/pexels-photo-7045358.jpeg?auto=compress&cs=tinysrgb&w=800&h=520&fit=crop`,
    images: [],
  },
  {
    id: 'p6',
    slug: '',
    title: 'Wall Restoration',
    coverImageUrl: `${P}/3990359/pexels-photo-3990359.jpeg?auto=compress&cs=tinysrgb&w=800&h=520&fit=crop`,
    images: [],
  },
];

export type SlotProject = {
  id: string;
  slug: string;
  title: string;
  coverImageUrl: string | null;
  images: { id: string; url: string; caption: string | null }[];
};

export default async function GallerySection({ lang }: { lang: Lang }) {
  const tr = t[lang].gallery;

  const dbProjects = await prisma.project
    .findMany({
      where: { published: true, bentoSlot: { gte: 0, lte: 6 } },
      include: {
        images: { orderBy: { order: 'asc' }, take: 6 },
      },
    })
    .catch(() => []);

  const slotMap: Record<number, SlotProject> = {};
  for (const p of dbProjects) {
    slotMap[p.bentoSlot] = {
      id: p.id,
      slug: p.slug,
      title: p.title,
      coverImageUrl: p.coverImageUrl,
      images: p.images,
    };
  }

  const slots: SlotProject[] = Array.from(
    { length: 7 },
    (_, i) => slotMap[i] ?? placeholders[i],
  );

  return (
    <section
      id="our-work"
      style={{ padding: '8rem 3.5rem', background: 'var(--bg2)' }}
    >
      {/* Header */}
      <div
        className="rv"
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: '3rem',
        }}
      >
        <div>
          <div
            style={{
              fontSize: '0.63rem',
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: 'var(--teal2)',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
            }}
          >
            <span
              style={{
                display: 'block',
                width: '1.5rem',
                height: 1,
                background: 'var(--teal2)',
                flexShrink: 0,
              }}
            />
            {tr.tag}
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-archivo)',
              fontWeight: 800,
              fontSize: 'clamp(1.9rem,3vw,2.8rem)',
              lineHeight: 1.06,
              letterSpacing: '-0.01em',
              color: 'var(--white)',
              marginBottom: 0,
            }}
          >
            {tr.heading}
          </h2>
        </div>
        <Link
          href="/projects"
          className="view-all"
          style={{
            fontSize: '0.7rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--white2)',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            paddingBottom: 2,
            borderBottom: '1px solid var(--border2)',
            transition: 'color 0.2s, border-color 0.2s',
          }}
        >
          {tr.viewAll}
        </Link>
      </div>

      {/* BentoGrid — client component handles hover/interaction */}
      <BentoGrid
        slots={slots}
        specialtyLabel={tr.specialtyLabel}
        specialtyText={tr.specialtyText}
        ctaLabel={tr.ctaLabel}
      />
    </section>
  );
}
