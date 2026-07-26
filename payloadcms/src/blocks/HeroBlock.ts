import type { Block } from 'payload'
import { Button } from './ui/Button'

export const HeroBlock: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'anchorId',
              type: 'text',
            },
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'subtitle',
              type: 'textarea',
            },

            {
              name: 'buttons',
              type: 'blocks',
              blocks: [Button],
            },
          ],
        },
        {
          label: 'Style',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
            },

            {
              name: 'layout',
              type: 'select',
              defaultValue: 'split',
              options: [
                { label: 'Side-by-Side Split', value: 'split' },
                { label: 'Background Overlay', value: 'overlay' },
                { label: 'Stacked (Centered Column)', value: 'stacked' },
              ],
            },
            // --- SPLIT & STACKED SPECIFIC OPTIONS ---
            {
              name: 'splitRatio',
              type: 'select',
              defaultValue: '50-50',
              admin: {
                condition: (_, siblingData) => siblingData.layout === 'split',
              },
              options: [
                { label: '30% / 70%', value: '30-70' },
                { label: '40% / 60%', value: '40-60' },
                { label: '50% / 50%', value: '50-50' },
                { label: '60% / 40%', value: '60-40' },
                { label: '70% / 30%', value: '70-30' },
              ],
            },
            {
              name: 'mediaPosition',
              type: 'select',
              defaultValue: 'right',
              admin: {
                condition: (_, siblingData) => siblingData.layout === 'split',
              },
              options: [
                { label: 'Media Right', value: 'right' },
                { label: 'Media Left', value: 'left' },
              ],
            },
            {
              name: 'mediaOrder',
              type: 'select',
              defaultValue: 'below',
              admin: {
                condition: (_, siblingData) => siblingData.layout === 'stacked',
              },
              options: [
                { label: 'Media Below Text', value: 'below' },
                { label: 'Media Above Text', value: 'above' },
              ],
            },
            // --- OVERLAY SPECIFIC OPTIONS ---
            {
              name: 'overlayOpacity',
              type: 'select',
              defaultValue: '40',
              admin: {
                condition: (_, siblingData) => siblingData.layout === 'overlay',
              },
              options: [
                { label: 'Light (20%)', value: '20' },
                { label: 'Medium (40%)', value: '40' },
                { label: 'Dark (60%)', value: '60' },
                { label: 'Heavy (80%)', value: '80' },
                { label: 'Gradient Bottom-Up', value: 'gradient-bottom' },
              ],
            },
            // --- VISUAL FRAME STYLE ---
            // {
            //   name: 'mediaFrame',
            //   type: 'select',
            //   defaultValue: 'rounded',
            //   options: [
            //     { label: 'Rounded Card + Shadow', value: 'rounded' },
            //     { label: 'Full Bleed / Edge-to-Edge', value: 'bleed' },
            //     { label: 'Aspect Ratio Box (16:9)', value: 'video' },
            //   ],
            // },
            // --- TEXT ALIGNMENT & SIZING ---
            {
              name: 'textAlignment',
              type: 'select',
              defaultValue: 'left',
              options: [
                { label: 'Left', value: 'left' },
                { label: 'Center', value: 'center' },
                { label: 'Right', value: 'right' },
              ],
            },
            {
              name: 'minHeight',
              type: 'select',
              defaultValue: 'auto',
              options: [
                { label: 'Auto (Padding based)', value: 'auto' },
                { label: '70vh (Sub-Hero)', value: '70vh' },
                { label: '100vh (Full Screen Viewport)', value: '100vh' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
