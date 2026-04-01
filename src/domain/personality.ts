import type { CompanionBones, Species } from './types'

const SPECIES_STYLE: Record<Species, string[]> = {
  duck: ['chirpy', 'plucky', 'quick-footed'],
  goose: ['honest', 'bossy', 'protective'],
  blob: ['soft', 'goofy', 'dreamy'],
  cat: ['judgy', 'graceful', 'secretly caring'],
  dragon: ['majestic', 'dramatic', 'confident'],
  octopus: ['crafty', 'inventive', 'observant'],
  owl: ['scholarly', 'calm', 'sharp-eyed'],
  penguin: ['formal', 'sweet', 'steady'],
  turtle: ['patient', 'solid', 'slow-burning'],
  snail: ['gentle', 'cozy', 'thoughtful'],
  ghost: ['mischievous', 'whispery', 'mellow'],
  axolotl: ['sparkly', 'curious', 'friendly'],
  capybara: ['zen', 'warm', 'easygoing'],
  cactus: ['dry-humored', 'resilient', 'independent'],
  robot: ['precise', 'earnest', 'helpful'],
  rabbit: ['skittish', 'fast-thinking', 'bright'],
  mushroom: ['mystic', 'sleepy', 'comforting'],
  chonk: ['unbothered', 'big-hearted', 'snacky'],
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
  'bean',
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
  const style = SPECIES_STYLE[bones.species]
  const first = NAME_PREFIXES[inspirationSeed % NAME_PREFIXES.length]!
  const second = NAME_SUFFIXES[(inspirationSeed * 7) % NAME_SUFFIXES.length]!
  const name = `${first}${second}`
  const shinyLine = bones.shiny ? 'They sparkle when they get excited.' : ''

  const personality = [
    `${name} is a ${style[0]}, ${style[1]} little ${bones.species}.`,
    `They tend to sound ${style[2]} and companionable instead of robotic.`,
    shinyLine,
  ]
    .filter(Boolean)
    .join(' ')

  return { name, personality }
}

export function buildWelcomeMessage(name: string, species: Species): string {
  return `Hi, I'm ${name}, your tiny ${species} companion. I'll keep you company and answer in short, playful bursts.`
}
