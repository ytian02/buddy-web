import { GROWTH_STAGE_CONFIGS, SPECIES_TEMPLATE_CONFIGS, THEME_SKIN_CONFIGS } from './mascotSystem'
import type { Companion } from './types'

export function companionIntroText(companion: Companion): string {
  const template = SPECIES_TEMPLATE_CONFIGS[companion.speciesTemplate]
  const growth = GROWTH_STAGE_CONFIGS[companion.growthStage]
  const skin = THEME_SKIN_CONFIGS[companion.themeSkin]

  return [
    `${companion.name} is a ${growth.label.toLowerCase()} ${template.promptNoun} who lives beside the chat box.`,
    `They use the ${skin.label.toLowerCase()} and should read like a companionable system familiar, not a generic support bot.`,
    'Their tone should stay short, warm, and lightly witty.',
  ].join(' ')
}
