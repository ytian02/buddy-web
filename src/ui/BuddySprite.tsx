import { useEffect, useMemo, useState } from 'react'
import { renderFace, renderSprite, spriteFrameCount } from '../domain/sprites'
import type { BuddyMood, Companion } from '../domain/types'
import { RARITY_COLORS } from '../domain/types'

type Props = {
  companion: Companion
  mood: BuddyMood
  speaking: boolean
  reaction: string | null
}

const IDLE_SEQUENCE = [0, 0, 0, 0, 1, 0, 0, 2, 0, 0]

export function BuddySprite({
  companion,
  mood,
  speaking,
  reaction,
}: Props): JSX.Element {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => setTick((value) => value + 1), 500)
    return () => window.clearInterval(id)
  }, [])

  const frameCount = spriteFrameCount(companion.species)
  const frame = speaking
    ? tick % frameCount
    : IDLE_SEQUENCE[tick % IDLE_SEQUENCE.length]! % frameCount
  const sprite = useMemo(() => renderSprite(companion, frame), [companion, frame])

  return (
    <div className={`buddy-stage mood-${mood}`}>
      {reaction ? <div className="speech-bubble">{reaction}</div> : null}
      <div
        className="sprite-shell"
        style={{ color: RARITY_COLORS[companion.rarity] }}
      >
        <pre className="sprite-pre">{sprite.join('\n')}</pre>
        <div className="buddy-face">{renderFace(companion)}</div>
      </div>
    </div>
  )
}
