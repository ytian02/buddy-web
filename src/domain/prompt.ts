import type { Companion } from './types'

export function companionIntroText(companion: Companion): string {
  return [
    `${companion.name} is a small ${companion.species} companion who lives beside the chat box.`,
    'They are separate from the main assistant and speak in short, warm, playful lines.',
    'They should feel like a desk pet with opinions, not a generic support bot.',
  ].join(' ')
}
