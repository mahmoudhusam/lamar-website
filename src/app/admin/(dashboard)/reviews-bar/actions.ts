'use server'

import { revalidatePath } from 'next/cache'
import { setContentKeys } from '@/lib/content'
import { requireAccess } from '@/lib/guards'

const PLATFORMS = ['google', 'facebook', 'trustpilot', 'werkspot'] as const

type State = { ok: boolean } | null

export async function saveReviewBadges(_prev: State, formData: FormData): Promise<State> {
  await requireAccess('/admin/reviews-bar')

  const badges = PLATFORMS.map((p) => ({
    platform: p,
    enabled: formData.get(`${p}_enabled`) === 'on',
    rating: ((formData.get(`${p}_rating`) as string) ?? '').trim(),
    reviews: ((formData.get(`${p}_reviews`) as string) ?? '').trim(),
    url: ((formData.get(`${p}_url`) as string) ?? '').trim(),
  }))

  await setContentKeys({ review_badges: JSON.stringify(badges) })

  revalidatePath('/admin/reviews-bar')
  revalidatePath('/')
  return { ok: true }
}
