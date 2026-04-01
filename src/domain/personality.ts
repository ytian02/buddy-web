import { GROWTH_STAGE_CONFIGS, SPECIES_TEMPLATE_CONFIGS, THEME_SKIN_CONFIGS } from './mascotSystem'
import type { Companion, CompanionBones } from './types'

const TEMPLATE_STYLE: Record<CompanionBones['speciesTemplate'], string[]> = {
  cat: ['sharp', 'graceful', 'warm under pressure'],
  bird: ['nimble', 'bright', 'quick to notice details'],
  spirit: ['quiet', 'strange', 'softly reassuring'],
}

const NAME_PREFIXES = [
  'Miso',
  'Pico',
  'Nova',
  'Mochi',
  'Orbit',
  'Saffron',
  'Puddle',
  'Rolo',
  'Comet',
  'Pippa',
  'Murmur',
  'Tango',
]

const NAME_SUFFIXES = [
  'beam',
  'buddy',
  'puff',
  'loop',
  'wink',
  'moss',
  'pixel',
  'spark',
  'tail',
  'dot',
]

export function generateSoul(
  bones: CompanionBones,
  inspirationSeed: number,
): { name: string; personality: string } {
  const style = TEMPLATE_STYLE[bones.speciesTemplate]
  const template = SPECIES_TEMPLATE_CONFIGS[bones.speciesTemplate]
  const skin = THEME_SKIN_CONFIGS[bones.themeSkin]
  const growth = GROWTH_STAGE_CONFIGS[bones.growthStage]
  const first = NAME_PREFIXES[inspirationSeed % NAME_PREFIXES.length]!
  const second = NAME_SUFFIXES[(inspirationSeed * 7) % NAME_SUFFIXES.length]!
  const name = `${first}${second}`
  const sparkleLine = bones.shiny
    ? 'They leave a faint stardust trail whenever they get excited.'
    : ''

  const personality = [
    `${name} is a ${style[0]}, ${style[1]} little ${template.promptNoun}.`,
    `Their ${skin.label.toLowerCase()} keeps them feeling ${style[2]} instead of robotic.`,
    `Right now they read as ${growth.label.toLowerCase()}: ${growth.description.toLowerCase()}`,
    sparkleLine,
  ]
    .filter(Boolean)
    .join(' ')

  return { name, personality }
}

export function buildWelcomeMessage(name: string, companion: Pick<Companion, 'growthStage' | 'name' | 'speciesTemplate' | 'themeSkin'>): string {
  const template = SPECIES_TEMPLATE_CONFIGS[companion.speciesTemplate]
  const growth = GROWTH_STAGE_CONFIGS[companion.growthStage]

  return `Hi, I'm ${name}, your ${growth.label.toLowerCase()} ${template.promptNoun}. I'll stay close, keep the vibe calm, and answer in short companion bursts.`
}
