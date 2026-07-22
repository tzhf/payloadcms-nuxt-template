import PayloadHeroBlock from './HeroBlock.vue'
import PayloadTextBlock from './TextBlock.vue'

export const blocks = {
  hero: PayloadHeroBlock,
  text: PayloadTextBlock,
} as const
