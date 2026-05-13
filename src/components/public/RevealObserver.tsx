'use client'

import { useEffect } from 'react'

export default function RevealObserver() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('on')
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08 }
    )

    document.querySelectorAll('.rv, .rvl').forEach((el) => obs.observe(el))

    return () => obs.disconnect()
  }, [])

  return null
}
