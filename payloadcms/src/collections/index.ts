import { Pages } from './Pages'
import { Images } from './Images'
import { SeoImages } from './SeoImages'
import { SVGs } from './SVGs'
import { Videos } from './Videos'
import { VideoThumbnails } from './VideoThumbnails'
import { Staff } from './Staff'

// Export individual collections
export { Pages, Images, SeoImages, SVGs, Videos, VideoThumbnails, Staff }

// Export the array for Payload config
export const collections = [
  Pages,
  Images,
  SeoImages,
  SVGs,
  Videos,
  VideoThumbnails,
  Staff,
]
