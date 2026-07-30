import { CollectionAfterChangeHook } from 'payload'
import { Video } from 'payload-types'
import { getRelationshipId } from '@/utils/getRelationshipId'

const cleanUpVideoThumbnails: CollectionAfterChangeHook<Video> = async ({
  doc,
  operation,
  previousDoc,
  req,
}) => {
  if (operation === 'update') {
    const thumbnailId = getRelationshipId(doc.thumbnail)
    const previousThumbnailId = getRelationshipId(previousDoc.thumbnail)

    if (thumbnailId !== previousThumbnailId) {
      await req.payload.delete({
        id: previousThumbnailId,
        collection: 'video-thumbnails',
      })
    }
  }
}

export default cleanUpVideoThumbnails
