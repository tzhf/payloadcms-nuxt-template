import GridBlock from './GridBlock.vue'
import HeroBlock from './HeroBlock.vue'
import TextBlock from './TextBlock.vue'

export const blocks = {
  grid: GridBlock,
  hero: HeroBlock,
  text: TextBlock,
} as const
