import { v2 as cloudinary } from 'cloudinary'

// SDK reads CLOUDINARY_URL automatically: cloudinary://api_key:api_secret@cloud_name
cloudinary.config({ secure: true })

export { cloudinary }
