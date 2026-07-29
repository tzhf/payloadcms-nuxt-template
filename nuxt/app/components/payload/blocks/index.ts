import GridBlock from './GridBlock.vue'
import SectionBlock from './SectionBlock.vue'
import HeroBlock from './HeroBlock.vue'
import TextBlock from './TextBlock.vue'

export const blocks = {
  section: SectionBlock,
  grid: GridBlock,
  hero: HeroBlock,
  text: TextBlock,
} as const
