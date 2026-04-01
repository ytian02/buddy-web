export const RARITIES = [
  'common',
  'uncommon',
  'rare',
  'epic',
  'legendary',
] as const

export type Rarity = (typeof RARITIES)[number]

export const SPECIES = [
  'duck',
  'goose',
  'blob',
  'cat',
  'dragon',
  'octopus',
  'owl',
  'penguin',
  'turtle',
  'snail',
  'ghost',
  'axolotl',
  'capybara',
  'cactus',
  'robot',
  'rabbit',
  'mushroom',
  'chonk',
] as const

export type Species = (typeof SPECIES)[number]

export const EYES = ['o', '^', '*', '-', '@', '~'] as const
export type Eye = (typeof EYES)[number]

export const HATS = [
  'none',
  'crown',
  'tophat',
  'propeller',
  'halo',
  'wizard',
  'beanie',
  'tinyduck',
] as const

export type Hat = (typeof HATS)[number]

export const STAT_NAMES = [
  'DEBUGGING',
  'PATIENCE',
  'CHAOS',
  'WISDOM',
  'SNARK',
] as const

export type StatName = (typeof STAT_NAMES)[number]

export type CompanionBones = {
  rarity: Rarity
  species: Species
  eye: Eye
  hat: Hat
  shiny: boolean
  stats: Record<StatName, number>
}

export type CompanionSoul = {
  name: string
  personality: string
}

export type Companion = CompanionBones &
  CompanionSoul & {
    hatchedAt: number
    seed: string
  }

export type StoredCompanion = CompanionSoul & {
  hatchedAt: number
  seed: string
}

export type BuddyMood =
  | 'idle'
  | 'excited'
  | 'sleepy'
  | 'curious'
  | 'proud'
  | 'comforting'

export type BuddyUiState = {
  mood: BuddyMood
  speaking: boolean
  idle: boolean
  lastInteractionAt: number
}

export type ChatRole = 'assistant' | 'user' | 'system'

export type ChatMessage = {
  id: string
  role: ChatRole
  content: string
  createdAt: number
}

export type BuddyReply = {
  content: string
  mood: BuddyMood
}

export const RARITY_WEIGHTS: Record<Rarity, number> = {
  common: 60,
  uncommon: 25,
  rare: 10,
  epic: 4,
  legendary: 1,
}

export const RARITY_STARS: Record<Rarity, string> = {
  common: '★',
  uncommon: '★★',
  rare: '★★★',
  epic: '★★★★',
  legendary: '★★★★★',
}

export const RARITY_COLORS: Record<Rarity, string> = {
  common: '#7b8a8e',
  uncommon: '#36a36f',
  rare: '#3d7eff',
  epic: '#d65fff',
  legendary: '#ff9b2f',
}

export const HAT_LABELS: Record<Hat, string> = {
  none: 'No Hat',
  crown: 'Crown',
  tophat: 'Top Hat',
  propeller: 'Propeller',
  halo: 'Halo',
  wizard: 'Wizard Hat',
  beanie: 'Beanie',
  tinyduck: 'Tiny Duck',
}
