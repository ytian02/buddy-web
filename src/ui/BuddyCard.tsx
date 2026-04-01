import type { Companion } from '../domain/types'
import {
  HAT_LABELS,
  RARITY_COLORS,
  RARITY_STARS,
  STAT_NAMES,
} from '../domain/types'

type Props = {
  companion: Companion
  onPet: () => void
  onReset: () => void
}

export function BuddyCard({
  companion,
  onPet,
  onReset,
}: Props): JSX.Element {
  return (
    <section className="buddy-card">
      <div className="buddy-card-header">
        <div>
          <p className="eyebrow">Companion</p>
          <h2>{companion.name}</h2>
        </div>
        <span
          className="rarity-pill"
          style={{
            backgroundColor: `${RARITY_COLORS[companion.rarity]}22`,
            color: RARITY_COLORS[companion.rarity],
          }}
        >
          {companion.rarity} {RARITY_STARS[companion.rarity]}
        </span>
      </div>

      <p className="buddy-personality">{companion.personality}</p>

      <dl className="buddy-meta">
        <div>
          <dt>Species</dt>
          <dd>{companion.species}</dd>
        </div>
        <div>
          <dt>Hat</dt>
          <dd>{HAT_LABELS[companion.hat]}</dd>
        </div>
        <div>
          <dt>Shiny</dt>
          <dd>{companion.shiny ? 'Yes' : 'No'}</dd>
        </div>
      </dl>

      <div className="stats-grid">
        {STAT_NAMES.map((stat) => (
          <div className="stat-row" key={stat}>
            <span>{stat}</span>
            <div className="stat-bar">
              <div
                className="stat-fill"
                style={{ width: `${companion.stats[stat]}%` }}
              />
            </div>
            <strong>{companion.stats[stat]}</strong>
          </div>
        ))}
      </div>

      <div className="action-row">
        <button onClick={onPet} type="button">
          Pet buddy
        </button>
        <button className="ghost-button" onClick={onReset} type="button">
          Re-hatch
        </button>
      </div>
    </section>
  )
}
