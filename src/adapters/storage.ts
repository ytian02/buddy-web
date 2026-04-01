import { createCompanion, getWelcomeChat } from '../domain/companion'
import type { ChatMessage, Companion, StoredCompanion } from '../domain/types'

const COMPANION_KEY = 'buddy-web:companion'
const CHAT_KEY = 'buddy-web:chat'
const SEED_KEY = 'buddy-web:seed'

function safeRead<T>(key: string): T | null {
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return null
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

export function getOrCreateSeed(): string {
  const existing = window.localStorage.getItem(SEED_KEY)
  if (existing) return existing

  const seed = crypto.randomUUID()
  window.localStorage.setItem(SEED_KEY, seed)
  return seed
}

export function getOrCreateCompanion(): Companion {
  const seed = getOrCreateSeed()
  const stored = safeRead<StoredCompanion>(COMPANION_KEY) ?? undefined
  const companion = createCompanion(seed, stored)

  window.localStorage.setItem(
    COMPANION_KEY,
    JSON.stringify({
      name: companion.name,
      personality: companion.personality,
      hatchedAt: companion.hatchedAt,
      seed: companion.seed,
    } satisfies StoredCompanion),
  )

  return companion
}

export function getStoredChat(companion: Companion): ChatMessage[] {
  const messages = safeRead<ChatMessage[]>(CHAT_KEY)
  if (messages && messages.length > 0) return messages

  const welcome = getWelcomeChat(companion)
  persistChat([welcome])
  return [welcome]
}

export function persistChat(messages: ChatMessage[]): void {
  window.localStorage.setItem(CHAT_KEY, JSON.stringify(messages))
}

export function resetBuddyState(): void {
  window.localStorage.removeItem(COMPANION_KEY)
  window.localStorage.removeItem(CHAT_KEY)
  window.localStorage.setItem(SEED_KEY, crypto.randomUUID())
}
