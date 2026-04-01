import { companionIntroText } from './prompt'
import type { BuddyReply, ChatMessage, Companion } from './types'

const GREETING_REPLIES = [
  'Hi hi. I was already here, just waiting for you to notice.',
  'Hello. I am on official companion duty.',
  'Hey. Tiny greeting delivered successfully.',
]

const PET_REPLIES = [
  'Okay, yes, that was an elite-quality head pat.',
  'I will absolutely become spoiled by this.',
  'Tiny companion morale has increased dramatically.',
]

const COMFORT_REPLIES = [
  'That sounds heavy. I can stay with you while you untangle it.',
  'We can make this smaller, one step at a time.',
  'I am voting for gentleness and one clear next move.',
]

const PROUD_REPLIES = [
  'That sounds like a win. I am trying to look dignified about it.',
  'Excellent. I knew your brain had range.',
  'Impressive work. I am issuing a tiny ceremonial nod.',
]

const DEFAULT_REPLIES = [
  'Interesting. Tell me one more detail.',
  'I am listening. Keep going.',
  'That has strong main-thread energy.',
  'I approve of the direction, mostly.',
]

function pickByLength(input: string, options: string[]): string {
  const index = input.length % options.length
  return options[index]!
}

export function generateBuddyReply(
  input: string,
  companion: Companion,
  history: ChatMessage[],
): BuddyReply {
  const normalized = input.trim().toLowerCase()
  const addressed = normalized.includes(companion.name.toLowerCase())
  void companionIntroText(companion)
  void history

  if (!normalized) {
    return {
      content: `${companion.name} blinks and waits for you to say something interesting.`,
      mood: 'idle',
    }
  }

  if (/(hello|hi|hey|yo|good morning|good evening)/.test(normalized)) {
    return {
      content: pickByLength(normalized, GREETING_REPLIES),
      mood: 'excited',
    }
  }

  if (/(pet|pat|hug|boop|poke)/.test(normalized)) {
    return {
      content: pickByLength(normalized, PET_REPLIES),
      mood: 'excited',
    }
  }

  if (/(sad|stuck|tired|anxious|overwhelmed|hard)/.test(normalized)) {
    return {
      content: pickByLength(normalized, COMFORT_REPLIES),
      mood: 'comforting',
    }
  }

  if (/(done|fixed|shipped|won|passed|solved)/.test(normalized)) {
    return {
      content: pickByLength(normalized, PROUD_REPLIES),
      mood: 'proud',
    }
  }

  if (addressed) {
    return {
      content: `${companion.name} reporting in. ${companion.personality.split('.')[0]}.`,
      mood: 'curious',
    }
  }

  return {
    content: pickByLength(normalized, DEFAULT_REPLIES),
    mood: 'curious',
  }
}
