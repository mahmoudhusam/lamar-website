import { v2 as cloudinary } from 'cloudinary'

// SDK reads CLOUDINARY_URL automatically: cloudinary://api_key:api_secret@cloud_name
cloudinary.config({ secure: true })

export { cloudinary }

/**
 * Best-effort deletion of an uploaded asset given its secure URL.
 * Extracts the Cloudinary public id (folder + name, minus version & extension)
 * and never throws — a failed remote delete should not block the DB mutation.
 */
export async function destroyByUrl(url: string): Promise<void> {
  const match = url.match(/\/upload\/(?:v\d+\/)?(.+)$/)
  if (!match) return
  const publicId = match[1].replace(/\.[^.]+$/, '')
  await cloudinary.uploader.destroy(publicId).catch(() => {})
}
