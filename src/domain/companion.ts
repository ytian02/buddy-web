import { hashString, mulberry32, pick } from './hash'
import { buildWelcomeMessage, generateSoul } from './personality'
import type {
  AccessorySet,
  ChatMessage,
  Companion,
  CompanionBones,
  GrowthStage,
  Rarity,
  StatName,
  StoredCompanion,
  ThemeSkin,
} from './types'
import {
  HATS,
  RARITIES,
  RARITY_WEIGHTS,
  STAT_NAMES,
} from './types'

const SALT = 'buddy-web-2026'

export type RollResult = {
  bones: CompanionBones
  inspirationSeed: number
}

const RARITY_FLOOR: Record<Rarity, number> = {
  common: 5,
  uncommon: 15,
  rare: 25,
  epic: 35,
  legendary: 50,
}

function rollRarity(rng: () => number): Rarity {
  const total = Object.values(RARITY_WEIGHTS).reduce((sum, value) => sum + value, 0)
  let roll = rng() * total

  for (const rarity of RARITIES) {
    roll -= RARITY_WEIGHTS[rarity]
    if (roll < 0) return rarity
  }

  return 'common'
}

function rollStats(
  rng: () => number,
  rarity: Rarity,
): Record<StatName, number> {
  const floor = RARITY_FLOOR[rarity]
  const peak = pick(rng, STAT_NAMES)
  let dump = pick(rng, STAT_NAMES)

  while (dump === peak) {
    dump = pick(rng, STAT_NAMES)
  }

  const stats = {} as Record<StatName, number>

  for (const stat of STAT_NAMES) {
    if (stat === peak) {
      stats[stat] = Math.min(100, floor + 50 + Math.floor(rng() * 30))
    } else if (stat === dump) {
      stats[stat] = Math.max(1, floor - 10 + Math.floor(rng() * 15))
    } else {
      stats[stat] = floor + Math.floor(rng() * 40)
    }
  }

  return stats
}

function resolveGrowthStage(rarity: Rarity): GrowthStage {
  switch (rarity) {
    case 'common':
    case 'uncommon':
      return 'hatchling'
    case 'rare':
    case 'epic':
      return 'buddy'
    case 'legendary':
      return 'evolved'
  }
}

function rollThemeSkin(rng: () => number, rarity: Rarity, shiny: boolean): ThemeSkin {
  if (shiny || rarity === 'legendary') return 'grove'
  return rng() < 0.2 ? 'grove' : 'signal'
}

function rollAccessorySet(
  rng: () => number,
  rarity: Rarity,
  themeSkin: ThemeSkin,
  shiny: boolean,
): AccessorySet {
  const head =
    rarity === 'common' ? 'none' : pick(rng, HATS.filter((hat) => hat !== 'none'))

  return {
    head,
    badge:
      themeSkin === 'grove'
        ? rarity === 'common'
          ? 'leaf'
          : pick(rng, ['leaf', 'core', 'rune'] as const)
        : rarity === 'common'
          ? 'core'
          : pick(rng, ['core', 'rune'] as const),
    aura: shiny
      ? 'stardust'
      : themeSkin === 'grove'
        ? 'grove'
        : rarity === 'common'
          ? 'none'
          : 'signal',
  }
}

export function rollCompanion(seed: string): RollResult {
  const rng = mulberry32(hashString(seed + SALT))
  const rarity = rollRarity(rng)
  const shiny = rng() < 0.015
  const themeSkin = rollThemeSkin(rng, rarity, shiny)
  const bones: CompanionBones = {
    rarity,
    speciesTemplate: 'cat',
    themeSkin,
    growthStage: resolveGrowthStage(rarity),
    accessorySet: rollAccessorySet(rng, rarity, themeSkin, shiny),
    shiny,
    stats: rollStats(rng, rarity),
  }

  return {
    bones,
    inspirationSeed: Math.floor(rng() * 1e9),
  }
}

function mergeCustomization(
  bones: CompanionBones,
  stored?: StoredCompanion,
): CompanionBones {
  if (!stored?.customization) return bones

  return {
    ...bones,
    ...stored.customization,
    accessorySet: stored.customization.accessorySet ?? bones.accessorySet,
  }
}

export function createCompanion(seed: string, stored?: StoredCompanion): Companion {
  const { bones, inspirationSeed } = rollCompanion(seed)
  const resolvedBones = mergeCustomization(bones, stored)
  const soul = stored ?? {
    ...generateSoul(resolvedBones, inspirationSeed),
    hatchedAt: Date.now(),
    seed,
  }

  return {
    ...resolvedBones,
    ...soul,
    seed,
    identity: 'buddy-core',
  }
}

export function getWelcomeChat(companion: Companion): ChatMessage {
  return {
    id: `welcome-${companion.seed}`,
    role: 'assistant',
    content: buildWelcomeMessage(companion.name, companion),
    createdAt: Date.now(),
  }
}
