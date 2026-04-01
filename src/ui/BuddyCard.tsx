import { GROWTH_STAGE_CONFIGS, THEME_SKIN_CONFIGS } from '../domain/mascotSystem'
import type { Companion } from '../domain/types'
import {
  AURA_STYLE_LABELS,
  BADGE_STYLE_LABELS,
  GROWTH_STAGES,
  GROWTH_STAGE_LABELS,
  HAT_LABELS,
  RARITY_COLORS,
  RARITY_STARS,
  SPECIES_TEMPLATE_LABELS,
  STAT_NAMES,
  THEME_SKIN_LABELS,
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
          <p className="eyebrow">Companion Profile</p>
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

      <div className="growth-rail" aria-label="Growth stages">
        {GROWTH_STAGES.map((stage) => (
          <span
            className={`growth-chip${stage === companion.growthStage ? ' is-active' : ''}`}
            key={stage}
          >
            {GROWTH_STAGE_LABELS[stage]}
          </span>
        ))}
      </div>

      <dl className="buddy-meta">
        <div>
          <dt>Rig</dt>
          <dd>{SPECIES_TEMPLATE_LABELS[companion.speciesTemplate]}</dd>
        </div>
        <div>
          <dt>Skin</dt>
          <dd>{THEME_SKIN_LABELS[companion.themeSkin]}</dd>
        </div>
        <div>
          <dt>Stage</dt>
          <dd>{GROWTH_STAGE_LABELS[companion.growthStage]}</dd>
        </div>
        <div>
          <dt>Headgear</dt>
          <dd>{HAT_LABELS[companion.accessorySet.head]}</dd>
        </div>
      </dl>

      <div className="buddy-note">
        <strong>{GROWTH_STAGE_CONFIGS[companion.growthStage].label}</strong>{' '}
        profile with the {THEME_SKIN_CONFIGS[companion.themeSkin].label.toLowerCase()}.
        The system stays growth-ready, but the default cat now leans back into
        the original terminal Buddy vibe.
      </div>

      <div className="chip-row">
        <span className="info-chip">{BADGE_STYLE_LABELS[companion.accessorySet.badge]}</span>
        <span className="info-chip">{AURA_STYLE_LABELS[companion.accessorySet.aura]}</span>
        {companion.shiny ? <span className="info-chip accent-chip">Shiny Shell</span> : null}
      </div>

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
