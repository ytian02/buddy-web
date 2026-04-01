import { hashString, mulberry32, pick } from './hash'
import { buildWelcomeMessage, generateSoul } from './personality'
import type {
  ChatMessage,
  Companion,
  CompanionBones,
  Rarity,
  StatName,
  StoredCompanion,
} from './types'
import {
  EYES,
  HATS,
  RARITIES,
  RARITY_WEIGHTS,
  SPECIES,
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

export function rollCompanion(seed: string): RollResult {
  const rng = mulberry32(hashString(seed + SALT))
  const rarity = rollRarity(rng)
  const bones: CompanionBones = {
    rarity,
    species: pick(rng, SPECIES),
    eye: pick(rng, EYES),
    hat: rarity === 'common' ? 'none' : pick(rng, HATS),
    shiny: rng() < 0.01,
    stats: rollStats(rng, rarity),
  }

  return {
    bones,
    inspirationSeed: Math.floor(rng() * 1e9),
  }
}

export function createCompanion(seed: string, stored?: StoredCompanion): Companion {
  const { bones, inspirationSeed } = rollCompanion(seed)
  const soul = stored ?? {
    ...generateSoul(bones, inspirationSeed),
    hatchedAt: Date.now(),
    seed,
  }

  return {
    ...bones,
    ...soul,
    seed,
  }
}

export function getWelcomeChat(companion: Companion): ChatMessage {
  return {
    id: `welcome-${companion.seed}`,
    role: 'assistant',
    content: buildWelcomeMessage(companion.name, companion.species),
    createdAt: Date.now(),
  }
}
