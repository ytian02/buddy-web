export const RARITIES = [
  'common',
  'uncommon',
  'rare',
  'epic',
  'legendary',
] as const

export type Rarity = (typeof RARITIES)[number]

export const SPECIES_TEMPLATES = ['cat', 'bird', 'spirit'] as const
export type SpeciesTemplate = (typeof SPECIES_TEMPLATES)[number]

export const THEME_SKINS = ['signal', 'grove'] as const
export type ThemeSkin = (typeof THEME_SKINS)[number]

export const GROWTH_STAGES = ['hatchling', 'buddy', 'evolved'] as const
export type GrowthStage = (typeof GROWTH_STAGES)[number]

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

export const BADGE_STYLES = ['none', 'core', 'leaf', 'rune'] as const
export type BadgeStyle = (typeof BADGE_STYLES)[number]

export const AURA_STYLES = ['none', 'signal', 'grove', 'stardust'] as const
export type AuraStyle = (typeof AURA_STYLES)[number]

export const STAT_NAMES = [
  'DEBUGGING',
  'PATIENCE',
  'CHAOS',
  'WISDOM',
  'SNARK',
] as const

export type StatName = (typeof STAT_NAMES)[number]

export type AccessorySet = {
  head: Hat
  badge: BadgeStyle
  aura: AuraStyle
}

export type CompanionCustomization = {
  speciesTemplate: SpeciesTemplate
  themeSkin: ThemeSkin
  growthStage: GrowthStage
  accessorySet: AccessorySet
}

export type CompanionBones = {
  rarity: Rarity
  speciesTemplate: SpeciesTemplate
  themeSkin: ThemeSkin
  growthStage: GrowthStage
  accessorySet: AccessorySet
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
    identity: 'buddy-core'
  }

export type StoredCompanion = CompanionSoul & {
  hatchedAt: number
  seed: string
  customization?: CompanionCustomization
}

export type BuddyMood = 'idle' | 'happy' | 'thinking'

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

export const SPECIES_TEMPLATE_LABELS: Record<SpeciesTemplate, string> = {
  cat: 'Cat Rig',
  bird: 'Bird Rig',
  spirit: 'Spirit Rig',
}

export const THEME_SKIN_LABELS: Record<ThemeSkin, string> = {
  signal: 'Signal Skin',
  grove: 'Grove Skin',
}

export const GROWTH_STAGE_LABELS: Record<GrowthStage, string> = {
  hatchling: 'Hatchling',
  buddy: 'Buddy',
  evolved: 'Evolved',
}

export const BADGE_STYLE_LABELS: Record<BadgeStyle, string> = {
  none: 'No Badge',
  core: 'Core Badge',
  leaf: 'Leaf Badge',
  rune: 'Rune Badge',
}

export const AURA_STYLE_LABELS: Record<AuraStyle, string> = {
  none: 'No Aura',
  signal: 'Signal Aura',
  grove: 'Grove Aura',
  stardust: 'Stardust Aura',
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
