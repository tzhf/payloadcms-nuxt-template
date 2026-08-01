// collections/SVGs/hooks/normaliseSvg.ts
import type { CollectionBeforeOperationHook } from 'payload'
import { optimize } from 'svgo'

export const normaliseSvg: CollectionBeforeOperationHook = async ({
  args,
  req,
}) => {
  if (req?.file && req.file.mimetype === 'image/svg+xml') {
    const svgText = req.file.data.toString('utf8')

    // Optimize and clean the SVG
    const result = optimize(svgText, {
      multipass: true,
      plugins: [
        'preset-default',
        // 'removeScriptElement', // 1. Removes empty or malicious <script> tags
        'prefixIds', // 2. Prefixes IDs (e.g. id="a" -> id="svgs-a") so colors don't clash in Admin UI
        'removeDimensions', // 3. Ensures width/height defer to viewBox for proper responsive rendering
      ],
    })

    if (result.data) {
      const updatedBuffer = Buffer.from(result.data, 'utf8')

      // Reassign cleaned SVG buffer to Payload
      req.file.data = updatedBuffer
      req.file.size = updatedBuffer.length

      if (args.req?.file) {
        args.req.file.data = updatedBuffer
        args.req.file.size = updatedBuffer.length
      }
    }
  }

  return args
}
