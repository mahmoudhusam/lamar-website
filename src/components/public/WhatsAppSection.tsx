'use client';

import { useEffect, useRef, useState } from 'react';
import { t, type Lang } from '@/lib/i18n';

// Wide room background (the "sides"), and the center work strip poster
const ROOM =
  'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1400&h=900&fit=crop';
const POSTER =
  'https://images.pexels.com/photos/5493654/pexels-photo-5493654.jpeg?auto=compress&cs=tinysrgb&w=700&h=1100&fit=crop';

function Icon({ name }: { name?: string }) {
  if (name === 'doc')
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--teal)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
      </svg>
    );
  if (name === 'cal')
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--teal)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    );
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--teal)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

type Bubble = {
  variant: 'note' | 'msg';
  side: 'left' | 'right';
  icon?: 'doc' | 'wa' | 'cal';
  title?: string;
  text: string;
};

function BubbleCard({
  b,
  senderName,
  delay,
  offset,
}: {
  b: Bubble;
  senderName: string;
  delay: number;
  offset: number;
}) {
  const isLeft = b.side === 'left';
  const isNote = b.variant === 'note';
  return (
    <div
      className="chat-fb"
      style={{
        animationDelay: `${delay}s`,
        width: isNote ? 'min(300px, 100%)' : 'min(282px, 100%)',
        [isLeft ? 'marginLeft' : 'marginRight']: offset,
        background: isNote ? '#FFFFFF' : 'rgba(255,255,255,0.86)',
        backdropFilter: isNote ? undefined : 'blur(10px)',
        WebkitBackdropFilter: isNote ? undefined : 'blur(10px)',
        border: '1px solid var(--border)',
        borderRadius: 16,
        padding: '0.8rem 1rem',
        boxShadow: '0 16px 38px rgba(20,24,29,0.18)',
        display: 'flex',
        gap: '0.7rem',
        alignItems: isNote ? 'center' : 'flex-start',
      }}
    >
      {b.variant === 'note' ? (
        <span
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: 'rgba(42,191,168,0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Icon name={b.icon} />
        </span>
      ) : (
        <span style={{ position: 'relative', flexShrink: 0 }}>
          <span
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'var(--teal)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-archivo)',
              fontWeight: 800,
              fontSize: '0.82rem',
            }}
          >
            L
          </span>
          <span
            style={{
              position: 'absolute',
              bottom: -2,
              right: -2,
              width: 14,
              height: 14,
              borderRadius: '50%',
              background: '#25D366',
              border: '2px solid #FFFFFF',
            }}
          />
        </span>
      )}
      <div style={{ minWidth: 0 }}>
        {b.variant === 'note' ? (
          <div
            style={{
              fontFamily: 'var(--font-archivo)',
              fontWeight: 700,
              fontSize: '0.85rem',
              color: 'var(--white)',
              marginBottom: 2,
            }}
          >
            {b.title}
          </div>
        ) : (
          <div
            style={{
              fontWeight: 700,
              fontSize: '0.74rem',
              color: 'var(--white)',
              marginBottom: 2,
            }}
          >
            ~ {senderName}
          </div>
        )}
        <div
          style={{
            fontSize: '0.82rem',
            lineHeight: 1.4,
            color: 'var(--white2)',
            fontWeight: 300,
          }}
        >
          {b.text}
        </div>
      </div>
    </div>
  );
}

export default function WhatsAppSection({
  lang,
  heading,
  headingAccent,
}: {
  lang: Lang;
  heading?: string;
  headingAccent?: string;
}) {
  const tr = t[lang].chat;
  const [on, setOn] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const bubbles = tr.bubbles as Bubble[];
  const left = bubbles.filter((b) => b.side === 'left');
  const right = bubbles.filter((b) => b.side === 'right');

  return (
    <section
      id="how-it-works"
      ref={ref}
      className={on ? 'on' : ''}
      style={{ background: 'var(--bg)', padding: '5rem 3.5rem' }}
    >
      <style>{`
        @keyframes fbIn { from { opacity: 0; transform: translateY(18px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .chat-fb { opacity: 0; }
        #how-it-works.on .chat-fb { animation: fbIn 0.55s cubic-bezier(0.22,1,0.36,1) forwards; }
      `}</style>

      <div
        className="chat-stage"
        style={{
          position: 'relative',
          maxWidth: 1180,
          height: 720,
          margin: '0 auto',
        }}
      >
        {/* Wide room background */}
        <div
          className="chat-bg"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 28,
            overflow: 'hidden',
            backgroundImage: `url('${ROOM}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(255,255,255,0.16)',
            }}
          />
        </div>

        {/* Center portrait work strip (video) */}
        <div
          className="chat-strip"
          style={{
            position: 'absolute',
            top: '8%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 410,
            height: '84%',
            borderRadius: 18,
            overflow: 'hidden',
            boxShadow: '0 24px 60px rgba(20,24,29,0.30)',
            zIndex: 1,
          }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={POSTER}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          >
            <source src="/sample2.webm" type="video/webm" />
            <source src="/sample2.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div
            style={{
              position: 'absolute',
              top: 12,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 34,
              height: 34,
              borderRadius: 8,
              background: 'rgba(255,255,255,0.85)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#14181D"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
          </div>
        </div>

        {/* Top gradient for heading legibility */}
        <div
          className="chat-grad"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '42%',
            borderTopLeftRadius: 28,
            borderTopRightRadius: 28,
            background:
              'linear-gradient(to bottom, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.55) 50%, rgba(255,255,255,0) 100%)',
            zIndex: 2,
          }}
        />

        {/* Heading */}
        <div
          className="chat-head"
          style={{
            position: 'absolute',
            top: '4%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 4,
            textAlign: 'center',
            width: 'min(620px, 92%)',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-archivo)',
              fontWeight: 800,
              fontSize: 'clamp(2rem,3.6vw,3.2rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.01em',
              color: 'var(--white)',
              margin: 0,
            }}
          >
            {heading ?? tr.heading}{' '}
            <span style={{ color: 'var(--teal2)' }}>{headingAccent ?? tr.headingTeal}</span>
          </h2>
        </div>

        {/* Left column — hugs center strip */}
        <div
          className="chat-col left"
          style={{
            position: 'absolute',
            zIndex: 3,
            left: '9%',
            top: '17%',
            width: 'min(360px, 34%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '0.85rem',
          }}
        >
          {left.map((b, i) => (
            <BubbleCard
              key={i}
              b={b}
              senderName={tr.senderName}
              delay={i * 0.15}
              offset={b.variant === 'note' ? 56 : 4}
            />
          ))}
        </div>

        {/* Right column — hugs center strip */}
        <div
          className="chat-col right"
          style={{
            position: 'absolute',
            zIndex: 3,
            right: '9%',
            top: '40%',
            width: 'min(360px, 34%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '0.85rem',
          }}
        >
          {right.map((b, i) => (
            <BubbleCard
              key={i}
              b={b}
              senderName={tr.senderName}
              delay={(i + 2) * 0.15}
              offset={b.variant === 'note' ? 56 : 4}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
